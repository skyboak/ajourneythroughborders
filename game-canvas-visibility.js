// ============================================
// LANGUAGE SELECTION - PRESERVE ORIGINAL FLOW
// Just make buttons work, DON'T override selectLanguage!
// ============================================
(function() {
    'use strict';
    
    console.log('🌐 Language selection fix loaded');
    
    function fixLanguageButtons() {
        console.log('🔧 Searching for language buttons...');
        
        const allButtons = document.querySelectorAll('button');
        const languageButtons = [];
        
        allButtons.forEach((btn) => {
            const text = btn.textContent.trim();
            
            if (text === 'עברית' || text === 'English' || text === 'العربية' ||
                text.includes('עברית') || text.includes('English') || text.includes('العربية')) {
                languageButtons.push(btn);
            }
        });
        
        if (languageButtons.length === 0) {
            return false;
        }
        
        languageButtons.forEach((btn) => {
            const text = btn.textContent.trim();
            
            let lang = 'he';
            if (text === 'English' || text.includes('English')) {
                lang = 'en';
            } else if (text === 'العربية' || text.includes('العربية')) {
                lang = 'ar';
            }
            
            console.log(`🎯 Configuring button "${text}" for language: ${lang}`);
            
            // Just make the button call selectLanguage - don't override anything!
            btn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Language button clicked: ${lang}`);
                
                // Call sketch.js selectLanguage which will show splash screens
                if (typeof window.selectLanguage === 'function') {
                    window.selectLanguage(lang);
                }
                
                return false;
            };
            
            btn.style.pointerEvents = 'auto';
            btn.style.cursor = 'pointer';
        });
        
        return true;
    }
    
    // Try fixing buttons
    const delays = [0, 500, 1500];
    let fixed = false;
    
    delays.forEach(delay => {
        setTimeout(() => {
            if (!fixed) {
                fixed = fixLanguageButtons();
            }
        }, delay);
    });
    
    console.log('✅ Language fix installed - preserving original flow');
})();
