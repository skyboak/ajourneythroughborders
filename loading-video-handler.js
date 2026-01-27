// ============================================
// LOADING VIDEO AUTO-ADVANCE
// מעביר אוטומטית למסך בחירת שפה כשסרטון הטעינה נגמר
// ============================================

(function() {
    'use strict';
    
    console.log('🎬 Loading video handler initialized');
    
    // Wait for DOM to be ready
    function setupLoadingVideo() {
        const loadingVideo = document.querySelector('.loading-video');
        const logoSplash = document.querySelector('.logo-splash');
        
        if (!loadingVideo) {
            console.log('⚠️ No loading video found');
            return;
        }
        
        console.log('🎬 Loading video found, setting up handlers');
        
        // Try to unmute on first user interaction
        let hasInteracted = false;
        function tryUnmute() {
            if (!hasInteracted) {
                hasInteracted = true;
                loadingVideo.muted = false;
                console.log('🔊 Video unmuted after user interaction');
            }
        }
        
        // Add click listener to unmute
        document.addEventListener('click', tryUnmute, { once: true });
        document.addEventListener('touchstart', tryUnmute, { once: true });
        document.addEventListener('keydown', tryUnmute, { once: true });
        
        // When video ends, transition to language selection
        loadingVideo.addEventListener('ended', function() {
            console.log('✅ Loading video ended, transitioning...');
            
            if (logoSplash) {
                logoSplash.style.opacity = '0';
                
                setTimeout(() => {
                    logoSplash.classList.remove('active');
                    logoSplash.style.display = 'none';
                    
                    // Show language selection
                    const langSelection = document.querySelector('.language-selection');
                    if (langSelection) {
                        langSelection.classList.add('active');
                    }
                }, 500);
            }
        });
        
        // Error fallback - if video fails, continue after 2 seconds
        loadingVideo.addEventListener('error', function(e) {
            console.log('⚠️ Loading video failed to load, using fallback');
            console.log('Error:', e);
            
            setTimeout(() => {
                if (logoSplash) {
                    logoSplash.style.opacity = '0';
                    setTimeout(() => {
                        logoSplash.classList.remove('active');
                        logoSplash.style.display = 'none';
                        
                        const langSelection = document.querySelector('.language-selection');
                        if (langSelection) {
                            langSelection.classList.add('active');
                        }
                    }, 500);
                }
            }, 2000);
        });
        
        // Also add a safety timeout in case the video is very long
        setTimeout(function() {
            if (logoSplash && logoSplash.classList.contains('active')) {
                console.log('⏱️ Safety timeout reached, forcing transition');
                loadingVideo.pause();
                logoSplash.style.opacity = '0';
                setTimeout(() => {
                    logoSplash.classList.remove('active');
                    logoSplash.style.display = 'none';
                    
                    const langSelection = document.querySelector('.language-selection');
                    if (langSelection) {
                        langSelection.classList.add('active');
                    }
                }, 500);
            }
        }, 10000); // Max 10 seconds
        
        console.log('✅ Loading video handlers set up');
    }
    
    // Setup when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupLoadingVideo);
    } else {
        setupLoadingVideo();
    }
})();
