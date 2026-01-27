// ============================================
// BLOCK CONFIRM ON PROFILE BUTTON
// This file MUST load BEFORE sketch.js
// ============================================
(function() {
    'use strict';
    
    console.log('🛡️ Profile button protector loaded');
    
    // Save original confirm function
    const originalConfirm = window.confirm;
    
    // Override confirm to block it when profile button is clicked
    window.confirm = function(message) {
        // Check if this confirm is about exiting the game
        if (message && (
            message.includes('צאת') || 
            message.includes('exit') || 
            message.includes('יציאה') ||
            message.includes('לצאת')
        )) {
            console.log('🚫 Blocked exit confirmation dialog');
            return false;
        }
        
        // For other confirms, use the original function
        return originalConfirm.apply(this, arguments);
    };
    
    console.log('✅ Profile button protected from confirm dialogs');
})();
