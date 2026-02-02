// ============================================
// BACKGROUND MUSIC SYSTEM
// גרסה סופית - מנוקה ופשוטה
// ============================================

let backgroundMusic = null;
let currentMusicStage = null;
let musicEnabled = true;

// ============================================
// פונקציות בסיסיות
// ============================================

function playStageMusic(stageName) {
    console.log(`🎵 מנגן מוזיקה עבור: ${stageName}`);
    
    // בדיקה אם מוזיקה מופעלת
    if (!musicEnabled) {
        console.log('🔇 מוזיקה מושתקת');
        return;
    }
    
    // אם כבר מנגן את המוזיקה של השלב הזה - לא צריך לעשות כלום
    if (currentMusicStage === stageName && backgroundMusic && !backgroundMusic.paused) {
        console.log(`✅ כבר מנגן את ${stageName}`);
        return;
    }
    
    // מציאת קובץ המוזיקה
    const stage = GAME_DATA.stages[stageName];
    if (!stage || !stage.music) {
        console.log(`⚠️ אין מוזיקה לשלב: ${stageName}`);
        return;
    }
    
    // עצירת מוזיקה נוכחית
    stopBackgroundMusic();
    
    // יצירה והפעלה של מוזיקה חדשה
    try {
        backgroundMusic = new Audio(stage.music);
        backgroundMusic.loop = true;
        backgroundMusic.volume = 0.3;
        
        backgroundMusic.play()
            .then(() => {
                currentMusicStage = stageName;
                console.log(`✅ מנגן: ${stage.music}`);
            })
            .catch(error => {
                console.log(`⚠️ הדפדפן חסם autoplay - המוזיקה תנוגן אחרי לחיצה`);
                // נשמור איזה שלב רצינו לנגן
                window._pendingMusicStage = stageName;
            });
            
    } catch (error) {
        console.error(`❌ שגיאה בטעינת מוזיקה:`, error);
    }
}

function stopBackgroundMusic() {
    if (backgroundMusic) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
        backgroundMusic = null;
        currentMusicStage = null;
    }
}

function pauseBackgroundMusic() {
    if (backgroundMusic && !backgroundMusic.paused) {
        backgroundMusic.pause();
    }
}

function resumeBackgroundMusic() {
    if (backgroundMusic && backgroundMusic.paused && musicEnabled) {
        backgroundMusic.play().catch(error => {
            console.error('שגיאה בהמשך ניגון:', error);
        });
    }
}

function toggleBackgroundMusic() {
    musicEnabled = !musicEnabled;
    
    if (musicEnabled) {
        // אם הפעלנו את המוזיקה - ננגן את השלב הנוכחי
        if (gameState && gameState.currentStage) {
            playStageMusic(gameState.currentStage);
        }
    } else {
        // אם כיבינו - נעצור
        stopBackgroundMusic();
    }
    
    // עדכון מצב המשחק
    if (gameState) {
        gameState.soundEnabled = musicEnabled;
    }
    
    return musicEnabled;
}

function setMusicVolume(volume) {
    if (backgroundMusic) {
        backgroundMusic.volume = Math.max(0, Math.min(1, volume));
    }
}

// ============================================
// חיבור למשחק
// ============================================

// מאזין לאינטראקציה ראשונה (כדי לעקוף את חסימת autoplay)
let firstInteraction = false;
let gameActuallyStarted = false; // דגל חדש - האם המשחק התחיל בפועל

function handleFirstInteraction() {
    if (firstInteraction) return;
    firstInteraction = true;
    
    console.log('👆 אינטראקציה ראשונה - מוזיקה מוכנה');
    
    // לא מנגנים מוזיקה עד שהמשחק באמת מתחיל
    // המוזיקה תתחיל רק כאשר השחקן נכנס לשלב ראשון
}

// הוספת מאזינים
document.addEventListener('click', handleFirstInteraction, { once: true });
document.addEventListener('touchstart', handleFirstInteraction, { once: true });
document.addEventListener('keydown', handleFirstInteraction, { once: true });

// ============================================
// חיבור אוטומטי לשינויי שלבים
// ============================================

// פונקציה שעוקבת אחרי שינוי שלב
function watchStageChanges() {
    if (typeof gameState === 'undefined') {
        // אם המשחק עוד לא נטען, ננסה שוב בעוד רגע
        setTimeout(watchStageChanges, 100);
        return;
    }
    
    let lastStage = gameState.currentStage;
    
    setInterval(() => {
        if (gameState.currentStage && gameState.currentStage !== lastStage) {
            console.log(`🔄 שלב השתנה: ${lastStage} → ${gameState.currentStage}`);
            lastStage = gameState.currentStage;
            
            // סימון שהמשחק התחיל בפועל
            if (!gameActuallyStarted && gameState.currentStage) {
                gameActuallyStarted = true;
                console.log('🎮 המשחק התחיל - מתחיל מוזיקה');
            }
            
            // ניגון מוזיקה לשלב החדש - רק אם המשחק התחיל
            if (musicEnabled && gameActuallyStarted) {
                playStageMusic(gameState.currentStage);
            }
        }
    }, 200);
}

// התחלת המעקב
watchStageChanges();

// ============================================
// הפיכה לגלובלי
// ============================================

window.playStageMusic = playStageMusic;
window.stopBackgroundMusic = stopBackgroundMusic;
window.pauseBackgroundMusic = pauseBackgroundMusic;
window.resumeBackgroundMusic = resumeBackgroundMusic;
window.toggleBackgroundMusic = toggleBackgroundMusic;
window.setMusicVolume = setMusicVolume;

console.log('✅ מערכת מוזיקה טעונה');
