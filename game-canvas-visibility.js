// ============================================
// GAME CANVAS VISIBILITY FIX
// Ensures game container doesn't block UI elements
// ============================================
(function() {
    'use strict';
    
    console.log('🎮 Game canvas visibility fix loaded');
    
    // Language buttons already have onclick handlers in HTML
    // No need to override them - just ensure pointer-events work
    
    function ensureButtonsClickable() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.style.pointerEvents = 'auto';
            btn.style.cursor = 'pointer';
            btn.style.position = 'relative';
            btn.style.zIndex = '10';
        });
        
        // Ensure language selection box is above everything
        const langBox = document.querySelector('.language-selection-box');
        if (langBox) {
            langBox.style.position = 'relative';
            langBox.style.zIndex = '10';
        }
    }
    
    // Run once after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ensureButtonsClickable);
    } else {
        ensureButtonsClickable();
    }
    
    console.log('✅ Game canvas visibility fix installed');
})();
