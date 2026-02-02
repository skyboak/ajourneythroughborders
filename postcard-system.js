// ============================================
// POSTCARD SYSTEM - User Management & Messaging
// גרסה מותאמת ל-p5 Web Editor (ללא storage API)
// ============================================

// Country code to flag image URL mapping (using flagcdn.com)
const COUNTRY_CODES = {
    'IL': 'il',
    'JO': 'jo',
    'SA': 'sa',
    'SY': 'sy',
    'LB': 'lb',
    'EG': 'eg',
    'IQ': 'iq',
    'AE': 'ae',
    'US': 'us',
    'GB': 'gb',
    'CA': 'ca',
    'AU': 'au',
    'FR': 'fr',
    'DE': 'de',
    'IT': 'it',
    'ES': 'es',
    'NL': 'nl',
    'RU': 'ru',
    'TR': 'tr',
    'IN': 'in',
    'BR': 'br',
    'MX': 'mx',
    'AR': 'ar',
    'ZA': 'za',
    'OTHER': 'un'
};

// Get flag image HTML for country code (default to Israel)
function getCountryFlag(countryCode) {
    const code = COUNTRY_CODES[countryCode] || COUNTRY_CODES['IL'];
    return `<img src="https://flagcdn.com/w20/${code}.png" alt="${countryCode}" style="width: 20px; height: 14px; object-fit: cover; border-radius: 2px; vertical-align: middle;">`;
}

// Profanity filter - inappropriate words in multiple languages
const INAPPROPRIATE_WORDS = {
    he: ['חרא', 'זין', 'כוס', 'מניאק', 'זונה', 'שרמוטה', 'בן זונה', 'אידיוט', 'טמבל', 'מפגר'],
    en: ['fuck', 'shit', 'bitch', 'ass', 'damn', 'hell', 'bastard', 'crap', 'dick', 'pussy', 'cock', 'asshole', 'motherfucker', 'nigger', 'faggot', 'whore', 'slut'],
    ar: ['حمار', 'كلب', 'خنزير', 'زانية', 'عاهرة', 'غبي', 'أحمق']
};

// In-memory storage (כיוון שאין window.storage ב-p5 Web Editor)
const inMemoryStorage = {
    users: [],
    postcards: [],
    currentUser: null
};

// ============================================
// USER MANAGEMENT
// ============================================

async function initializeUser() {
    console.log('🔧 initializeUser called (p5 Web Editor mode)');
    
    // Check if user already exists in memory
    if (inMemoryStorage.currentUser) {
        gameState.currentUser = inMemoryStorage.currentUser;
        console.log('User loaded from memory:', gameState.currentUser.name);
        return true;
    }
    
    // No user found - show registration
    return false;
}

function showUserRegistration() {
    const lang = gameState.currentLanguage;
    const trans = GAME_DATA.translations[lang];
    const modal = document.querySelector('.modal-overlay');
    const modalBody = document.querySelector('.modal-body');
    
    modalBody.innerHTML = `
        <h3>${trans.welcome}</h3>
        <p style="text-align: center; font-size: 1.1rem; margin: 20px 0;">
            ${trans.enterName}
        </p>
        <input 
            type="text" 
            id="user-name-input" 
            placeholder="${trans.yourName}"
            maxlength="20"
            style="
                width: 100%;
                padding: 15px;
                font-size: 1.1rem;
                border: 2px solid var(--orange);
                border-radius: 10px;
                text-align: center;
                font-family: 'Rubik', sans-serif;
                margin-bottom: 10px;
            "
        >
        <div id="name-error" style="color: var(--error); text-align: center; min-height: 20px; font-size: 0.9rem;"></div>
        <div class="modal-buttons">
            <button class="btn btn-primary" onclick="registerUser()">
                ${trans.continue}
            </button>
        </div>
    `;
    
    modal.classList.add('active');
    
    // Focus on input
    setTimeout(() => {
        document.getElementById('user-name-input').focus();
    }, 100);
    
    // Allow Enter key to submit
    document.getElementById('user-name-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            registerUser();
        }
    });
}

async function registerUser() {
    const lang = gameState.currentLanguage;
    const trans = GAME_DATA.translations[lang];
    const nameInput = document.getElementById('user-name-input');
    const errorDiv = document.getElementById('name-error');
    const name = nameInput.value.trim();
    
    // Validation
    if (!name) {
        errorDiv.textContent = trans.nameRequired;
        nameInput.focus();
        return;
    }
    
    if (name.length < 2) {
        errorDiv.textContent = trans.nameTooShort;
        nameInput.focus();
        return;
    }
    
    if (name.length > 20) {
        errorDiv.textContent = trans.nameTooLong;
        nameInput.focus();
        return;
    }
    
    // Check for inappropriate content
    if (containsInappropriateContent(name)) {
        errorDiv.textContent = trans.inappropriateContent;
        nameInput.focus();
        return;
    }
    
    // Create user object
    const user = {
        id: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        name: name,
        timestamp: Date.now()
    };
    
    gameState.currentUser = user;
    inMemoryStorage.currentUser = user;
    inMemoryStorage.users.push(user);
    
    // Close modal
    closeModal();
    
    console.log('User registered:', user.name);
    
    // Show video intro before starting game
    setTimeout(() => {
        showVideoIntro();
    }, 300);
}

async function getAllUsers() {
    // Always try Firebase first to show available users
    if (typeof getAllUsersFromFirebase === 'function') {
        try {
            const users = await getAllUsersFromFirebase();
            if (users && users.length > 0) {
                return users;
            }
        } catch (error) {
            console.log('Could not fetch users from Firebase:', error);
        }
    }
    
    // Fallback to in-memory storage
    return inMemoryStorage.users.filter(u => u.id !== gameState.currentUser?.id);
}

// ============================================
// CONTENT FILTERING
// ============================================

function containsInappropriateContent(text) {
    const lowerText = text.toLowerCase();
    
    // Check all language lists
    for (const lang in INAPPROPRIATE_WORDS) {
        for (const word of INAPPROPRIATE_WORDS[lang]) {
            if (lowerText.includes(word.toLowerCase())) {
                return true;
            }
        }
    }
    
    return false;
}

// ============================================
// POSTCARD CREATION & SENDING
// ============================================

// Store all users for search functionality
let allUsersCache = [];

async function showPostcardModal() {
    const lang = gameState.currentLanguage;
    const trans = GAME_DATA.translations[lang];
    const stage = GAME_DATA.stages[gameState.currentStage];
    const modal = document.querySelector('.modal-overlay');
    const modalBody = document.querySelector('.modal-body');
    const modalContent = document.querySelector('.modal-content');
    
    // Ensure modal content can scroll properly
    if (modalContent) {
        modalContent.style.maxHeight = '90vh';
        modalContent.style.overflowY = 'auto';
    }
    
    // Get all users and cache them
    allUsersCache = await getAllUsers();
    
    // Get 5 random users (excluding current user)
    const randomUsers = getRandomUsers(allUsersCache, 5);
    
    const searchPlaceholder = {
        he: 'חפש משתמש לפי שם...',
        en: 'Search user by name...',
        ar: 'ابحث عن مستخدم بالاسم...'
    };
    
    const suggestedLabel = {
        he: 'משתמשים מומלצים:',
        en: 'Suggested users:',
        ar: 'المستخدمون المقترحون:'
    };
    
    const orSearchLabel = {
        he: 'או חפש משתמש:',
        en: 'Or search for a user:',
        ar: 'أو ابحث عن مستخدم:'
    };
    
    const writeMessageLabel = {
        he: 'כתוב הודעה',
        en: 'Write Message',
        ar: 'اكتب رسالة'
    };
    
    modalBody.innerHTML = `
        <h3 style="color: var(--teal); font-size: 1.5rem; margin-bottom: 15px;">${trans.postcardTitle}${stage.name[lang]}</h3>
        
        <!-- BIG Postcard Preview at Top -->
        <div style="margin: 0 0 20px 0; display: flex; justify-content: center;">
            <div id="postcard-preview" style="
                position: relative;
                width: 100%;
                max-width: 450px;
            ">
                <img src="postcard.png" alt="Postcard" style="
                    width: 100%;
                    height: auto;
                    display: block;
                    border-radius: 8px;
                ">
                <div 
                    id="postcard-message-preview"
                    style="
                        position: absolute;
                        top: 67%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 68%;
                        height: 38%;
                        font-family: 'Rubik', cursive, sans-serif;
                        font-size: clamp(0.6rem, 2vw, 0.85rem);
                        color: #333;
                        line-height: 1.5;
                        text-align: center;
                        direction: ${lang === 'he' || lang === 'ar' ? 'rtl' : 'ltr'};
                        word-wrap: break-word;
                        overflow: hidden;
                        padding: 4px 10px;
                        pointer-events: none;
                        box-sizing: border-box;
                    "
                ></div>
            </div>
        </div>
        
        <!-- Recipient Selection -->
        <div style="margin: 0 0 15px 0;">
            <label style="display: block; font-weight: 600; margin-bottom: 8px; color: var(--navy);">
                ${trans.selectRecipient}
            </label>
            
            <!-- Suggested Users -->
            <div style="margin-bottom: 10px;">
                <div style="font-size: 0.85rem; color: #666; margin-bottom: 6px;">${suggestedLabel[lang]}</div>
                <div id="suggested-users" style="display: flex; flex-wrap: wrap; gap: 6px;">
                    ${randomUsers.length > 0 ? randomUsers.map(user => `
                        <button 
                            type="button"
                            class="user-chip" 
                            data-user-id="${user.id}"
                            data-user-name="${user.name}"
                            onclick="selectUserChip(this)"
                            style="
                                padding: 6px 14px;
                                border-radius: 20px;
                                border: 2px solid var(--teal);
                                background: white;
                                color: var(--navy);
                                font-family: 'Rubik', sans-serif;
                                font-size: 0.9rem;
                                cursor: pointer;
                                transition: all 0.2s ease;
                                display: flex;
                                align-items: center;
                                gap: 6px;
                            "
                        >
                            ${getCountryFlag(user.country)}
                            <span>${user.name}</span>
                        </button>
                    `).join('') : `<span style="color: #999;">${trans.noUsers}</span>`}
                </div>
            </div>
            
            <!-- Search Input -->
            <div style="margin-bottom: 8px;">
                <div style="font-size: 0.85rem; color: #666; margin-bottom: 6px;">${orSearchLabel[lang]}</div>
                <div style="position: relative;">
                    <input 
                        type="text"
                        id="user-search-input"
                        placeholder="${searchPlaceholder[lang]}"
                        oninput="searchUsers(this.value)"
                        style="
                            width: 100%;
                            padding: 10px;
                            padding-right: 40px;
                            font-size: 0.95rem;
                            border: 2px solid var(--orange);
                            border-radius: 10px;
                            font-family: 'Rubik', sans-serif;
                            background: white;
                        "
                    />
                    <span style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); font-size: 1.1rem;">🔍</span>
                </div>
                <div id="search-results" style="
                    margin-top: 6px;
                    max-height: 100px;
                    overflow-y: auto;
                    display: none;
                "></div>
            </div>
            
            <!-- Selected User Display -->
            <div id="selected-user-display" style="
                margin-top: 8px;
                padding: 10px;
                background: var(--cream);
                border-radius: 10px;
                display: none;
                align-items: center;
                gap: 8px;
            ">
                <span style="font-weight: 600; color: var(--navy);">✓ </span>
                <span id="selected-user-name" style="flex: 1; color: var(--navy);"></span>
                <button type="button" onclick="clearSelectedUser()" style="
                    background: none;
                    border: none;
                    font-size: 1.1rem;
                    cursor: pointer;
                    color: var(--error);
                ">✕</button>
            </div>
            <input type="hidden" id="postcard-recipient" value="" />
        </div>
        
        <!-- Message Text Box at Bottom -->
        <div style="margin: 0 0 10px 0;">
            <label style="display: block; font-weight: 600; margin-bottom: 8px; color: var(--navy);">
                ${writeMessageLabel[lang]}
            </label>
            <div style="position: relative;">
                <textarea 
                    id="postcard-message-input"
                    placeholder="${trans.messagePlaceholder}"
                    oninput="syncPostcardMessage(this)"
                    maxlength="100"
                    rows="3"
                    style="
                        width: 100%;
                        padding: 12px;
                        font-size: 1rem;
                        border: 2px solid var(--orange);
                        border-radius: 10px;
                        font-family: 'Rubik', sans-serif;
                        background: white;
                        resize: none;
                        line-height: 1.5;
                    "
                ></textarea>
                <div style="
                    position: absolute;
                    bottom: 8px;
                    right: 10px;
                    font-size: 0.8rem;
                    color: #888;
                    background: rgba(255,255,255,0.9);
                    padding: 2px 6px;
                    border-radius: 4px;
                "><span id="char-count">0</span>/100</div>
            </div>
        </div>
        
        <input type="hidden" id="postcard-message" value="" />
        
        <div id="postcard-error" style="color: var(--error); text-align: center; min-height: 18px; font-size: 0.85rem; margin-bottom: 8px;"></div>
        
        <div class="modal-buttons">
            <button class="btn btn-secondary" onclick="closeModal()">
                ${trans.cancel}
            </button>
            <button class="btn btn-primary" onclick="sendPostcard()" ${allUsersCache.length === 0 ? 'disabled' : ''}>
                ${trans.send}
            </button>
        </div>
    `;
    
    modal.classList.add('active');
    
    // Stop p5.js from capturing events on modal inputs
    const modalInputs = modal.querySelectorAll('input, textarea, select, button');
    modalInputs.forEach(el => {
        el.addEventListener('mousedown', (e) => e.stopPropagation());
        el.addEventListener('touchstart', (e) => e.stopPropagation());
    });
    modal.addEventListener('mousedown', (e) => e.stopPropagation());
    
    // Character counter
    const textarea = document.getElementById('postcard-message');
    const charCount = document.getElementById('char-count');
    textarea.addEventListener('input', () => {
        charCount.textContent = textarea.value.length;
    });
}

// Get random users from the list
function getRandomUsers(users, count) {
    // Filter out current user
    const currentUserId = gameState.currentUser?.id;
    const filteredUsers = users.filter(u => u.id !== currentUserId);
    
    // Shuffle and take first 'count' users
    const shuffled = [...filteredUsers].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

// Select a user from the suggested chips
window.selectUserChip = function(button) {
    const userId = button.getAttribute('data-user-id');
    const userName = button.getAttribute('data-user-name');
    
    // Update hidden input
    document.getElementById('postcard-recipient').value = userId;
    
    // Show selected user display
    const display = document.getElementById('selected-user-display');
    const nameSpan = document.getElementById('selected-user-name');
    nameSpan.textContent = userName;
    display.style.display = 'flex';
    
    // Highlight selected chip
    document.querySelectorAll('.user-chip').forEach(chip => {
        chip.style.background = 'white';
        chip.style.color = 'var(--navy)';
    });
    button.style.background = 'var(--teal)';
    button.style.color = 'white';
    
    // Hide search results
    document.getElementById('search-results').style.display = 'none';
    document.getElementById('user-search-input').value = '';
};

// Search for users
window.searchUsers = function(query) {
    const resultsDiv = document.getElementById('search-results');
    
    if (query.length < 2) {
        resultsDiv.style.display = 'none';
        return;
    }
    
    const currentUserId = gameState.currentUser?.id;
    const matchingUsers = allUsersCache.filter(u => 
        u.id !== currentUserId && 
        u.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 10);
    
    if (matchingUsers.length === 0) {
        const lang = gameState.currentLanguage;
        const noResults = {
            he: 'לא נמצאו משתמשים',
            en: 'No users found',
            ar: 'لم يتم العثور على مستخدمين'
        };
        resultsDiv.innerHTML = `<div style="padding: 10px; color: #999;">${noResults[lang]}</div>`;
    } else {
        resultsDiv.innerHTML = matchingUsers.map(user => `
            <div 
                onclick="selectSearchResult('${user.id}', '${user.name.replace(/'/g, "\\'")}')"
                style="
                    padding: 10px 12px;
                    cursor: pointer;
                    border-bottom: 1px solid #eee;
                    transition: background 0.2s;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                "
                onmouseover="this.style.background='var(--cream)'"
                onmouseout="this.style.background='white'"
            >
                ${getCountryFlag(user.country)}
                <span>${user.name}</span>
            </div>
        `).join('');
    }
    
    resultsDiv.style.display = 'block';
    resultsDiv.style.background = 'white';
    resultsDiv.style.border = '1px solid #ddd';
    resultsDiv.style.borderRadius = '8px';
};

// Sync textarea with postcard preview
window.syncPostcardMessage = function(textarea) {
    const text = textarea.value || '';
    const charCount = document.getElementById('char-count');
    const hiddenInput = document.getElementById('postcard-message');
    const previewDiv = document.getElementById('postcard-message-preview');
    
    // Update character count
    if (charCount) {
        charCount.textContent = text.length;
    }
    
    // Update hidden input for form submission
    if (hiddenInput) {
        hiddenInput.value = text;
    }
    
    // Update the preview on the postcard
    if (previewDiv) {
        previewDiv.textContent = text;
    }
};

// Handle postcard direct input (legacy - kept for backwards compatibility)
window.handlePostcardInput = function(element) {
    const text = element.innerText || '';
    const charCount = document.getElementById('char-count');
    const hiddenInput = document.getElementById('postcard-message');
    
    // Limit to 100 characters
    if (text.length > 100) {
        element.innerText = text.substring(0, 100);
        // Move cursor to end
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(element);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
    }
    
    const currentLength = Math.min(text.length, 100);
    
    if (charCount) {
        charCount.textContent = currentLength;
    }
    
    if (hiddenInput) {
        hiddenInput.value = text.substring(0, 100);
    }
};

// Update postcard preview with message (legacy support)
window.updatePostcardPreview = function(message) {
    const previewDiv = document.getElementById('postcard-message-preview');
    const charCount = document.getElementById('char-count');
    
    if (previewDiv) {
        previewDiv.textContent = message;
    }
    
    if (charCount) {
        charCount.textContent = message.length;
    }
};

// Select a user from search results
window.selectSearchResult = function(userId, userName) {
    // Update hidden input
    document.getElementById('postcard-recipient').value = userId;
    
    // Show selected user display
    const display = document.getElementById('selected-user-display');
    const nameSpan = document.getElementById('selected-user-name');
    nameSpan.textContent = userName;
    display.style.display = 'flex';
    
    // Clear chip selection
    document.querySelectorAll('.user-chip').forEach(chip => {
        chip.style.background = 'white';
        chip.style.color = 'var(--navy)';
    });
    
    // Hide search and clear input
    document.getElementById('search-results').style.display = 'none';
    document.getElementById('user-search-input').value = '';
};

// Clear selected user
window.clearSelectedUser = function() {
    document.getElementById('postcard-recipient').value = '';
    document.getElementById('selected-user-display').style.display = 'none';
    
    // Clear chip selection
    document.querySelectorAll('.user-chip').forEach(chip => {
        chip.style.background = 'white';
        chip.style.color = 'var(--navy)';
    });
};

async function sendPostcard() {
    const lang = gameState.currentLanguage;
    const trans = GAME_DATA.translations[lang];
    const stage = GAME_DATA.stages[gameState.currentStage];
    const errorDiv = document.getElementById('postcard-error');
    
    const recipientId = document.getElementById('postcard-recipient').value;
    const message = document.getElementById('postcard-message').value.trim();
    
    // Check if user is logged in
    if (!gameState.currentUser) {
        const loginMessage = {
            he: 'יש להתחבר כדי לשלוח גלויות',
            en: 'Please login to send postcards',
            ar: 'يرجى تسجيل الدخول لإرسال البطاقات البريدية'
        };
        errorDiv.textContent = loginMessage[lang] || loginMessage.en;
        return;
    }
    
    // Validation
    if (!recipientId) {
        errorDiv.textContent = trans.selectRecipient;
        return;
    }
    
    if (!message) {
        errorDiv.textContent = trans.messageTooShort;
        return;
    }
    
    if (message.length < 5) {
        errorDiv.textContent = trans.messageTooShort;
        return;
    }
    
    if (message.length > 500) {
        errorDiv.textContent = trans.messageTooLong;
        return;
    }
    
    // Check for inappropriate content
    if (containsInappropriateContent(message)) {
        errorDiv.textContent = trans.inappropriateContent;
        return;
    }
    
    // Try sending via Firebase first
    if (typeof sendPostcardToFirebase === 'function' && typeof getCurrentFirebaseUser === 'function') {
        const firebaseUser = getCurrentFirebaseUser();
        if (firebaseUser) {
            errorDiv.textContent = 'שולח... / Sending...';
            const result = await sendPostcardToFirebase(recipientId, message, stage.name[lang]);
            
            if (result.success) {
                gameState.fromStageComplete = false;
                errorDiv.style.color = 'var(--success)';
                errorDiv.textContent = trans.postcardSent;
                
                setTimeout(() => {
                    closeModal();
                    setTimeout(() => {
                        if (typeof window.continueToNextStage === 'function') {
                            window.continueToNextStage();
                        }
                    }, 300);
                }, 2000);
                
                console.log('Postcard sent via Firebase');
                return;
            } else {
                errorDiv.textContent = result.error;
                return;
            }
        }
    }
    
    // Fallback to in-memory storage
    const postcard = {
        id: 'postcard_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        from: gameState.currentUser,
        toId: recipientId,
        stage: gameState.currentStage,
        stageName: stage.name[lang],
        message: message,
        timestamp: Date.now(),
        read: false
    };
    
    // Save postcard to memory
    inMemoryStorage.postcards.push(postcard);
    
    // Clear the flag since we successfully sent
    gameState.fromStageComplete = false;
    
    // Show success message
    errorDiv.style.color = 'var(--success)';
    errorDiv.textContent = trans.postcardSent;
    
    // Close modal and proceed to next stage after 2 seconds
    setTimeout(() => {
        closeModal();
        setTimeout(() => {
            if (typeof window.continueToNextStage === 'function') {
                window.continueToNextStage();
            }
        }, 300);
    }, 2000);
    
    console.log('Postcard sent:', postcard);
}

// ============================================
// MY POSTCARDS - INBOX
// ============================================

async function getMyPostcards() {
    if (!gameState.currentUser) return [];
    
    // Try Firebase first
    if (typeof getMyPostcardsFromFirebase === 'function' && typeof getCurrentFirebaseUser === 'function') {
        const firebaseUser = getCurrentFirebaseUser();
        if (firebaseUser) {
            return await getMyPostcardsFromFirebase();
        }
    }
    
    // Fallback to in-memory storage
    return inMemoryStorage.postcards
        .filter(p => p.toId === gameState.currentUser.id)
        .sort((a, b) => b.timestamp - a.timestamp);
}

async function getUnreadCount() {
    try {
        // Try Firebase first
        if (typeof getUnreadPostcardCountFirebase === 'function' && typeof getCurrentFirebaseUser === 'function') {
            const firebaseUser = getCurrentFirebaseUser();
            if (firebaseUser) {
                return await getUnreadPostcardCountFirebase();
            }
        }
        
        // Fallback - check if we have a current user
        if (!gameState.currentUser) {
            return 0;
        }
        
        const postcards = await getMyPostcards();
        return postcards.filter(p => !p.read).length;
    } catch (error) {
        console.error('🔔 Error getting unread count:', error);
        return 0;
    }
}

async function updatePostcardBadge() {
    console.log('🔔 updatePostcardBadge called');
    const unreadCount = await getUnreadCount();
    console.log('🔔 Unread postcard count:', unreadCount);
    
    // Update profile screen badge (if visible)
    const badge = document.getElementById('postcards-badge');
    if (badge) {
        if (unreadCount > 0) {
            badge.textContent = unreadCount;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }
    
    // Update profile button notification badge (always visible)
    const profileBadge = document.getElementById('profile-notification-badge');
    console.log('🔔 Profile badge element:', profileBadge);
    if (profileBadge) {
        if (unreadCount > 0) {
            profileBadge.textContent = unreadCount > 9 ? '9+' : unreadCount;
            profileBadge.style.display = 'flex';
            console.log('🔔 Badge shown with count:', unreadCount);
        } else {
            profileBadge.style.display = 'none';
            console.log('🔔 Badge hidden (no unread)');
        }
    } else {
        console.log('🔔 Badge element not found!');
    }
}

async function showMyPostcards() {
    const lang = gameState.currentLanguage;
    const trans = GAME_DATA.translations[lang];
    const modal = document.querySelector('.modal-overlay');
    const modalBody = document.querySelector('.modal-body');
    
    const postcards = await getMyPostcards();
    
    if (postcards.length === 0) {
        modalBody.innerHTML = `
            <h3>${trans.myPostcards}</h3>
            <p style="text-align: center; color: #666; margin: 40px 0;">
                ${trans.noPostcards}
            </p>
            <div class="modal-buttons">
                <button class="btn btn-primary" onclick="closeModal()">
                    ${trans.close}
                </button>
            </div>
        `;
        modal.classList.add('active');
        return;
    }
    
    const postcardsHTML = postcards.map((postcard, index) => {
        const dateStr = new Date(postcard.timestamp).toLocaleDateString(lang === 'he' ? 'he-IL' : lang === 'ar' ? 'ar-SA' : 'en-US');
        const isUnread = !postcard.read;
        const senderCountryFlag = postcard.from.country ? getCountryFlag(postcard.from.country) : '';
        
        return `
            <div class="postcard-item ${isUnread ? 'unread' : ''}" 
                 onclick="viewPostcard(${index})"
                 style="
                     background: ${isUnread ? 'var(--cream)' : 'white'};
                     border: 2px solid ${isUnread ? 'var(--orange)' : 'var(--cream)'};
                     border-radius: 12px;
                     padding: 15px;
                     margin-bottom: 12px;
                     cursor: pointer;
                     transition: var(--transition);
                 ">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <div>
                        <strong style="color: var(--navy); font-size: 1.05rem;">
                            ${isUnread ? '🔵 ' : ''}${trans.from} ${postcard.from.name} ${senderCountryFlag}
                        </strong>
                        <div style="font-size: 0.85rem; color: #666; margin-top: 4px;">
                            ${trans.stage || 'Stage'}: ${postcard.stageName} • ${dateStr}
                        </div>
                    </div>
                </div>
                <p style="
                    color: var(--text-dark); 
                    margin: 8px 0 0 0; 
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    font-size: 0.95rem;
                ">
                    ${postcard.message}
                </p>
            </div>
        `;
    }).join('');
    
    modalBody.innerHTML = `
        <h3>${trans.myPostcards}</h3>
        <div style="max-height: 400px; overflow-y: auto; margin: 20px 0;">
            ${postcardsHTML}
        </div>
        <div class="modal-buttons">
            <button class="btn btn-primary" onclick="closeModal()">
                ${trans.close}
            </button>
        </div>
    `;
    
    modal.classList.add('active');
}

async function viewPostcard(index) {
    const lang = gameState.currentLanguage;
    const trans = GAME_DATA.translations[lang];
    
    const postcards = await getMyPostcards();
    const postcard = postcards[index];
    
    if (!postcard) return;
    
    // Mark as read
    if (!postcard.read) {
        postcard.read = true;
        await updatePostcardBadge();
    }
    
    const dateStr = new Date(postcard.timestamp).toLocaleDateString(lang === 'he' ? 'he-IL' : lang === 'ar' ? 'ar-SA' : 'en-US');
    
    const modal = document.querySelector('.modal-overlay');
    const modalBody = document.querySelector('.modal-body');
    
    const senderCountryFlag = postcard.from.country ? getCountryFlag(postcard.from.country) : '';
    
    modalBody.innerHTML = `
        <div style="text-align: center;">
            <h3 style="color: var(--orange); margin-bottom: 10px;">
                ${trans.from} ${postcard.from.name} ${senderCountryFlag}
            </h3>
            <div style="font-size: 0.9rem; color: #666; margin-bottom: 20px;">
                ${trans.stage || 'Stage'}: ${postcard.stageName} • ${dateStr}
            </div>
        </div>
        
        <div style="
            background: var(--cream);
            border: 3px solid var(--orange);
            border-radius: 15px;
            padding: 25px;
            margin: 20px 0;
            min-height: 150px;
            font-size: 1.05rem;
            line-height: 1.7;
            white-space: pre-wrap;
        ">
            ${postcard.message}
        </div>
        
        <div class="modal-buttons">
            <button class="btn btn-primary" onclick="showMyPostcards()">
                ${trans.back || 'חזור'}
            </button>
        </div>
    `;
    
    modal.classList.add('active');
}

// Make functions globally accessible
window.registerUser = registerUser;
window.showPostcardModal = showPostcardModal;
window.sendPostcard = sendPostcard;
window.initializeUser = initializeUser;
window.showUserRegistration = showUserRegistration;
window.showMyPostcards = showMyPostcards;
window.viewPostcard = viewPostcard;
window.updatePostcardBadge = updatePostcardBadge;

// Update badge when game starts - this is called from sketch.js after Firebase is ready
// Also set up a periodic check
setInterval(() => {
    if (gameState.currentUser) {
        updatePostcardBadge();
    }
}, 30000);

console.log('✅ Postcard system initialized (p5 Web Editor mode - in-memory storage)');
