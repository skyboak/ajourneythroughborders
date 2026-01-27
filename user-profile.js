// ============================================
// USER PROFILE SYSTEM - Settings, Progress, and Postcards
// ============================================

// CRITICAL: Override any exit button functionality from other scripts
(function() {
    'use strict';
    
    // Wait for DOM to be ready
    function overrideExitButton() {
        const exitBtn = document.getElementById('exit-button');
        if (exitBtn) {
            // Force remove all event listeners
            const newBtn = exitBtn.cloneNode(true);
            exitBtn.parentNode.replaceChild(newBtn, exitBtn);
            
            // Set as profile button
            newBtn.innerHTML = '👤';
            newBtn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (typeof showUserProfile === 'function') {
                    showUserProfile();
                }
                return false;
            };
            
            console.log('✓ Exit button overridden to profile button');
        }
    }
    
    // Try multiple times to ensure it works
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', overrideExitButton);
    } else {
        overrideExitButton();
    }
    
    // Retry after delays
    setTimeout(overrideExitButton, 100);
    setTimeout(overrideExitButton, 500);
    setTimeout(overrideExitButton, 1000);
})();

// ============================================
// PROFILE DATA MANAGEMENT
// ============================================

async function saveUserProgress() {
    if (!gameState.currentUser) return;
    
    const progressData = {
        currentStage: gameState.currentStage,
        foundItems: gameState.foundItems,
        currentSearchItem: gameState.currentSearchItem,
        completedStages: gameState.completedStages || [],
        lastPlayed: Date.now()
    };
    
    // Try Firebase first
    if (typeof saveProgressToFirebase === 'function' && typeof getCurrentFirebaseUser === 'function') {
        const firebaseUser = getCurrentFirebaseUser();
        if (firebaseUser) {
            await saveProgressToFirebase();
            console.log('✓ Progress saved to Firebase');
            return;
        }
    }
    
    // Fallback to localStorage
    try {
        localStorage.setItem('user_progress', JSON.stringify(progressData));
        console.log('✓ Progress saved to localStorage');
    } catch (error) {
        console.error('Failed to save progress:', error);
    }
}

async function loadUserProgress() {
    if (!gameState.currentUser) return null;
    
    // Try Firebase first
    if (typeof loadProgressFromFirebase === 'function' && typeof getCurrentFirebaseUser === 'function') {
        const firebaseUser = getCurrentFirebaseUser();
        if (firebaseUser) {
            const progress = await loadProgressFromFirebase();
            if (progress) return progress;
        }
    }
    
    // Fallback to localStorage
    
    try {
        const result = localStorage.getItem('user_progress');
        if (result) {
            const progressData = JSON.parse(result);
            console.log('✓ Progress loaded:', progressData);
            return progressData;
        }
    } catch (error) {
        console.log('No saved progress found');
    }
    return null;
}

async function saveUserSettings(settings) {
    if (!gameState.currentUser) return;
    
    try {
        localStorage.setItem('user_settings', JSON.stringify(settings));
        console.log('✓ Settings saved:', settings);
    } catch (error) {
        console.error('Failed to save settings:', error);
    }
}

async function loadUserSettings() {
    if (!gameState.currentUser) return null;
    
    try {
        const result = localStorage.getItem('user_settings');
        if (result) {
            return JSON.parse(result);
        }
    } catch (error) {
        console.log('No saved settings found');
    }
    return null;
}

// ============================================
// PROFILE MODAL
// ============================================

async function showUserProfile() {
    const lang = gameState.currentLanguage || 'he';
    const trans = GAME_DATA.translations[lang];
    
    // Create a default user if none exists
    if (!gameState.currentUser) {
        gameState.currentUser = {
            id: 'default_user',
            name: lang === 'he' ? 'שחקן' : lang === 'ar' ? 'لاعب' : 'Player',
            timestamp: Date.now()
        };
    }
    
    // Hide game container and show profile page
    const gameContainer = document.getElementById('game-container');
    const searchContainer = document.getElementById('search-item-container');
    const scoreDisplay = document.getElementById('score-display');
    const soundToggle = document.getElementById('sound-toggle');
    const profileBtn = document.getElementById('profile-button');
    const zoomIndicator = document.getElementById('zoom-indicator');
    
    // Hide game elements
    if (gameContainer) gameContainer.style.display = 'none';
    if (searchContainer) searchContainer.style.display = 'none';
    if (scoreDisplay) scoreDisplay.style.display = 'none';
    if (soundToggle) soundToggle.style.display = 'none';
    if (profileBtn) profileBtn.style.display = 'none';
    if (zoomIndicator) zoomIndicator.style.display = 'none';
    
    // Pause the timer while in profile
    if (typeof stopItemTimer === 'function') {
        stopItemTimer();
    }
    
    // Create or get profile page container
    let profilePage = document.getElementById('profile-page');
    if (!profilePage) {
        profilePage = document.createElement('div');
        profilePage.id = 'profile-page';
        profilePage.className = 'profile-page';
        document.body.appendChild(profilePage);
    }
    
    profilePage.style.display = 'block';
    
    // Show overview by default
    await showProfileOverview();
}

async function showProfileOverview() {
    const lang = gameState.currentLanguage;
    const trans = GAME_DATA.translations[lang];
    
    // Get user stats
    const postcards = await getMyPostcards();
    const unreadCount = postcards.filter(p => !p.read).length;
    const progress = await loadUserProgress();
    
    // Calculate progress percentage
    const stageOrder = ['saudi', 'jordan', 'israel', 'syria'];
    const completedStages = progress?.completedStages || [];
    const progressPercent = Math.round((completedStages.length / stageOrder.length) * 100);
    
    const profileText = {
        he: {
            title: 'הפרופיל שלי',
            overview: 'סקירה',
            settings: 'הגדרות',
            postcards: 'גלויות',
            backToGame: 'חזור למשחק',
            userName: 'שם משתמש',
            progress: 'התקדמות במשחק',
            completed: 'הושלמו',
            stages: 'שלבים',
            currentStage: 'שלב נוכחי',
            itemsFound: 'פריטים שנמצאו',
            total: 'סה"כ',
            unread: 'לא נקראו',
            viewPostcards: 'צפה בגלויות',
            continueGame: 'המשך משחק',
            startNew: 'התחל משחק חדש',
            exitGame: 'יציאה מהמשחק'
        },
        en: {
            title: 'My Profile',
            overview: 'Overview',
            settings: 'Settings',
            postcards: 'Postcards',
            backToGame: 'Back to Game',
            userName: 'Username',
            progress: 'Game Progress',
            completed: 'Completed',
            stages: 'Stages',
            currentStage: 'Current Stage',
            itemsFound: 'Items Found',
            total: 'Total',
            unread: 'Unread',
            viewPostcards: 'View Postcards',
            continueGame: 'Continue Game',
            startNew: 'Start New Game',
            exitGame: 'Exit Game'
        },
        ar: {
            title: 'ملفي الشخصي',
            overview: 'نظرة عامة',
            settings: 'الإعدادات',
            postcards: 'البطاقات البريدية',
            backToGame: 'العودة إلى اللعبة',
            userName: 'اسم المستخدم',
            progress: 'تقدم اللعبة',
            completed: 'مكتمل',
            stages: 'مراحل',
            currentStage: 'المرحلة الحالية',
            itemsFound: 'العناصر الموجودة',
            total: 'المجموع',
            unread: 'غير مقروء',
            viewPostcards: 'عرض البطاقات',
            continueGame: 'متابعة اللعبة',
            startNew: 'بدء لعبة جديدة',
            exitGame: 'الخروج من اللعبة'
        }
    };
    
    const t = profileText[lang];
    const stageName = progress ? GAME_DATA.stages[progress.currentStage]?.name[lang] : '-';
    
    const profilePage = document.getElementById('profile-page');
    profilePage.innerHTML = `
        <div class="profile-container">
            <!-- Profile Header -->
            <div class="profile-header">
                <button class="back-to-game-btn" onclick="closeProfilePage()">
                    ← ${t.backToGame}
                </button>
                <h1>${t.title}</h1>
            </div>
            
            <!-- Profile Navigation -->
            <div class="profile-nav">
                <button class="profile-nav-btn active" onclick="showProfileOverview()">
                    📊 ${t.overview}
                </button>
                <button class="profile-nav-btn" onclick="showProfileSettings()">
                    ⚙️ ${t.settings}
                </button>
                <button class="profile-nav-btn" onclick="showMyPostcards()">
                    ✉️ ${t.postcards}
                    ${unreadCount > 0 ? `<span class="nav-badge">${unreadCount}</span>` : ''}
                </button>
            </div>
            
            <!-- Profile Content -->
            <div class="profile-content">
                <!-- User Info Card -->
                <div class="profile-card">
                    <div class="user-avatar-large">
                        ${gameState.currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <h2>${gameState.currentUser.name}</h2>
                    <p class="user-subtitle">${t.userName}</p>
                </div>
                
                <!-- Progress Card -->
                <div class="profile-card">
                    <h3>📊 ${t.progress}</h3>
                    
                    <div class="progress-bar-container">
                        <div class="progress-bar-fill" style="width: ${progressPercent}%">
                            ${progressPercent}%
                        </div>
                    </div>
                    
                    <div class="stats-grid">
                        <div class="stat-item">
                            <div class="stat-label">${t.completed}</div>
                            <div class="stat-value">${completedStages.length}/${stageOrder.length}</div>
                            <div class="stat-subtitle">${t.stages}</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-label">${t.currentStage}</div>
                            <div class="stat-value">${stageName}</div>
                        </div>
                    </div>
                    
                    ${progress ? `
                        <div class="stat-item">
                            <div class="stat-label">${t.itemsFound}</div>
                            <div class="stat-value">
                                ${progress.foundItems.length}/${GAME_DATA.stages[progress.currentStage]?.items.length || 0}
                            </div>
                        </div>
                    ` : ''}
                </div>
                
                <!-- Postcards Card -->
                <div class="profile-card">
                    <h3>✉️ ${t.postcards}</h3>
                    
                    <div class="stats-grid">
                        <div class="stat-item">
                            <div class="stat-label">${t.total}</div>
                            <div class="stat-value">${postcards.length}</div>
                        </div>
                        ${unreadCount > 0 ? `
                            <div class="stat-item">
                                <div class="stat-label">${t.unread}</div>
                                <div class="stat-value highlight">${unreadCount}</div>
                            </div>
                        ` : ''}
                    </div>
                    
                    <button class="btn btn-primary full-width" onclick="showMyPostcards()">
                        ${t.viewPostcards}
                    </button>
                </div>
                
                <!-- Action Buttons -->
                <div class="profile-actions">
                    ${progress ? `
                        <button class="btn btn-primary" onclick="continueGameFromProfile()">
                            ${t.continueGame}
                        </button>
                    ` : ''}
                    <button class="btn btn-secondary" onclick="resetGameProgress()">
                        ${t.startNew}
                    </button>
                    <button class="btn btn-danger" onclick="exitGame()">
                        ${t.exitGame}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Stop p5.js from capturing events on profile page
    const profilePageEl = document.getElementById('profile-page');
    profilePageEl.addEventListener('mousedown', (e) => e.stopPropagation());
}

async function showProfileSettings() {
    const lang = gameState.currentLanguage;
    const settings = await loadUserSettings() || {
        language: lang,
        soundEnabled: gameState.soundEnabled
    };
    
    // Save settings globally so saveProfileSettings can access it
    window.currentProfileSettings = settings;
    
    const profileText = {
        he: {
            title: 'הגדרות',
            language: 'שפה',
            sound: 'צלילים',
            on: 'פעיל',
            off: 'כבוי',
            saveSettings: 'שמור הגדרות',
            overview: 'סקירה',
            settings: 'הגדרות',
            postcards: 'גלויות',
            backToGame: 'חזור למשחק'
        },
        en: {
            title: 'Settings',
            language: 'Language',
            sound: 'Sound',
            on: 'On',
            off: 'Off',
            saveSettings: 'Save Settings',
            overview: 'Overview',
            settings: 'Settings',
            postcards: 'Postcards',
            backToGame: 'Back to Game'
        },
        ar: {
            title: 'الإعدادات',
            language: 'اللغة',
            sound: 'الصوت',
            on: 'مفعّل',
            off: 'معطّل',
            saveSettings: 'حفظ الإعدادات',
            overview: 'نظرة عامة',
            settings: 'الإعدادات',
            postcards: 'البطاقات البريدية',
            backToGame: 'العودة إلى اللعبة'
        }
    };
    
    const t = profileText[lang];
    
    const postcards = await getMyPostcards();
    const unreadCount = postcards.filter(p => !p.read).length;
    
    const profilePage = document.getElementById('profile-page');
    profilePage.innerHTML = `
        <div class="profile-container">
            <!-- Profile Header -->
            <div class="profile-header">
                <button class="back-to-game-btn" onclick="closeProfilePage()">
                    ← ${t.backToGame}
                </button>
                <h1>${t.title}</h1>
            </div>
            
            <!-- Profile Navigation -->
            <div class="profile-nav">
                <button class="profile-nav-btn" onclick="showProfileOverview()">
                    📊 ${t.overview}
                </button>
                <button class="profile-nav-btn active" onclick="showProfileSettings()">
                    ⚙️ ${t.settings}
                </button>
                <button class="profile-nav-btn" onclick="showMyPostcards()">
                    ✉️ ${t.postcards}
                    ${unreadCount > 0 ? `<span class="nav-badge">${unreadCount}</span>` : ''}
                </button>
            </div>
            
            <!-- Settings Content -->
            <div class="profile-content">
                <div class="profile-card">
                    <h3>⚙️ ${t.settings}</h3>
                    
                    <!-- Language Setting -->
                    <div class="setting-item">
                        <label class="setting-label">
                            <span class="setting-icon">🌐</span>
                            <span>${t.language}</span>
                        </label>
                        <select id="profile-language" class="setting-select">
                            <option value="he" ${lang === 'he' ? 'selected' : ''}>עברית</option>
                            <option value="en" ${lang === 'en' ? 'selected' : ''}>English</option>
                            <option value="ar" ${lang === 'ar' ? 'selected' : ''}>العربية</option>
                        </select>
                    </div>
                    
                    <!-- Sound Setting -->
                    <div class="setting-item">
                        <label class="setting-label">
                            <span class="setting-icon">🔊</span>
                            <span>${t.sound}</span>
                        </label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="profile-sound" ${settings.soundEnabled ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    
                    <button class="btn btn-primary full-width" onclick="saveProfileSettings()">
                        ${t.saveSettings}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Stop p5.js from capturing events on profile page
    const profilePageEl = document.getElementById('profile-page');
    profilePageEl.addEventListener('mousedown', (e) => e.stopPropagation());
    
    // Add event listeners
    setupProfileSettingsListeners(settings);
}

function setupProfileSettingsListeners(currentSettings) {
    console.log('🔧 Setting up profile settings listeners...');
    console.log('Current settings:', currentSettings);
    
    // Make sure we're updating the global settings object
    if (!window.currentProfileSettings) {
        window.currentProfileSettings = currentSettings;
    }
    
    // Language change
    const langSelect = document.getElementById('profile-language');
    console.log('Language select element:', langSelect);
    
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            window.currentProfileSettings.language = e.target.value;
            console.log('✓ Language changed to:', e.target.value);
        });
        console.log('✓ Language listener added');
    } else {
        console.error('❌ Language select not found!');
    }
    
    // Sound toggle
    const soundCheckbox = document.getElementById('profile-sound');
    console.log('Sound checkbox element:', soundCheckbox);
    
    if (soundCheckbox) {
        soundCheckbox.addEventListener('change', (e) => {
            window.currentProfileSettings.soundEnabled = e.target.checked;
            console.log('✓ Sound changed to:', e.target.checked);
        });
        console.log('✓ Sound listener added');
    } else {
        console.error('❌ Sound checkbox not found!');
    }
    
    console.log('✅ Profile settings listeners setup complete');
}

function closeProfilePage() {
    const profilePage = document.getElementById('profile-page');
    const gameContainer = document.getElementById('game-container');
    const searchContainer = document.getElementById('search-item-container');
    const scoreDisplay = document.getElementById('score-display');
    const soundToggle = document.getElementById('sound-toggle');
    const profileBtn = document.getElementById('profile-button');
    const zoomIndicator = document.getElementById('zoom-indicator');
    
    // Hide profile page
    if (profilePage) profilePage.style.display = 'none';
    
    // Show game elements
    if (gameContainer) gameContainer.style.display = 'block';
    if (soundToggle) soundToggle.style.display = 'flex';
    if (profileBtn) profileBtn.style.display = 'flex';
    
    // Update postcard badge on profile button
    if (typeof window.updatePostcardBadge === 'function') {
        window.updatePostcardBadge();
    }
    
    // Show search container and score only if game started
    if (gameStarted) {
        if (searchContainer) searchContainer.style.display = 'block';
        if (scoreDisplay) scoreDisplay.style.display = 'flex';
        
        // Resume the timer
        if (typeof startItemTimer === 'function') {
            startItemTimer();
        }
    }
}

function setupProfileEventListeners(currentSettings) {
    // Language change
    const langSelect = document.getElementById('profile-language');
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            currentSettings.language = e.target.value;
        });
    }
    
    // Sound toggle
    const soundCheckbox = document.getElementById('profile-sound');
    const soundLabel = soundCheckbox?.closest('label');
    if (soundLabel) {
        soundLabel.addEventListener('click', (e) => {
            e.preventDefault();
            soundCheckbox.checked = !soundCheckbox.checked;
            currentSettings.soundEnabled = soundCheckbox.checked;
            
            // Update visual toggle
            const toggle = soundLabel.querySelector('div[style*="position: relative"]');
            const slider = toggle?.querySelector('div[style*="position: absolute"]');
            if (toggle && slider) {
                toggle.style.background = soundCheckbox.checked ? 'var(--teal)' : '#ccc';
                const lang = gameState.currentLanguage;
                const isRTL = lang === 'he' || lang === 'ar';
                slider.style[isRTL ? 'right' : 'left'] = soundCheckbox.checked ? '24px' : '2px';
            }
        });
    }
}

window.saveProfileSettings = async function() {
    const lang = document.getElementById('profile-language')?.value || gameState.currentLanguage;
    const sound = document.getElementById('profile-sound')?.checked ?? gameState.soundEnabled;
    
    const settings = {
        language: lang,
        soundEnabled: sound
    };
    
    await saveUserSettings(settings);
    
    // Apply settings
    if (lang !== gameState.currentLanguage) {
        gameState.currentLanguage = lang;
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', lang === 'ar' || lang === 'he' ? 'rtl' : 'ltr');
    }
    
    gameState.soundEnabled = sound;
    const soundToggle = document.getElementById('sound-toggle');
    if (soundToggle) {
        soundToggle.textContent = sound ? '♪' : '🔇';
    }
    
    // Show success message
    const trans = GAME_DATA.translations[lang];
    showBriefMessage(trans.close + ' ✓', 'success');
    
    // Refresh profile to show new language
    setTimeout(() => {
        showUserProfile();
    }, 500);
};

window.continueGameFromProfile = async function() {
    const progress = await loadUserProgress();
    if (!progress) return;
    
    closeModal();
    
    // Restore game state
    gameState.currentStage = progress.currentStage;
    gameState.foundItems = progress.foundItems;
    gameState.currentSearchItem = progress.currentSearchItem;
    gameState.completedStages = progress.completedStages || [];
    
    // Load stage image
    const stage = GAME_DATA.stages[progress.currentStage];
    if (!stage) return;
    
    const imageFile = stage.image || `${progress.currentStage}.jpg`;
    
    loadImage(imageFile, 
        (img) => {
            stageImage = img;
            centerImage();
            updateSearchItemCircle();
            
            const lang = gameState.currentLanguage;
            const message = lang === 'he' ? 'המשך משחק ✓' :
                            lang === 'ar' ? 'تابع اللعبة ✓' :
                            'Continue Game ✓';
            showBriefMessage(message, 'success');
        },
        (error) => {
            console.error('Failed to load stage image:', error);
        }
    );
};

window.resetGameProgress = async function() {
    const lang = gameState.currentLanguage;
    const trans = {
        he: {
            confirm: 'האם אתה בטוח שברצונך להתחיל משחק חדש? כל ההתקדמות תימחק.',
            success: 'משחק חדש התחיל!'
        },
        en: {
            confirm: 'Are you sure you want to start a new game? All progress will be lost.',
            success: 'New game started!'
        },
        ar: {
            confirm: 'هل أنت متأكد أنك تريد بدء لعبة جديدة؟ سيتم حذف كل التقدم.',
            success: 'بدأت لعبة جديدة!'
        }
    };
    
    if (!confirm(trans[lang].confirm)) return;
    
    // Delete progress
    try {
        localStorage.removeItem('user_progress');
    } catch (error) {
        console.error('Failed to delete progress:', error);
    }
    
    // Reset game state
    gameState.currentStage = 'saudi';
    gameState.foundItems = [];
    gameState.currentSearchItem = 0;
    gameState.completedStages = [];
    gameState.stageComplete = false;
    
    closeModal();
    
    // Load first stage
    loadImage('saudi.jpg', 
        (img) => {
            stageImage = img;
            centerImage();
            updateSearchItemCircle();
            showBriefMessage(trans[lang].success, 'success');
        }
    );
};

// ============================================
// AUTO-SAVE PROGRESS
// ============================================

// Function to wrap handleCorrectItemFound for auto-save
function wrapHandleCorrectItemFound() {
    if (typeof window.handleCorrectItemFound !== 'function') {
        console.warn('handleCorrectItemFound not found yet, will retry...');
        setTimeout(wrapHandleCorrectItemFound, 100);
        return;
    }
    
    const originalHandleCorrectItemFound = window.handleCorrectItemFound;
    
    window.handleCorrectItemFound = async function(item) {
        // Call original function
        originalHandleCorrectItemFound(item);
        
        // Save progress after item found
        await saveUserProgress();
        
        // If stage completed, mark it
        if (gameState.stageComplete) {
            const completedStages = gameState.completedStages || [];
            if (!completedStages.includes(gameState.currentStage)) {
                completedStages.push(gameState.currentStage);
                gameState.completedStages = completedStages;
                await saveUserProgress();
            }
        }
    };
    
    console.log('✓ handleCorrectItemFound wrapped for auto-save');
}

// Function to wrap continueToStage for auto-save
function wrapContinueToStage() {
    if (typeof window.continueToStage !== 'function') {
        console.warn('continueToStage not found yet, will retry...');
        setTimeout(wrapContinueToStage, 100);
        return;
    }
    
    const originalContinueToStage = window.continueToStage;
    
    window.continueToStage = async function(nextStage) {
        // Call original function
        originalContinueToStage(nextStage);
        
        // Save new stage progress
        setTimeout(async () => {
            await saveUserProgress();
        }, 500);
    };
    
    console.log('✓ continueToStage wrapped for auto-save');
}

// ============================================
// PROFILE BUTTON IN UI
// ============================================

function setupProfileButton() {
    // Use the profile-button element
    const profileBtn = document.getElementById('profile-button');
    if (!profileBtn) {
        console.error('Exit button not found!');
        return;
    }
    
    console.log('Setting up profile button...');
    
    // Remove ALL event listeners by replacing the element
    const newProfileBtn = profileBtn.cloneNode(true);
    profileBtn.parentNode.replaceChild(newProfileBtn, profileBtn);
    
    // Set profile icon and title
    newProfileBtn.innerHTML = '👤';
    newProfileBtn.title = 'הפרופיל שלי / My Profile / ملفي الشخصي';
    
    // Add click event to open profile - with force
    newProfileBtn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Profile button clicked!');
        showUserProfile();
        return false;
    };
    
    // Also add addEventListener as backup
    newProfileBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Profile button clicked (addEventListener)!');
        showUserProfile();
        return false;
    }, true);
    
    console.log('✓ Profile button configured successfully');
}

// Ensure setupProfileButton is called after everything loads
function initializeProfileSystem() {
    console.log('Initializing profile system...');
    
    // Try to setup immediately
    setupProfileButton();
    
    // Also try again after a short delay to ensure it works
    setTimeout(() => {
        console.log('Retrying profile button setup...');
        setupProfileButton();
    }, 500);
    
    // And one more time to be absolutely sure
    setTimeout(() => {
        console.log('Final profile button setup check...');
        const btn = document.getElementById('exit-button');
        if (btn && !btn.onclick) {
            console.log('Profile button needs reattachment, fixing...');
            setupProfileButton();
        }
    }, 1500);
}

// Initialize profile button when game starts
const originalContinueGameStart = window.continueGameStart;
window.continueGameStart = async function() {
    originalContinueGameStart();
    
    // Setup profile button functionality with retries
    initializeProfileSystem();
    
    // Wrap functions for auto-save
    wrapHandleCorrectItemFound();
    wrapContinueToStage();
    
    // Load and apply saved settings
    const settings = await loadUserSettings();
    if (settings) {
        if (settings.language && settings.language !== gameState.currentLanguage) {
            gameState.currentLanguage = settings.language;
            document.documentElement.setAttribute('lang', settings.language);
            document.documentElement.setAttribute('dir', settings.language === 'ar' || settings.language === 'he' ? 'rtl' : 'ltr');
        }
        
        if (typeof settings.soundEnabled !== 'undefined') {
            gameState.soundEnabled = settings.soundEnabled;
            const soundToggle = document.getElementById('sound-toggle');
            if (soundToggle) {
                soundToggle.textContent = settings.soundEnabled ? '♪' : '🔇';
            }
        }
    }
    
    // Check if there's saved progress and ask if user wants to continue
    const progress = await loadUserProgress();
    if (progress && progress.currentStage !== 'saudi') {
        setTimeout(() => {
            showContinueGamePrompt(progress);
        }, 1000);
    }
};

function showContinueGamePrompt(progress) {
    const lang = gameState.currentLanguage;
    const trans = {
        he: {
            title: 'נמצאה התקדמות שמורה',
            message: 'האם תרצה להמשיך מהמקום שבו עצרת?',
            continue: 'המשך משחק',
            startNew: 'התחל מחדש'
        },
        en: {
            title: 'Saved Progress Found',
            message: 'Would you like to continue from where you left off?',
            continue: 'Continue Game',
            startNew: 'Start New'
        },
        ar: {
            title: 'تم العثور على تقدم محفوظ',
            message: 'هل تريد المتابعة من حيث توقفت؟',
            continue: 'متابعة اللعبة',
            startNew: 'ابدأ من جديد'
        }
    };
    
    const t = trans[lang];
    const modal = document.querySelector('.modal-overlay');
    const modalBody = document.querySelector('.modal-body');
    
    const stageName = GAME_DATA.stages[progress.currentStage]?.name[lang] || progress.currentStage;
    
    modalBody.innerHTML = `
        <h3>${t.title}</h3>
        <p style="text-align: center; font-size: 1.1rem; margin: 20px 0;">
            ${t.message}
        </p>
        <div style="background: var(--cream); border-radius: 12px; padding: 15px; margin: 20px 0; text-align: center;">
            <div style="font-size: 0.9rem; color: #666; margin-bottom: 5px;">
                ${lang === 'he' ? 'שלב נוכחי' : lang === 'ar' ? 'المرحلة الحالية' : 'Current Stage'}
            </div>
            <div style="font-size: 1.3rem; font-weight: 700; color: var(--orange);">
                ${stageName}
            </div>
            <div style="font-size: 0.9rem; color: var(--navy); margin-top: 10px;">
                ${progress.foundItems.length}/${GAME_DATA.stages[progress.currentStage]?.items.length || 0} 
                ${lang === 'he' ? 'פריטים נמצאו' : lang === 'ar' ? 'عناصر موجودة' : 'items found'}
            </div>
        </div>
        <div class="modal-buttons">
            <button class="btn btn-secondary" onclick="resetGameProgress()">
                ${t.startNew}
            </button>
            <button class="btn btn-primary" onclick="continueGameFromProfile()">
                ${t.continue}
            </button>
        </div>
    `;
    
    modal.classList.add('active');
}

// Make functions globally accessible
window.showUserProfile = showUserProfile;
window.showProfileOverview = showProfileOverview;
window.showProfileSettings = showProfileSettings;
window.closeProfilePage = closeProfilePage;
window.saveUserProgress = saveUserProgress;
window.loadUserProgress = loadUserProgress;

// Show postcards in profile page
window.showProfilePostcards = async function() {
    const lang = gameState.currentLanguage;
    
    const profileText = {
        he: {
            title: 'הגלויות שלי',
            overview: 'סקירה',
            settings: 'הגדרות',
            postcards: 'גלויות',
            backToGame: 'חזור למשחק',
            noPostcards: 'אין לך גלויות עדיין',
            from: 'מאת:',
            stage: 'מ:',
            markRead: 'סמן כנקרא',
            delete: 'מחק',
            unread: 'חדש'
        },
        en: {
            title: 'My Postcards',
            overview: 'Overview',
            settings: 'Settings',
            postcards: 'Postcards',
            backToGame: 'Back to Game',
            noPostcards: 'You have no postcards yet',
            from: 'From:',
            stage: 'From:',
            markRead: 'Mark as Read',
            delete: 'Delete',
            unread: 'New'
        },
        ar: {
            title: 'بطاقاتي البريدية',
            overview: 'نظرة عامة',
            settings: 'الإعدادات',
            postcards: 'البطاقات البريدية',
            backToGame: 'العودة إلى اللعبة',
            noPostcards: 'ليس لديك بطاقات بريدية بعد',
            from: 'من:',
            stage: 'من:',
            markRead: 'وضع علامة مقروء',
            delete: 'حذف',
            unread: 'جديد'
        }
    };
    
    const t = profileText[lang];
    const postcards = await getMyPostcards();
    const unreadCount = postcards.filter(p => !p.read).length;
    
    let postcardsHTML = '';
    
    if (postcards.length === 0) {
        postcardsHTML = `
            <div class="empty-state">
                <div class="empty-icon">✉️</div>
                <p>${t.noPostcards}</p>
            </div>
        `;
    } else {
        postcardsHTML = postcards.map((postcard, index) => {
            const dateStr = new Date(postcard.timestamp?.toDate ? postcard.timestamp.toDate() : postcard.timestamp)
                .toLocaleDateString(lang === 'he' ? 'he-IL' : lang === 'ar' ? 'ar-SA' : 'en-US');
            const isUnread = !postcard.read;
            
            return `
                <div class="postcard-card ${isUnread ? 'unread' : ''}" onclick="viewPostcardInProfile(${index})">
                    ${isUnread ? `<span class="postcard-badge">${t.unread}</span>` : ''}
                    <div class="postcard-header">
                        <span class="postcard-from">${t.from} ${postcard.from?.name || postcard.fromName || 'Unknown'}</span>
                        <span class="postcard-date">${dateStr}</span>
                    </div>
                    <div class="postcard-stage">${t.stage} ${postcard.stageName}</div>
                    <div class="postcard-preview">${postcard.message}</div>
                </div>
            `;
        }).join('');
    }
    
    const profilePage = document.getElementById('profile-page');
    profilePage.innerHTML = `
        <div class="profile-container">
            <!-- Profile Header -->
            <div class="profile-header">
                <button class="back-to-game-btn" onclick="closeProfilePage()">
                    ← ${t.backToGame}
                </button>
                <h1>${t.title}</h1>
            </div>
            
            <!-- Profile Navigation -->
            <div class="profile-nav">
                <button class="profile-nav-btn" onclick="showProfileOverview()">
                    📊 ${t.overview}
                </button>
                <button class="profile-nav-btn" onclick="showProfileSettings()">
                    ⚙️ ${t.settings}
                </button>
                <button class="profile-nav-btn active" onclick="showProfilePostcards()">
                    ✉️ ${t.postcards}
                    ${unreadCount > 0 ? `<span class="nav-badge">${unreadCount}</span>` : ''}
                </button>
            </div>
            
            <!-- Postcards Content -->
            <div class="profile-content">
                <div class="postcards-list">
                    ${postcardsHTML}
                </div>
            </div>
        </div>
    `;
    
    // Stop p5.js from capturing events
    const profilePageEl = document.getElementById('profile-page');
    profilePageEl.addEventListener('mousedown', (e) => e.stopPropagation());
};

// View a single postcard in profile
window.viewPostcardInProfile = async function(index) {
    const lang = gameState.currentLanguage;
    const postcards = await getMyPostcards();
    const postcard = postcards[index];
    
    if (!postcard) return;
    
    // Mark as read
    if (!postcard.read && postcard.id && typeof markPostcardAsReadFirebase === 'function') {
        await markPostcardAsReadFirebase(postcard.id);
        // Update the badge after marking as read
        if (typeof window.updatePostcardBadge === 'function') {
            window.updatePostcardBadge();
        }
    }
    
    const t = {
        he: { back: 'חזרה לגלויות', from: 'מאת:', stage: 'נשלח מ:', date: 'תאריך:' },
        en: { back: 'Back to Postcards', from: 'From:', stage: 'Sent from:', date: 'Date:' },
        ar: { back: 'العودة للبطاقات', from: 'من:', stage: 'أرسلت من:', date: 'التاריخ:' }
    }[lang];
    
    const dateStr = new Date(postcard.timestamp?.toDate ? postcard.timestamp.toDate() : postcard.timestamp)
        .toLocaleDateString(lang === 'he' ? 'he-IL' : lang === 'ar' ? 'ar-SA' : 'en-US');
    
    const profilePage = document.getElementById('profile-page');
    const container = profilePage.querySelector('.profile-content');
    
    container.innerHTML = `
        <div class="postcard-full">
            <button class="btn btn-secondary" onclick="showProfilePostcards()" style="margin-bottom: 20px;">
                ← ${t.back}
            </button>
            
            <div class="postcard-full-card">
                <div class="postcard-full-header">
                    <div class="postcard-full-from">${t.from} ${postcard.from?.name || postcard.fromName || 'Unknown'}</div>
                    <div class="postcard-full-meta">
                        <span>${t.stage} ${postcard.stageName}</span>
                        <span>${t.date} ${dateStr}</span>
                    </div>
                </div>
                <div class="postcard-full-message">
                    ${postcard.message}
                </div>
            </div>
        </div>
    `;
};

// Override showMyPostcards to use profile page version when in profile
const originalShowMyPostcards = window.showMyPostcards;
window.showMyPostcards = function() {
    const profilePage = document.getElementById('profile-page');
    if (profilePage && profilePage.style.display !== 'none') {
        // In profile page - show postcards in profile
        window.showProfilePostcards();
    } else if (originalShowMyPostcards) {
        // Not in profile - use original modal
        originalShowMyPostcards();
    }
};

// Exit game function
window.exitGame = function() {
    const lang = gameState.currentLanguage;
    const confirmText = lang === 'he' ? 'האם אתה בטוח שברצונך לצאת מהמשחק?' :
                        lang === 'ar' ? 'هل أنت متأكد أنك تريد الخروج من اللعبة؟' :
                        'Are you sure you want to exit the game?';
    
    if (confirm(confirmText)) {
        location.reload();
    }
};
