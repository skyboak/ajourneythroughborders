// ============================================
// CLOSE MODAL FIX - Handle stage completion properly
// טוען אחרי sketch.js כדי לדרוס את closeModal
// ============================================
(function() {
    'use strict';
    
    console.log('🎬 Close Modal Fix loading...');
    
    function overrideFunctions() {
        if (typeof window.closeModal === 'undefined' || typeof window.showStageCompleteModal === 'undefined') {
            console.log('⏳ Waiting for closeModal and showStageCompleteModal...');
            setTimeout(overrideFunctions, 100);
            return;
        }
        
        console.log('✅ Overriding closeModal and showStageCompleteModal');
        
        // ============================================
        // OVERRIDE 1: showStageCompleteModal
        // For Syria - go directly to passport video!
        // ============================================
        window.showStageCompleteModal = function() {
            console.log('📋 showStageCompleteModal called! Stage:', gameState?.currentStage);
            
            // If this is Syria - skip modal and go to passport video!
            if (gameState && gameState.currentStage === 'syria') {
                console.log('🚫 Syria completed - skipping modal, showing passport video!');
                setTimeout(() => {
                    if (typeof showPassportVideo === 'function') {
                        showPassportVideo();
                    } else {
                        console.error('❌ showPassportVideo not found!');
                        // Fallback to game complete modal
                        showGameCompleteModal();
                    }
                }, 300);
                return;
            }
            
            const lang = gameState.currentLanguage || 'he';
            const modal = document.querySelector('.modal-overlay');
            const modalBody = document.querySelector('.modal-body');
            const trans = GAME_DATA.translations[lang];
            
            const stageCompleteText = lang === 'he' ? 'סיימת את השלב! האם תרצה לשלוח גלויה מעוצבת ממדינה זו?' :
                                       lang === 'ar' ? 'لقد أكملت المرحلة! هل تريد إرسال بطاقة بريدية من هذا البلد؟' :
                                       'You completed the stage! Would you like to send a postcard from this country?';
            
            if (modal && modalBody) {
                modalBody.innerHTML = `
                    <h3>${trans.stageComplete}</h3>
                    <p>${stageCompleteText}</p>
                    <div class="modal-buttons">
                        <button class="btn btn-secondary" onclick="continueToNextStage()">
                            ${trans.nextStage}
                        </button>
                        <button class="btn btn-primary" onclick="openPostcardForm()">
                            ${trans.sendPostcard}
                        </button>
                    </div>
                `;
                modal.classList.add('active');
            }
        };
        
        // ============================================
        // OVERRIDE 2: closeModal
        // ============================================
        window.closeModal = function() {
            const modal = document.querySelector('.modal-overlay');
            
            // Check if we're closing the postcard modal and came from stage complete
            const isPostcardModal = document.getElementById('postcard-recipient') !== null;
            
            if (isPostcardModal && gameState.fromStageComplete) {
                // Return to stage complete modal instead of closing
                gameState.fromStageComplete = false;
                setTimeout(() => showStageCompleteModal(), 100);
                return;
            }
            
            // Check if we were showing item info modal
            const wasShowingItemInfo = gameState.showingItemInfo;
            gameState.showingItemInfo = false;
            
            modal.classList.remove('active');
            
            // Check if stage was completed
            if (gameState.stageComplete) {
                gameState.stageComplete = false;
                setTimeout(() => showStageCompleteModal(), 300);
            } else if (wasShowingItemInfo && !gameState.stageComplete) {
                // User closed item info modal - start timer for next item
                setTimeout(() => {
                    if (typeof startItemTimer === 'function') {
                        console.log('⏱️ Starting timer for next item after modal close');
                        startItemTimer();
                    }
                }, 300);
            }
        };
        
        console.log('✅ Both functions overridden successfully!');
    }
    
    overrideFunctions();
})();
