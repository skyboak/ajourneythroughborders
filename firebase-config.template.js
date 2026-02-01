// ============================================
// FIREBASE CONFIGURATION TEMPLATE
// This file is used by Netlify to generate firebase-config.js
// The actual API keys are stored in Netlify environment variables
// ============================================

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "FIREBASE_API_KEY",
  authDomain: "FIREBASE_AUTH_DOMAIN",
  projectId: "FIREBASE_PROJECT_ID",
  storageBucket: "FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "FIREBASE_MESSAGING_SENDER_ID",
  appId: "FIREBASE_APP_ID"
};

// Export the config
window.firebaseConfig = firebaseConfig;

// Initialize Firebase
let app, auth, db;

function initializeFirebase() {
    try {
        if (!firebase.apps.length) {
            app = firebase.initializeApp(firebaseConfig);
        } else {
            app = firebase.apps[0];
        }
        auth = firebase.auth();
        db = firebase.firestore();
        console.log('✅ Firebase initialized successfully');
        return true;
    } catch (error) {
        console.error('❌ Firebase initialization failed:', error);
        return false;
    }
}

// ============================================
// AUTHENTICATION FUNCTIONS
// ============================================

// Register new user with email and password
async function firebaseRegisterUser(email, password, displayName, country = 'IL') {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Update display name
        await user.updateProfile({ displayName: displayName });
        
        // Create user document in Firestore
        await db.collection('users').doc(user.uid).set({
            displayName: displayName,
            email: email,
            country: country,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            lastLogin: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // Set gameState currentUser
        gameState.currentUser = {
            id: user.uid,
            name: displayName,
            email: email,
            country: country
        };
        
        console.log('✅ User registered:', displayName);
        return { success: true, user: user };
    } catch (error) {
        console.error('❌ Registration failed:', error);
        let errorMessage = error.message;
        if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'האימייל כבר בשימוש / Email already in use';
        } else if (error.code === 'auth/weak-password') {
            errorMessage = 'סיסמה חלשה מדי / Password too weak';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'אימייל לא תקין / Invalid email';
        }
        return { success: false, error: errorMessage };
    }
}

// Login with email and password
async function firebaseLoginUser(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Update last login
        await db.collection('users').doc(user.uid).update({
            lastLogin: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // Get user data including country
        const userDoc = await db.collection('users').doc(user.uid).get();
        const userData = userDoc.data() || {};
        
        // Set gameState currentUser
        gameState.currentUser = {
            id: user.uid,
            name: user.displayName || 'Player',
            email: user.email,
            country: userData.country || 'IL' // Default to Israel for existing users
        };
        
        console.log('✅ User logged in:', user.displayName);
        return { success: true, user: user };
    } catch (error) {
        console.error('❌ Login failed:', error);
        let errorMessage = error.message;
        if (error.code === 'auth/user-not-found') {
            errorMessage = 'משתמש לא נמצא / User not found';
        } else if (error.code === 'auth/wrong-password') {
            errorMessage = 'סיסמה שגויה / Wrong password';
        }
        return { success: false, error: errorMessage };
    }
}

// Logout
async function firebaseLogoutUser() {
    try {
        await auth.signOut();
        gameState.currentUser = null;
        console.log('✅ User logged out');
        return { success: true };
    } catch (error) {
        console.error('❌ Logout failed:', error);
        return { success: false, error: error.message };
    }
}

// Get current user
function getCurrentFirebaseUser() {
    if (typeof auth === 'undefined' || !auth) {
        return null;
    }
    return auth.currentUser;
}

// Auth state listener
function setupAuthStateListener() {
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            // Get user data including country
            let country = 'IL';
            try {
                const userDoc = await db.collection('users').doc(user.uid).get();
                const userData = userDoc.data() || {};
                country = userData.country || 'IL';
            } catch (e) {
                console.log('Could not fetch user country, using default');
            }
            
            gameState.currentUser = {
                id: user.uid,
                name: user.displayName || 'Player',
                email: user.email,
                country: country
            };
            console.log('👤 User is signed in:', user.displayName);
            
            // Update postcard badge after a delay to ensure DOM is ready
            setTimeout(() => {
                if (typeof window.updatePostcardBadge === 'function') {
                    console.log('🔔 Calling updatePostcardBadge from auth state change');
                    window.updatePostcardBadge();
                }
            }, 500);
        } else {
            gameState.currentUser = null;
            console.log('👤 User is signed out');
            
            // Hide badge when user signs out
            const profileBadge = document.getElementById('profile-notification-badge');
            if (profileBadge) {
                profileBadge.style.display = 'none';
            }
        }
    });
}

// ============================================
// PROGRESS FUNCTIONS
// ============================================

// Save user progress to Firestore
async function saveProgressToFirebase() {
    const user = getCurrentFirebaseUser();
    if (!user) {
        console.log('⚠️ No user logged in, saving to localStorage only');
        return false;
    }
    
    const progressData = {
        currentStage: gameState.currentStage,
        foundItems: gameState.foundItems,
        currentSearchItem: gameState.currentSearchItem,
        completedStages: gameState.completedStages || [],
        lastPlayed: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    try {
        await db.collection('users').doc(user.uid).collection('progress').doc('current').set(progressData);
        console.log('✅ Progress saved to Firebase');
        return true;
    } catch (error) {
        console.error('❌ Failed to save progress:', error);
        return false;
    }
}

// Load user progress from Firestore
async function loadProgressFromFirebase() {
    const user = getCurrentFirebaseUser();
    if (!user) {
        console.log('⚠️ No user logged in, cannot load progress from Firebase');
        return null;
    }
    
    try {
        const doc = await db.collection('users').doc(user.uid).collection('progress').doc('current').get();
        if (doc.exists) {
            const data = doc.data();
            console.log('✅ Progress loaded from Firebase');
            return data;
        }
        return null;
    } catch (error) {
        console.error('❌ Failed to load progress:', error);
        return null;
    }
}

// ============================================
// POSTCARD FUNCTIONS
// ============================================

// Get all users (for postcard recipients)
async function getAllUsersFromFirebase() {
    try {
        // Make sure Firebase is initialized
        if (!db) {
            initializeFirebase();
        }
        
        const currentUser = getCurrentFirebaseUser();
        const snapshot = await db.collection('users').get();
        const users = [];
        
        snapshot.forEach(doc => {
            // Exclude current user if logged in
            if (!currentUser || doc.id !== currentUser.uid) {
                users.push({
                    id: doc.id,
                    name: doc.data().displayName || doc.data().email || 'User',
                    ...doc.data()
                });
            }
        });
        
        console.log('✅ Loaded', users.length, 'users from Firebase');
        return users;
    } catch (error) {
        console.error('❌ Failed to load users:', error);
        return [];
    }
}

// Send postcard to another user
async function sendPostcardToFirebase(recipientId, message, stageName) {
    const user = getCurrentFirebaseUser();
    if (!user) {
        console.log('⚠️ No user logged in, cannot send postcard');
        return { success: false, error: 'Not logged in' };
    }
    
    const postcard = {
        fromId: user.uid,
        fromName: user.displayName || 'Anonymous',
        toId: recipientId,
        stage: gameState.currentStage,
        stageName: stageName,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        read: false
    };
    
    try {
        await db.collection('postcards').add(postcard);
        console.log('✅ Postcard sent to Firebase');
        return { success: true };
    } catch (error) {
        console.error('❌ Failed to send postcard:', error);
        return { success: false, error: error.message };
    }
}

// Get postcards for current user
async function getMyPostcardsFromFirebase() {
    const user = getCurrentFirebaseUser();
    if (!user) {
        return [];
    }
    
    try {
        const snapshot = await db.collection('postcards')
            .where('toId', '==', user.uid)
            .orderBy('timestamp', 'desc')
            .get();
        
        const postcards = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            postcards.push({
                id: doc.id,
                from: { name: data.fromName, id: data.fromId },
                ...data
            });
        });
        
        console.log('✅ Loaded', postcards.length, 'postcards from Firebase');
        return postcards;
    } catch (error) {
        console.error('❌ Failed to load postcards:', error);
        return [];
    }
}

// Mark postcard as read
async function markPostcardAsReadFirebase(postcardId) {
    try {
        await db.collection('postcards').doc(postcardId).update({
            read: true
        });
        return true;
    } catch (error) {
        console.error('❌ Failed to mark postcard as read:', error);
        return false;
    }
}

// Get unread postcard count
async function getUnreadPostcardCountFirebase() {
    const user = getCurrentFirebaseUser();
    if (!user) return 0;
    
    try {
        const snapshot = await db.collection('postcards')
            .where('toId', '==', user.uid)
            .where('read', '==', false)
            .get();
        
        return snapshot.size;
    } catch (error) {
        console.error('❌ Failed to get unread count:', error);
        return 0;
    }
}

// ============================================
// MAKE FUNCTIONS GLOBALLY ACCESSIBLE
// ============================================

window.initializeFirebase = initializeFirebase;
window.firebaseRegisterUser = firebaseRegisterUser;
window.firebaseLoginUser = firebaseLoginUser;
window.firebaseLogoutUser = firebaseLogoutUser;
window.getCurrentFirebaseUser = getCurrentFirebaseUser;
window.setupAuthStateListener = setupAuthStateListener;
window.saveProgressToFirebase = saveProgressToFirebase;
window.loadProgressFromFirebase = loadProgressFromFirebase;
window.getAllUsersFromFirebase = getAllUsersFromFirebase;
window.sendPostcardToFirebase = sendPostcardToFirebase;
window.getMyPostcardsFromFirebase = getMyPostcardsFromFirebase;
window.markPostcardAsReadFirebase = markPostcardAsReadFirebase;
window.getUnreadPostcardCountFirebase = getUnreadPostcardCountFirebase;

console.log('✅ Firebase config loaded');
