// ============================================
// HEJAZ RAILWAY GAME - MAIN P5.JS SKETCH
// Interactive "Where's Waldo" educational game
// With fullscreen image and circular UI
// ============================================

// Global variables
let stageImage; // Main stage image (changes per stage)
let imageScale = 1.0; // Start with no zoom (full image visible)
let maxScale = 3.0; // Maximum zoom in

let imageX = 0;
let imageY = 0;
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let imageStartX = 0;
let imageStartY = 0;
let debugMode = false; // Toggle with 'D' key
let gameStarted = false; // Flag to prevent early initialization

// Smooth zoom variables
let targetScale = 1.0;
let targetX = 0;
let targetY = 0;
let isZooming = false;

// Timer and Score variables
let itemTimer = null;
let timeRemaining = 120; // 2 minutes in seconds
const TIMER_DURATION = 120; // 2 minutes
const HINT_COST = 30; // Points deducted when using hint
let currentScore = 0; // Score accumulates throughout the game
let hintUsedForCurrentItem = false; // Track if hint was used for current item

// ============================================
// P5.JS CORE FUNCTIONS
// ============================================

function preload() {
    stageImage = loadImage('saudi.jpg');
}

function setup() {
    const container = document.getElementById('game-container');
    const canvas = createCanvas(container.clientWidth, container.clientHeight);
    canvas.parent('game-container');
    
    pixelDensity(1); // Standard pixel density for compatibility
    canvas.style('display', 'block');
    canvas.style('position', 'absolute');
    canvas.style('top', '0');
    canvas.style('left', '0');
    centerImage();
    initGameFlow();
}

function draw() {
    background(26, 35, 50);
    
    // Draw the illustration with smooth rendering and current zoom level
    push();
    translate(imageX, imageY);
    scale(imageScale);
    imageMode(CORNER);
    smooth(); // Enable smooth rendering
    image(stageImage, 0, 0);
    pop();
    
    // Draw country title overlay on the image
    if (gameStarted && gameState && gameState.currentStage) {
        drawCountryTitle();
    }
    
    // Draw debug areas (press D key)
    if (debugMode) {
        drawDebugAreas();
    }
}

// Draw country title on the canvas
function drawCountryTitle() {
    const stage = GAME_DATA.stages[gameState.currentStage];
    if (!stage || !stage.name) return;
    
    const lang = gameState.currentLanguage || 'he';
    const countryName = stage.name[lang] || stage.name['he'];
    
    // Determine text direction
    const isRTL = (lang === 'he' || lang === 'ar');
    
    // Title styling
    push();
    
    // Position at top center of the canvas
    const titleX = width / 2;
    const titleY = 50;
    
    // Draw semi-transparent background
    textSize(32);
    textFont('Arial');
    const textW = textWidth(countryName);
    const paddingX = 30;
    const paddingY = 12;
    
    // Background rounded rectangle
    fill(0, 0, 0, 150);
    noStroke();
    rectMode(CENTER);
    rect(titleX, titleY, textW + paddingX * 2, 50, 15);
    
    // Draw text
    fill(255, 215, 0); // Gold color
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text(countryName, titleX, titleY);
    
    pop();
}

// Mouse wheel zoom functionality
function mouseWheel(event) {
    if (!gameStarted) return;
    
    // Calculate minimum scale to fill screen (no margins)
    const scaleX = width / stageImage.width;
    const scaleY = height / stageImage.height;
    const minScaleForScreen = Math.max(scaleX, scaleY);
    
    // Get mouse position before zoom
    const mouseXBeforeZoom = (mouseX - imageX) / imageScale;
    const mouseYBeforeZoom = (mouseY - imageY) / imageScale;
    
    // Calculate new scale using multiplier (more natural zoom feel)
    const zoomSpeed = 1.15; // 15% zoom per scroll step
    let newScale;
    if (event.delta > 0) {
        // Zoom out
        newScale = imageScale / zoomSpeed;
    } else {
        // Zoom in
        newScale = imageScale * zoomSpeed;
    }
    
    // Constrain scale
    newScale = constrain(newScale, minScaleForScreen, maxScale);
    
    // Update scale
    imageScale = newScale;
    
    // Adjust position to zoom towards mouse cursor
    imageX = mouseX - mouseXBeforeZoom * imageScale;
    imageY = mouseY - mouseYBeforeZoom * imageScale;
    
    // Constrain position after zoom
    constrainImagePosition();
    
    // Update zoom indicator
    updateZoomIndicator();
    
    // Prevent default scrolling
    return false;
}

// Update zoom indicator display
let zoomIndicatorTimeout;
function updateZoomIndicator() {
    const zoomIndicator = document.getElementById('zoom-indicator');
    const zoomText = document.getElementById('zoom-text');
    
    if (zoomIndicator && zoomText) {
        // Update text
        const zoomPercent = Math.round(imageScale * 100);
        zoomText.textContent = zoomPercent + '%';
        
        // Show indicator
        zoomIndicator.classList.add('visible');
        
        // Clear previous timeout
        if (zoomIndicatorTimeout) {
            clearTimeout(zoomIndicatorTimeout);
        }
        
        // Hide after 1.5 seconds
        zoomIndicatorTimeout = setTimeout(() => {
            zoomIndicator.classList.remove('visible');
        }, 1500);
    }
}

function keyPressed() {
    // Don't capture keyboard when typing in an input field
    const activeElement = document.activeElement;
    if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
        return true; // Let the browser handle the event
    }
    
    if (key === 'd' || key === 'D') {
        debugMode = !debugMode;
        console.log('Debug mode:', debugMode ? 'ON' : 'OFF');
    }
}

function windowResized() {
    const container = document.getElementById('game-container');
    resizeCanvas(container.clientWidth, container.clientHeight);
    centerImage();
}

// ============================================
// IMAGE POSITIONING & DRAGGING
// ============================================

function centerImage() {
    if (stageImage) {
        // Calculate scale to fill entire screen (cover mode - no margins)
        const scaleX = width / stageImage.width;
        const scaleY = height / stageImage.height;
        
        // Use the LARGER scale to ensure image fills the screen completely
        imageScale = Math.max(scaleX, scaleY);
        
        // Center the image
        const scaledWidth = stageImage.width * imageScale;
        const scaledHeight = stageImage.height * imageScale;
        imageX = (width - scaledWidth) / 2;
        imageY = (height - scaledHeight) / 2;
    }
}

function mousePressed() {
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        isDragging = true;
        dragStartX = mouseX;
        dragStartY = mouseY;
        imageStartX = imageX;
        imageStartY = imageY;
        return false;
    }
}

function mouseDragged() {
    if (isDragging) {
        const dx = mouseX - dragStartX;
        const dy = mouseY - dragStartY;
        imageX = imageStartX + dx;
        imageY = imageStartY + dy;
        constrainImagePosition();
    }
    return false;
}

function mouseReleased() {
    if (isDragging) {
        const moveDistance = dist(mouseX, mouseY, dragStartX, dragStartY);
        
        // If moved less than 5 pixels, treat as click
        if (moveDistance < 5) {
            checkItemClick(mouseX, mouseY);
        }
        
        isDragging = false;
    }
}

function constrainImagePosition() {
    if (!stageImage) return;
    
    const scaledWidth = stageImage.width * imageScale;
    const scaledHeight = stageImage.height * imageScale;
    
    const minX = width - scaledWidth;
    const maxX = 0;
    const minY = height - scaledHeight;
    const maxY = 0;
    
    if (scaledWidth > width) {
        imageX = constrain(imageX, minX, maxX);
    } else {
        imageX = (width - scaledWidth) / 2;
    }
    
    if (scaledHeight > height) {
        imageY = constrain(imageY, minY, maxY);
    } else {
        imageY = (height - scaledHeight) / 2;
    }
}

// ============================================
// GAME LOGIC - CLICK DETECTION
// ============================================

function checkItemClick(mx, my) {
    if (!gameStarted) return;
    
    const stage = GAME_DATA.stages[gameState.currentStage];
    if (!stage) return;
    
    // Transform mouse coordinates to image space (accounting for zoom)
    const imgX = (mx - imageX) / (imageScale);
    const imgY = (my - imageY) / (imageScale);
    
    // Scale factor from design resolution to actual image size
    const scaleFactorX = stageImage.width / DESIGN_WIDTH;
    const scaleFactorY = stageImage.height / DESIGN_HEIGHT;
    
    console.log('Click at image coordinates:', Math.round(imgX), Math.round(imgY));
    console.log('Scale factor:', scaleFactorX.toFixed(2), scaleFactorY.toFixed(2));
    
    const currentItem = stage.items[gameState.currentSearchItem];
    if (!currentItem) return;
    
    let clickedItem = null;
    let clickedIndex = -1;
    
    // Check all items
    stage.items.forEach((item, index) => {
        const pos = item.position;
        // Scale position coordinates from design size to actual image size
        const scaledX = pos.x * scaleFactorX;
        const scaledY = pos.y * scaleFactorY;
        const scaledW = pos.w * scaleFactorX;
        const scaledH = pos.h * scaleFactorY;
        
        const inBounds = imgX >= scaledX && imgX <= scaledX + scaledW &&
                        imgY >= scaledY && imgY <= scaledY + scaledH;
        
        if (debugMode) {
            console.log(`${item.name.he}: ${inBounds ? '✓ HIT' : '✗'} (${Math.round(scaledX)}, ${Math.round(scaledY)}, ${Math.round(scaledW)}x${Math.round(scaledH)})`);
        }
        
        if (inBounds) {
            clickedItem = item;
            clickedIndex = index;
        }
    });
    
    if (clickedItem) {
        if (clickedIndex === gameState.currentSearchItem) {
            console.log('✓ CORRECT!');
            handleCorrectItemFound(clickedItem);
        } else {
            console.log('✗ WRONG ITEM');
            handleWrongItemClick();
        }
    } else {
        console.log('✗ No item clicked');
    }
}

function handleCorrectItemFound(item) {
    // Stop the timer
    stopItemTimer();
    
    // Award points based on time remaining (120 - time_taken = timeRemaining)
    const pointsEarned = timeRemaining;
    if (pointsEarned > 0) {
        currentScore += pointsEarned;
        showPointsEarned(pointsEarned);
        updateScoreDisplay();
    }
    
    // Reset hint flag for next item
    hintUsedForCurrentItem = false;
    
    gameState.foundItems.push(item.id);
    
    updateSearchItemCircle();
    showItemInfoModal(item);
    
    gameState.currentSearchItem++;
    
    // Check if this was the last item
    if (gameState.currentSearchItem >= GAME_DATA.stages[gameState.currentStage].items.length) {
        // Stage complete! Preload next stage image NOW
        const stageOrder = ['saudi', 'jordan', 'israel', 'syria'];
        const currentIndex = stageOrder.indexOf(gameState.currentStage);
        if (currentIndex !== -1 && currentIndex < stageOrder.length - 1) {
            const nextStage = stageOrder[currentIndex + 1];
            const nextStageData = GAME_DATA.stages[nextStage];
            if (nextStageData) {
                const imageFile = nextStageData.image || `${nextStage}.jpg`;
                console.log('🔄 Preloading next stage image early:', imageFile);
                loadImage(imageFile, 
                    (img) => {
                        window.nextStageImage = img;
                        console.log('✓ Next stage image preloaded in advance!');
                    },
                    (error) => {
                        console.error('✗ Failed to preload next stage:', error);
                    }
                );
            }
        }
        
        // Don't show stage complete yet - wait for user to close the item modal
        gameState.stageComplete = true;
    } else {
        // Not last item - update search circle after modal closes
        setTimeout(() => updateSearchItemCircle(), 500);
    }
}

function handleWrongItemClick() {
    const lang = gameState.currentLanguage;
    const wrongText = GAME_DATA.translations[lang].wrongItem;
    showBriefMessage(wrongText, 'error');
    
    const canvas = document.querySelector('#game-container canvas');
    if (canvas) {
        canvas.classList.add('shake');
        setTimeout(() => canvas.classList.remove('shake'), 500);
    }
}

function showBriefMessage(text, type) {
    const message = document.createElement('div');
    message.textContent = text;
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: ${type === 'error' ? '#E76F51' : '#6AB187'};
        color: white;
        padding: 20px 40px;
        border-radius: 15px;
        font-size: 1.3rem;
        font-weight: 600;
        z-index: 4000;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        animation: fadeIn 0.3s ease;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.opacity = '0';
        message.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            if (message.parentNode) {
                document.body.removeChild(message);
            }
        }, 300);
    }, 1500);
}

// ============================================
// DEBUG MODE
// ============================================

function drawDebugAreas() {
    const stage = GAME_DATA.stages[gameState.currentStage];
    if (!stage) return;
    
    // Scale factor from design resolution to actual image size
    const scaleFactorX = stageImage.width / DESIGN_WIDTH;
    const scaleFactorY = stageImage.height / DESIGN_HEIGHT;
    
    push();
    translate(imageX, imageY);
    scale(imageScale);
    
    stage.items.forEach((item, index) => {
        const pos = item.position;
        // Scale position coordinates from design size to actual image size
        const scaledX = pos.x * scaleFactorX;
        const scaledY = pos.y * scaleFactorY;
        const scaledW = pos.w * scaleFactorX;
        const scaledH = pos.h * scaleFactorY;
        
        if (index === gameState.currentSearchItem) {
            stroke(0, 255, 0);
            strokeWeight(4 / (imageScale));
            fill(0, 255, 0, 30);
        } else if (gameState.foundItems.includes(item.id)) {
            stroke(0, 150, 255);
            strokeWeight(3 / (imageScale));
            fill(0, 150, 255, 20);
        } else {
            stroke(255, 0, 0);
            strokeWeight(2 / (imageScale));
            fill(255, 0, 0, 20);
        }
        
        rect(scaledX, scaledY, scaledW, scaledH);
        
        noStroke();
        fill(255);
        textSize(12 / (imageScale));
        textAlign(CENTER);
        text(item.name.he, scaledX + scaledW/2, scaledY - 5/(imageScale));
    });
    
    pop();
    
    // Debug info on screen
    push();
    fill(255, 255, 0);
    noStroke();
    textSize(14);
    textAlign(LEFT);
    text('DEBUG MODE (Press D to toggle)', 10, 20);
    text(`Mouse: ${mouseX}, ${mouseY}`, 10, 40);
    text(`Image: ${Math.round(imageX)}, ${Math.round(imageY)}`, 10, 60);
    text(`Zoom: ${(imageScale * 100).toFixed(0)}% (Scroll to zoom)`, 10, 80);
    if (stage.items[gameState.currentSearchItem]) {
        text(`Looking for: ${stage.items[gameState.currentSearchItem].name.he}`, 10, 100);
    }
    pop();
}

// ============================================
// UI UPDATES - CIRCULAR BUTTONS
// ============================================

function updateSearchItemCircle() {
    if (!gameStarted) {
        console.log('Game not started yet, skipping updateSearchItemCircle');
        return;
    }
    
    const stage = GAME_DATA.stages[gameState.currentStage];
    const lang = gameState.currentLanguage;
    
    // Show the container
    const container = document.getElementById('search-item-container');
    if (container) container.style.display = 'block';
    
    // Update score display
    updateScoreDisplay();
    
    // Reset hint button for new item
    const hintBtn = document.getElementById('hint-button');
    if (hintBtn) {
        hintBtn.disabled = false;
        hintUsedForCurrentItem = false;
    }
    
    if (!stage || gameState.currentSearchItem >= stage.items.length) {
        // Hide circle if no more items
        document.getElementById('search-item-circle').style.display = 'none';
        stopItemTimer();
        return;
    }
    
    const currentItem = stage.items[gameState.currentSearchItem];
    const searchItemImg = document.getElementById('search-item-img');
    
    // Display the item image
    searchItemImg.src = currentItem.image;
    searchItemImg.alt = currentItem.name[lang];
    
    // Show the circle
    document.getElementById('search-item-circle').style.display = 'flex';
    
    // Start the timer for this item
    startItemTimer();
}

// ============================================
// TIMER FUNCTIONS
// ============================================

function startItemTimer() {
    // Clear existing timer
    stopItemTimer();
    
    // Reset timer
    timeRemaining = TIMER_DURATION;
    updateTimerDisplay();
    
    // Start countdown
    itemTimer = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 0) {
            handleTimerExpired();
        }
    }, 1000);
}

function stopItemTimer() {
    if (itemTimer) {
        clearInterval(itemTimer);
        itemTimer = null;
    }
}

function updateTimerDisplay() {
    const timerText = document.getElementById('timer-text');
    const timerProgress = document.querySelector('.timer-progress');
    
    if (!timerText || !timerProgress) return;
    
    // Format time as M:SS
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerText.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Update progress ring (radius=60, circumference = 2 * PI * 60 = 377)
    const circumference = 377;
    const progress = timeRemaining / TIMER_DURATION;
    const dashoffset = circumference * (1 - progress);
    timerProgress.style.strokeDashoffset = dashoffset;
    
    // Update colors based on time remaining
    timerText.classList.remove('warning', 'danger');
    timerProgress.classList.remove('warning', 'danger');
    
    if (timeRemaining <= 30) {
        timerText.classList.add('danger');
        timerProgress.classList.add('danger');
    } else if (timeRemaining <= 60) {
        timerText.classList.add('warning');
        timerProgress.classList.add('warning');
    }
}

function handleTimerExpired() {
    stopItemTimer();
    
    // No points deducted - just no points earned
    const lang = gameState.currentLanguage;
    const message = {
        he: 'נגמר הזמן! ממשיכים לפריט הבא',
        en: "Time's up! Moving to next item",
        ar: 'انتهى الوقت! ننتقل للعنصر التالي'
    };
    
    // Reset hint flag
    hintUsedForCurrentItem = false;
    
    // Move to next item
    gameState.currentSearchItem++;
    
    // Check if stage complete
    const stage = GAME_DATA.stages[gameState.currentStage];
    if (gameState.currentSearchItem >= stage.items.length) {
        // Stage complete
        gameState.stageComplete = true;
        showStageCompleteModal();
    } else {
        // Show message and continue to next item
        showBriefMessage(message[lang], 'warning');
        updateSearchItemCircle();
    }
}

function handleGameOver() {
    stopItemTimer();
    
    const lang = gameState.currentLanguage;
    const messages = {
        he: {
            title: 'נגמרו הנקודות!',
            text: 'מתחילים את השלב מההתחלה',
            button: 'נסה שוב'
        },
        en: {
            title: 'Out of Points!',
            text: 'Starting the stage over',
            button: 'Try Again'
        },
        ar: {
            title: 'نفدت النقاط!',
            text: 'بدء المرحلة من جديد',
            button: 'حاول مرة أخرى'
        }
    };
    
    const t = messages[lang];
    
    // Show game over modal
    const modal = document.querySelector('.modal-overlay');
    const modalBody = document.querySelector('.modal-body');
    
    modalBody.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 4rem; margin-bottom: 20px;">😢</div>
            <h3 style="color: var(--error); margin-bottom: 15px;">${t.title}</h3>
            <p style="margin-bottom: 25px; color: #666;">${t.text}</p>
            <button class="btn btn-primary" onclick="restartCurrentStage()">
                ${t.button}
            </button>
        </div>
    `;
    
    modal.classList.add('active');
}

window.restartCurrentStage = function() {
    // Reset progress for current stage (keep accumulated score from previous stages)
    gameState.foundItems = [];
    gameState.currentSearchItem = 0;
    hintUsedForCurrentItem = false;
    
    // Close modal
    closeModal();
    
    // Update displays
    updateScoreDisplay();
    updateSearchItemCircle();
    
    // Show ready message
    const lang = gameState.currentLanguage;
    const message = {
        he: 'בהצלחה!',
        en: 'Good luck!',
        ar: 'حظا سعيدا!'
    };
    showBriefMessage(message[lang], 'success');
};

function updateScoreDisplay() {
    const scoreValue = document.getElementById('score-value');
    if (scoreValue) {
        scoreValue.textContent = currentScore;
    }
    
    // Add shake animation when low
    const scoreDisplay = document.getElementById('score-display');
    if (scoreDisplay && currentScore <= 30) {
        scoreDisplay.classList.add('low');
        setTimeout(() => scoreDisplay.classList.remove('low'), 500);
    }
}

// Show points earned animation
function showPointsEarned(points) {
    const existing = document.querySelector('.points-earned');
    if (existing) existing.remove();
    
    const lang = gameState.currentLanguage;
    const text = {
        he: `+${points} נקודות!`,
        en: `+${points} points!`,
        ar: `+${points} نقطة!`
    };
    
    const div = document.createElement('div');
    div.className = 'points-earned';
    div.textContent = text[lang];
    document.body.appendChild(div);
    
    // Add glow effect to score display
    const scoreDisplay = document.getElementById('score-display');
    if (scoreDisplay) {
        scoreDisplay.classList.add('gained-points');
        setTimeout(() => scoreDisplay.classList.remove('gained-points'), 500);
    }
    
    setTimeout(() => div.remove(), 1500);
}

// ============================================
// HINT SYSTEM
// ============================================

function useHint() {
    const lang = gameState.currentLanguage;
    
    // Check if hint already used for this item
    if (hintUsedForCurrentItem) {
        const msg = {
            he: 'כבר השתמשת ברמז לפריט זה',
            en: 'You already used a hint for this item',
            ar: 'لقد استخدمت تلميحًا لهذا العنصر بالفعل'
        };
        showBriefMessage(msg[lang], 'warning');
        return;
    }
    
    // Deduct points
    currentScore -= HINT_COST;
    if (currentScore < 0) currentScore = 0;
    updateScoreDisplay();
    
    // Mark hint as used
    hintUsedForCurrentItem = true;
    
    // Disable hint button
    const hintBtn = document.getElementById('hint-button');
    if (hintBtn) hintBtn.disabled = true;
    
    // Show the hint - zoom to the item area
    showHintVisual();
    
    // Show message
    const msg = {
        he: `רמז! הפחתת ${HINT_COST} נקודות`,
        en: `Hint! -${HINT_COST} points`,
        ar: `تلميح! -${HINT_COST} نقطة`
    };
    showBriefMessage(msg[lang], 'info');
}

function showHintVisual() {
    const stage = GAME_DATA.stages[gameState.currentStage];
    if (!stage) return;
    
    const currentItem = stage.items[gameState.currentSearchItem];
    if (!currentItem) return;
    
    const pos = currentItem.position;
    
    // Scale position from design resolution to actual image size
    const scaleFactorX = stageImage.width / DESIGN_WIDTH;
    const scaleFactorY = stageImage.height / DESIGN_HEIGHT;
    
    const itemCenterX = (pos.x + pos.w / 2) * scaleFactorX;
    const itemCenterY = (pos.y + pos.h / 2) * scaleFactorY;
    
    // Calculate zoom level to show a reasonable area around the item
    const targetScale = 1.5; // Zoom in moderately
    
    // Calculate position to center the item
    const targetX = width / 2 - itemCenterX * targetScale;
    const targetY = height / 2 - itemCenterY * targetScale;
    
    // Animate the zoom
    const startScale = imageScale;
    const startX = imageX;
    const startY = imageY;
    const duration = 800; // ms
    const startTime = Date.now();
    
    function animateHint() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
        
        imageScale = startScale + (targetScale - startScale) * eased;
        imageX = startX + (targetX - startX) * eased;
        imageY = startY + (targetY - startY) * eased;
        
        constrainImagePosition();
        
        if (progress < 1) {
            requestAnimationFrame(animateHint);
        }
    }
    
    animateHint();
}

function setupCircularButtons() {
    // Sound toggle button
    const soundToggle = document.getElementById('sound-toggle');
    if (soundToggle) {
        soundToggle.addEventListener('click', () => {
            gameState.soundEnabled = !gameState.soundEnabled;
            soundToggle.textContent = gameState.soundEnabled ? '♪' : '🔇';
            
            // Toggle background music
            if (typeof toggleBackgroundMusic === 'function') {
                toggleBackgroundMusic();
            }
        });
    }
    
    // Profile button
    const profileButton = document.getElementById('profile-button');
    if (profileButton) {
        profileButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Profile button clicked');
            if (typeof showUserProfile === 'function') {
                showUserProfile();
            } else {
                console.error('showUserProfile function not found');
            }
        });
    }
    
    // Hint button
    const hintButton = document.getElementById('hint-button');
    if (hintButton) {
        hintButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            useHint();
        });
    }
    
    // Exit button
    const exitButton = document.getElementById('exit-button');
    if (exitButton) {
        exitButton.addEventListener('click', () => {
            if (confirm('האם אתה בטוח שברצונך לצאת מהמשחק?')) {
                // Reset game or go to menu
                location.reload();
            }
        });
    }
}

// ============================================
// GAME FLOW & INITIALIZATION
// ============================================

function initGameFlow() {
    // Show logo splash
    showLogoSplash();
}

function showLogoSplash() {
    const logoSplash = document.querySelector('.logo-splash');
    logoSplash.classList.add('active');
    
    setTimeout(() => {
        logoSplash.style.opacity = '0';
        setTimeout(() => {
            logoSplash.classList.remove('active');
            // Remove inline styles completely to allow CSS to hide it
            logoSplash.style.display = 'none';
            logoSplash.style.opacity = '0';
            showLanguageSelection();
        }, 500);
    }, 2000);
}

function showLanguageSelection() {
    const langSelection = document.querySelector('.language-selection');
    langSelection.classList.add('active');
}

window.selectLanguage = function(lang) {
    console.log('Language selected:', lang);
    gameState.currentLanguage = lang;
    
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' || lang === 'he' ? 'rtl' : 'ltr');
    
    const langSelection = document.querySelector('.language-selection');
    if (langSelection) {
        langSelection.style.display = 'none';
    }
    
    // Initialize Firebase and show auth screen
    if (typeof initializeFirebase === 'function') {
        initializeFirebase();
    }
    
    // Show auth screen
    showAuthScreen();
};

// ============================================
// AUTHENTICATION UI
// ============================================

function showAuthScreen() {
    const authScreen = document.getElementById('auth-screen');
    if (authScreen) {
        updateAuthScreenText();
        authScreen.classList.add('active');
        
        // Add event listeners to stop p5.js from capturing input events
        const inputs = authScreen.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('mousedown', (e) => e.stopPropagation());
            input.addEventListener('touchstart', (e) => e.stopPropagation());
            input.addEventListener('click', (e) => e.stopPropagation());
        });
        
        // Also stop propagation on the container
        authScreen.addEventListener('mousedown', (e) => e.stopPropagation());
        authScreen.addEventListener('touchstart', (e) => e.stopPropagation());
    }
}

function hideAuthScreen() {
    const authScreen = document.getElementById('auth-screen');
    if (authScreen) {
        authScreen.classList.remove('active');
    }
}

function updateAuthScreenText() {
    const lang = gameState.currentLanguage;
    const authTitle = document.getElementById('auth-title');
    const tabs = document.querySelectorAll('.auth-tab');
    
    const texts = {
        he: { title: 'התחברות / הרשמה', login: 'התחברות', register: 'הרשמה', guest: 'המשך כאורח' },
        en: { title: 'Login / Register', login: 'Login', register: 'Register', guest: 'Continue as Guest' },
        ar: { title: 'تسجيل الدخول / التسجيل', login: 'دخول', register: 'تسجيل', guest: 'المتابعة كضيف' }
    };
    
    const t = texts[lang] || texts.he;
    
    if (authTitle) authTitle.textContent = t.title;
    if (tabs[0]) tabs[0].textContent = t.login;
    if (tabs[1]) tabs[1].textContent = t.register;
    
    const skipBtn = document.querySelector('.auth-skip .btn');
    if (skipBtn) skipBtn.textContent = t.guest;
}

window.showLoginForm = function() {
    document.getElementById('login-form').style.display = 'flex';
    document.getElementById('register-form').style.display = 'none';
    document.querySelectorAll('.auth-tab').forEach((tab, i) => {
        tab.classList.toggle('active', i === 0);
    });
};

window.showRegisterForm = function() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'flex';
    document.querySelectorAll('.auth-tab').forEach((tab, i) => {
        tab.classList.toggle('active', i === 1);
    });
};

window.handleLogin = async function() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const errorDiv = document.getElementById('login-error');
    
    if (!email || !password) {
        errorDiv.textContent = 'אנא מלא את כל השדות / Please fill all fields';
        return;
    }
    
    errorDiv.textContent = 'מתחבר... / Logging in...';
    
    const result = await firebaseLoginUser(email, password);
    
    if (result.success) {
        errorDiv.textContent = '';
        hideAuthScreen();
        
        // Load progress from Firebase
        const progress = await loadProgressFromFirebase();
        if (progress) {
            gameState.currentStage = progress.currentStage || 'saudi';
            gameState.foundItems = progress.foundItems || [];
            gameState.currentSearchItem = progress.currentSearchItem || 0;
            gameState.completedStages = progress.completedStages || [];
        }
        
        showSplashScreens();
    } else {
        errorDiv.textContent = result.error;
    }
};

window.handleRegister = async function() {
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-confirm').value;
    const errorDiv = document.getElementById('register-error');
    
    if (!name || !email || !password || !confirm) {
        errorDiv.textContent = 'אנא מלא את כל השדות / Please fill all fields';
        return;
    }
    
    if (password !== confirm) {
        errorDiv.textContent = 'הסיסמאות לא תואמות / Passwords do not match';
        return;
    }
    
    if (password.length < 6) {
        errorDiv.textContent = 'סיסמה חייבת להיות לפחות 6 תווים / Password must be at least 6 characters';
        return;
    }
    
    errorDiv.textContent = 'נרשם... / Registering...';
    
    const result = await firebaseRegisterUser(email, password, name);
    
    if (result.success) {
        errorDiv.textContent = '';
        hideAuthScreen();
        showSplashScreens();
    } else {
        errorDiv.textContent = result.error;
    }
};

window.skipAuth = function() {
    hideAuthScreen();
    
    // Set a guest user
    gameState.currentUser = {
        id: 'guest_' + Date.now(),
        name: gameState.currentLanguage === 'he' ? 'אורח' : 
              gameState.currentLanguage === 'ar' ? 'ضيف' : 'Guest',
        isGuest: true
    };
    
    showSplashScreens();
};

function showSplashScreens() {
    const splashOverlay = document.querySelector('.splash-overlay');
    const splashContent = document.querySelector('.splash-content');
    const lang = gameState.currentLanguage;
    const translations = GAME_DATA.translations[lang];
    
    const splashes = [
        {
            title: translations.splash.welcome.title,
            text: translations.splash.welcome.text,
            button: translations.splash.welcome.button
        },
        {
            title: translations.splash.howToPlay.title,
            text: translations.splash.howToPlay.text,
            button: translations.splash.howToPlay.button
        },
        {
            title: translations.splash.about.title,
            text: translations.splash.about.text,
            button: translations.splash.about.button
        }
    ];
    
    function showSplash(index) {
        if (index >= splashes.length) {
            splashOverlay.classList.remove('active');
            startGame();
            return;
        }
        
        const splash = splashes[index];
        gameState.splashIndex = index;
        
        const backButtonText = lang === 'he' ? 'חזור' : (lang === 'ar' ? 'رجوع' : 'Back');
        
        splashContent.innerHTML = `
            <div class="splash-screen">
                <h2>${splash.title}</h2>
                <p>${splash.text}</p>
                <div class="splash-buttons">
                    ${index > 0 ? `<button class="btn btn-secondary" onclick="prevSplash()">${backButtonText}</button>` : ''}
                    <button class="btn btn-primary" onclick="nextSplash()">
                        ${splash.button}
                    </button>
                </div>
                <div class="splash-dots">
                    ${splashes.map((_, i) => 
                        `<div class="dot ${i === index ? 'active' : ''}" onclick="goToSplash(${i})"></div>`
                    ).join('')}
                </div>
            </div>
        `;
    }
    
    window.nextSplash = function() {
        showSplash(gameState.splashIndex + 1);
    };
    
    window.prevSplash = function() {
        if (gameState.splashIndex > 0) {
            showSplash(gameState.splashIndex - 1);
        }
    };
    
    window.goToSplash = function(index) {
        showSplash(index);
    };
    
    splashOverlay.classList.add('active');
    showSplash(0);
}

async function startGame() {
    // Skip user registration for now - just start the game
    console.log('Starting game directly...');
    gameStarted = true;
    
    // Initialize game state if not already done
    if (!gameState.currentLanguage) {
        gameState.currentLanguage = 'he';
    }
    if (!gameState.currentStage) {
        gameState.currentStage = 'saudi';
    }
    if (typeof gameState.currentSearchItem === 'undefined') {
        gameState.currentSearchItem = 0;
        gameState.foundItems = [];
    }
    
    // Show game elements
    setupCircularButtons();
    updateSearchItemCircle();
    
    console.log('✓ Game started! Press D for debug mode');
    console.log('Current stage:', gameState.currentStage);
    console.log('Looking for item:', gameState.currentSearchItem);
    
    // Update postcard badge after a short delay to ensure everything is ready
    setTimeout(() => {
        if (typeof window.updatePostcardBadge === 'function') {
            console.log('🔔 Calling updatePostcardBadge from startGame');
            window.updatePostcardBadge();
        }
    }, 1500);
}

// Continue starting the game after user registration
function continueGameStart() {
    gameStarted = true;
    
    // Show the circular buttons
    document.getElementById('game-container').style.opacity = '1';
    
    setupCircularButtons();
    
    setTimeout(() => {
        updateSearchItemCircle();
    }, 100);
    
    setupEventListeners();
    
    const gameContainer = document.getElementById('game-container');
    gameContainer.style.animation = 'fadeIn 0.8s ease';
    
    console.log('✓ Game started! Press D for debug mode');
    
    // Update postcard badge after a short delay to ensure Firebase is ready
    setTimeout(() => {
        if (typeof window.updatePostcardBadge === 'function') {
            console.log('🔔 Calling updatePostcardBadge from startGame');
            window.updatePostcardBadge();
        }
    }, 1000);
}

// ============================================
// MODALS
// ============================================

function showItemInfoModal(item) {
    const lang = gameState.currentLanguage;
    const modal = document.querySelector('.modal-overlay');
    const modalBody = document.querySelector('.modal-body');
    const trans = GAME_DATA.translations[lang];
    
    // Set flag to indicate we're showing item info modal
    gameState.showingItemInfo = true;
    
    modalBody.innerHTML = `
        <h3>${trans.congratulations}</h3>
        <div style="width: 100%; max-width: 250px; height: 200px; margin: 15px auto; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 12px; background: var(--cream);">
            <img src="${item.image}" alt="${item.name[lang]}" style="width: 100%; height: 100%; object-fit: contain;">
        </div>
        <h4 style="text-align: center; color: var(--orange); font-size: 1.5rem; margin-bottom: 15px;">
            ${item.name[lang]}
        </h4>
        <p>${item.description[lang]}</p>
        <div class="modal-buttons">
            <button class="btn btn-primary" onclick="closeModal()">
                ${trans.close}
            </button>
        </div>
    `;
    
    modal.classList.add('active');
}

function showStageCompleteModal() {
    const lang = gameState.currentLanguage;
    const modal = document.querySelector('.modal-overlay');
    const modalBody = document.querySelector('.modal-body');
    const trans = GAME_DATA.translations[lang];
    
    // Check if this is the last stage
    const stageOrder = ['saudi', 'jordan', 'israel', 'syria'];
    const currentIndex = stageOrder.indexOf(gameState.currentStage);
    const isLastStage = currentIndex >= stageOrder.length - 1;
    
    const stageCompleteText = lang === 'he' ? 'סיימת את השלב! האם תרצה לשלוח גלויה מעוצבת ממדינה זו?' :
                               lang === 'ar' ? 'لقد أكملت المرحلة! هل تريد إرسال بطاقة بريدية من هذا البلد؟' :
                               'You completed the stage! Would you like to send a postcard from this country?';
    
    const gameCompleteText = {
        he: '🎉 סיימת את כל השלבים! האם תרצה לשלוח גלויה לפני שנסיים?',
        en: '🎉 You completed all stages! Would you like to send a postcard before we finish?',
        ar: '🎉 لقد أكملت جميع المراحل! هل تريد إرسال بطاقة بريدية قبل أن ننتهي؟'
    };
    
    const finishGameText = {
        he: 'סיים משחק',
        en: 'Finish Game',
        ar: 'إنهاء اللعبة'
    };
    
    const displayText = isLastStage ? gameCompleteText[lang] : stageCompleteText;
    const nextButtonText = isLastStage ? finishGameText[lang] : trans.nextStage;
    
    modalBody.innerHTML = `
        <h3>${isLastStage ? (lang === 'he' ? 'כל הכבוד!' : lang === 'ar' ? 'أحسنت!' : 'Congratulations!') : trans.stageComplete}</h3>
        <p>${displayText}</p>
        <div class="modal-buttons">
            <button class="btn btn-secondary" onclick="continueToNextStage()">
                ${nextButtonText}
            </button>
            <button class="btn btn-primary" onclick="openPostcardForm()">
                ${trans.sendPostcard}
            </button>
        </div>
    `;
    
    modal.classList.add('active');
}

window.openPostcardForm = function() {
    // Set flag that we came from stage complete
    gameState.fromStageComplete = true;
    closeModal();
    setTimeout(() => showPostcardModal(), 300);
};

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
    
    modal.classList.remove('active');
    
    // Check if stage was completed
    if (gameState.stageComplete) {
        gameState.stageComplete = false;
        setTimeout(() => showStageCompleteModal(), 300);
    }
};

window.continueToNextStage = function() {
    // Determine next stage first
    const stageOrder = ['saudi', 'jordan', 'israel', 'syria'];
    const currentIndex = stageOrder.indexOf(gameState.currentStage);
    
    console.log('continueToNextStage called, currentStage:', gameState.currentStage, 'currentIndex:', currentIndex);
    
    if (currentIndex === -1 || currentIndex >= stageOrder.length - 1) {
        // Last stage completed - show final results and leaderboard
        console.log('Last stage! Showing game complete modal...');
        const modal = document.querySelector('.modal-overlay');
        modal.classList.remove('active');
        setTimeout(() => {
            showGameCompleteModal();
        }, 300);
        return;
    }
    
    closeModal();
    
    // Don't reset score - it accumulates throughout the game
    
    const nextStage = stageOrder[currentIndex + 1];
    
    // Show stage transition video
    setTimeout(() => {
        showStageVideo(nextStage);
    }, 300);
};

// ============================================
// GAME COMPLETE & LEADERBOARD
// ============================================

function showGameCompleteModal() {
    const lang = gameState.currentLanguage;
    const modal = document.querySelector('.modal-overlay');
    const modalBody = document.querySelector('.modal-body');
    
    const finalScore = currentScore;
    
    const text = {
        he: {
            title: '🎉 סיימת את המשחק!',
            scoreLabel: 'הניקוד הסופי שלך:',
            saving: 'שומר לטבלת השיאים...',
            viewLeaderboard: 'צפה בטבלת השיאים',
            playAgain: 'שחק שוב'
        },
        en: {
            title: '🎉 Game Complete!',
            scoreLabel: 'Your final score:',
            saving: 'Saving to leaderboard...',
            viewLeaderboard: 'View Leaderboard',
            playAgain: 'Play Again'
        },
        ar: {
            title: '🎉 أكملت اللعبة!',
            scoreLabel: 'نتيجتك النهائية:',
            saving: 'حفظ في لوحة المتصدرين...',
            viewLeaderboard: 'عرض لوحة المتصدرين',
            playAgain: 'العب مرة أخرى'
        }
    };
    
    const t = text[lang];
    
    modalBody.innerHTML = `
        <div style="text-align: center;">
            <h2 style="color: var(--orange); margin-bottom: 20px;">${t.title}</h2>
            <div style="font-size: 3rem; color: var(--teal); margin: 30px 0;">
                ⭐ ${finalScore}
            </div>
            <p style="margin-bottom: 20px;">${t.scoreLabel}</p>
            <p id="saving-status" style="color: #666; font-size: 0.9rem;">${t.saving}</p>
        </div>
        <div style="display: flex; gap: 10px; justify-content: center; margin-top: 30px; flex-wrap: wrap;">
            <button class="btn btn-primary" onclick="showLeaderboard()">${t.viewLeaderboard}</button>
            <button class="btn btn-secondary" onclick="restartGame()">${t.playAgain}</button>
        </div>
    `;
    
    modal.classList.add('active');
    
    // Save score to leaderboard
    saveToLeaderboard(finalScore);
}

async function saveToLeaderboard(score) {
    const statusEl = document.getElementById('saving-status');
    const lang = gameState.currentLanguage;
    
    try {
        // Try Firebase first
        if (typeof db !== 'undefined' && gameState.currentUser) {
            await db.collection('leaderboard').add({
                name: gameState.currentUser.name,
                score: score,
                date: new Date(),
                stages: 4 // All stages completed
            });
            
            const successText = {
                he: '✓ נשמר בהצלחה!',
                en: '✓ Saved successfully!',
                ar: '✓ تم الحفظ بنجاح!'
            };
            if (statusEl) statusEl.textContent = successText[lang];
        } else {
            // Save to localStorage
            const leaderboard = JSON.parse(localStorage.getItem('hejaz_leaderboard') || '[]');
            leaderboard.push({
                name: gameState.currentUser?.name || 'Player',
                score: score,
                date: Date.now()
            });
            leaderboard.sort((a, b) => b.score - a.score);
            localStorage.setItem('hejaz_leaderboard', JSON.stringify(leaderboard.slice(0, 20)));
            
            const successText = {
                he: '✓ נשמר!',
                en: '✓ Saved!',
                ar: '✓ تم الحفظ!'
            };
            if (statusEl) statusEl.textContent = successText[lang];
        }
    } catch (error) {
        console.error('Failed to save to leaderboard:', error);
        if (statusEl) statusEl.textContent = '⚠️ Error saving';
    }
}

async function showLeaderboard() {
    const lang = gameState.currentLanguage;
    const modal = document.querySelector('.modal-overlay');
    const modalBody = document.querySelector('.modal-body');
    
    const text = {
        he: {
            title: '🏆 טבלת השיאים',
            rank: 'דירוג',
            name: 'שם',
            score: 'ניקוד',
            noScores: 'אין שיאים עדיין',
            back: 'חזרה',
            playAgain: 'שחק שוב'
        },
        en: {
            title: '🏆 Leaderboard',
            rank: 'Rank',
            name: 'Name',
            score: 'Score',
            noScores: 'No scores yet',
            back: 'Back',
            playAgain: 'Play Again'
        },
        ar: {
            title: '🏆 لوحة المتصدرين',
            rank: 'الترتيب',
            name: 'الاسم',
            score: 'النتيجة',
            noScores: 'لا توجد نتائج بعد',
            back: 'رجوع',
            playAgain: 'العب مرة أخرى'
        }
    };
    
    const t = text[lang];
    let leaderboard = [];
    
    try {
        // Try Firebase first
        if (typeof db !== 'undefined') {
            const snapshot = await db.collection('leaderboard')
                .orderBy('score', 'desc')
                .limit(10)
                .get();
            
            leaderboard = snapshot.docs.map(doc => ({
                name: doc.data().name,
                score: doc.data().score,
                date: doc.data().date?.toDate?.() || new Date()
            }));
        }
    } catch (error) {
        console.log('Firebase leaderboard not available, using localStorage');
    }
    
    // Fallback to localStorage
    if (leaderboard.length === 0) {
        leaderboard = JSON.parse(localStorage.getItem('hejaz_leaderboard') || '[]');
    }
    
    let tableRows = '';
    if (leaderboard.length === 0) {
        tableRows = `<tr><td colspan="3" style="text-align: center; padding: 20px;">${t.noScores}</td></tr>`;
    } else {
        leaderboard.slice(0, 10).forEach((entry, index) => {
            const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : (index + 1);
            tableRows += `
                <tr>
                    <td style="text-align: center; font-size: 1.2rem;">${medal}</td>
                    <td>${entry.name}</td>
                    <td style="text-align: center; font-weight: bold; color: var(--orange);">${entry.score}</td>
                </tr>
            `;
        });
    }
    
    modalBody.innerHTML = `
        <h2 style="text-align: center; color: var(--orange); margin-bottom: 20px;">${t.title}</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
                <tr style="background: var(--navy); color: white;">
                    <th style="padding: 10px; border-radius: 8px 0 0 0;">${t.rank}</th>
                    <th style="padding: 10px;">${t.name}</th>
                    <th style="padding: 10px; border-radius: 0 8px 0 0;">${t.score}</th>
                </tr>
            </thead>
            <tbody style="background: var(--cream);">
                ${tableRows}
            </tbody>
        </table>
        <div style="display: flex; gap: 10px; justify-content: center; margin-top: 20px;">
            <button class="btn btn-secondary" onclick="restartGame()">${t.playAgain}</button>
        </div>
    `;
}

window.showLeaderboard = showLeaderboard;

function restartGame() {
    // Reset everything
    currentScore = 0;
    gameState.currentStage = 'saudi';
    gameState.currentSearchItem = 0;
    gameState.foundItems = [];
    gameState.completedStages = [];
    gameState.stageComplete = false;
    hintUsedForCurrentItem = false;
    
    closeModal();
    
    // Reload the first stage
    stageImage = loadImage('saudi.jpg', () => {
        centerImage();
        updateSearchItemCircle();
        updateScoreDisplay();
    });
}

window.restartGame = restartGame;

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
    const modalClose = document.querySelector('.modal-close');
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    const modalOverlay = document.querySelector('.modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }
}

// Export continueGameStart to be accessible from postcard-system.js
window.continueGameStart = continueGameStart;

// ============================================
// VIDEO INTRO
// ============================================

function showVideoIntro() {
    const videoIntro = document.getElementById('video-intro');
    const video = document.getElementById('intro-video');
    
    if (!videoIntro || !video) {
        console.error('Video elements not found');
        if (typeof window.continueGameStart === 'function') {
            window.continueGameStart();
        }
        return;
    }
    
    // Reset video to start
    video.currentTime = 0;
    
    // Show video screen first
    videoIntro.style.display = 'flex';
    setTimeout(() => {
        videoIntro.classList.add('active');
        
        // Only play after screen is visible
        setTimeout(() => {
            video.play().catch(error => {
                console.error('Video play failed:', error);
                // If play fails, just skip
                skipVideo();
            });
        }, 100);
    }, 50);
    
    // When video ends, start game
    video.addEventListener('ended', function() {
        skipVideo();
    }, { once: true });
}

window.skipVideo = function() {
    const videoIntro = document.getElementById('video-intro');
    const video = document.getElementById('intro-video');
    
    // Fade out
    videoIntro.classList.remove('active');
    
    // Pause video
    if (video) {
        video.pause();
    }
    
    // Hide and start game after fade
    setTimeout(() => {
        videoIntro.style.display = 'none';
        if (typeof window.continueGameStart === 'function') {
            window.continueGameStart();
        }
    }, 500);
};

// Make showVideoIntro accessible globally for postcard-system.js
window.showVideoIntro = showVideoIntro;

// ============================================
// STAGE TRANSITION VIDEO
// ============================================

function showStageVideo(nextStage) {
    console.log('=== showStageVideo called ===');
    console.log('Next stage:', nextStage);
    
    // Check if this stage has a video
    const videoFile = STAGE_VIDEOS[nextStage];
    console.log('Video file for', nextStage, ':', videoFile);
    
    if (!videoFile) {
        // No video for this stage, continue directly
        console.log('No video, continuing directly to stage');
        continueToStage(nextStage);
        return;
    }
    
    const stageVideoDiv = document.getElementById('stage-video');
    const video = document.getElementById('stage-video-player');
    
    if (!stageVideoDiv || !video) {
        console.error('Stage video elements not found');
        continueToStage(nextStage);
        return;
    }
    
    // Image should already be preloaded from handleCorrectItemFound
    if (!window.nextStageImage) {
        const stage = GAME_DATA.stages[nextStage];
        const imageFile = stage ? (stage.image || `${nextStage}.jpg`) : `${nextStage}.jpg`;
        console.log('⚠️ Backup: Preloading next stage image now:', imageFile);
        
        loadImage(imageFile, 
            (img) => {
                window.nextStageImage = img;
                console.log('✓ Backup preload successful');
            },
            (error) => {
                console.error('✗ Backup preload failed:', error);
            }
        );
    }
    
    // Set video source
    video.innerHTML = `<source src="${videoFile}" type="video/mp4">`;
    video.load();
    video.currentTime = 0;
    
    // Remove any old event listeners by cloning the video element
    const newVideo = video.cloneNode(true);
    video.parentNode.replaceChild(newVideo, video);
    const finalVideo = document.getElementById('stage-video-player');
    
    // Show video screen
    stageVideoDiv.style.display = 'flex';
    setTimeout(() => {
        stageVideoDiv.classList.add('active');
        
        // Play after screen is visible
        setTimeout(() => {
            finalVideo.play().catch(error => {
                console.error('Stage video play failed:', error);
                skipStageVideo();
            });
        }, 100);
    }, 50);
    
    // Store next stage for when video ends
    window.pendingStage = nextStage;
    console.log('📌 Stored pendingStage:', nextStage);
    
    // When video ends, continue to next stage
    finalVideo.addEventListener('ended', function() {
        console.log('📹 Video ended, pendingStage is:', window.pendingStage);
        skipStageVideo();
    }, { once: true });
}

window.skipStageVideo = function() {
    console.log('=== skipStageVideo called ===');
    
    const stageVideoDiv = document.getElementById('stage-video');
    const video = document.getElementById('stage-video-player');
    
    // Fade out
    stageVideoDiv.classList.remove('active');
    
    // Pause video
    if (video) {
        video.pause();
    }
    
    // Get the pending stage
    const nextStage = window.pendingStage;
    console.log('📍 pendingStage:', nextStage);
    console.log('📍 Current gameState.currentStage:', gameState.currentStage);
    
    // Hide and continue to next stage after fade
    setTimeout(() => {
        stageVideoDiv.style.display = 'none';
        if (nextStage) {
            console.log('➡️ Calling continueToStage with:', nextStage);
            continueToStage(nextStage);
            window.pendingStage = null;
        } else {
            console.error('❌ No pendingStage found!');
        }
    }, 500);
};

// ============================================
// PASSPORT VIDEO - Shows at end of game
// ============================================

window.showPassportVideo = function() {
    console.log('=== showPassportVideo called ===');
    
    const stageVideoDiv = document.getElementById('stage-video');
    const video = document.getElementById('stage-video-player');
    
    if (!stageVideoDiv || !video) {
        console.error('Stage video elements not found');
        showGameCompleteModal();
        return;
    }
    
    // Set video source to passport video
    video.innerHTML = `<source src="דרכון.mp4" type="video/mp4">`;
    video.load();
    video.currentTime = 0;
    
    // Remove any old event listeners by cloning the video element
    const newVideo = video.cloneNode(true);
    video.parentNode.replaceChild(newVideo, video);
    const finalVideo = document.getElementById('stage-video-player');
    
    // Show video screen
    stageVideoDiv.style.display = 'flex';
    setTimeout(() => {
        stageVideoDiv.classList.add('active');
        
        // Play after screen is visible
        setTimeout(() => {
            finalVideo.play().catch(error => {
                console.error('Passport video play failed:', error);
                skipPassportVideo();
            });
        }, 100);
    }, 50);
    
    // When video ends, show game complete modal
    finalVideo.addEventListener('ended', function() {
        console.log('📹 Passport video ended');
        skipPassportVideo();
    }, { once: true });
};

window.skipPassportVideo = function() {
    console.log('=== skipPassportVideo called ===');
    
    const stageVideoDiv = document.getElementById('stage-video');
    const video = document.getElementById('stage-video-player');
    
    // Fade out
    stageVideoDiv.classList.remove('active');
    
    // Pause video
    if (video) {
        video.pause();
    }
    
    // Hide and show game complete modal
    setTimeout(() => {
        stageVideoDiv.style.display = 'none';
        showGameCompleteModal();
    }, 500);
};

function continueToStage(nextStage) {
    console.log('=== continueToStage called ===');
    console.log('Current stage:', gameState.currentStage);
    console.log('Next stage:', nextStage);
    
    // Update game state
    gameState.currentStage = nextStage;
    gameState.foundItems = [];
    gameState.currentSearchItem = 0;
    gameState.stageComplete = false;
    
    console.log('Game state updated to:', nextStage);
    
    // Get stage data
    const stage = GAME_DATA.stages[nextStage];
    if (!stage) {
        console.error('Stage not found:', nextStage);
        return;
    }
    
    console.log('Stage data found:', stage.name);
    
    // Check if image was already preloaded
    if (window.nextStageImage) {
        console.log('✓ Using preloaded image');
        stageImage = window.nextStageImage;
        window.nextStageImage = null;
        centerImage();
        
        // Update UI immediately
        updateSearchItemCircle();
        
        console.log('✓ Stage switched instantly to:', nextStage);
        return;
    }
    
    console.log('⚠️ Image not preloaded, loading now...');
    
    // Image not preloaded - show loading screen
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loading-overlay';
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(26, 35, 50, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 5000;
        color: white;
        font-size: 1.5rem;
        font-family: 'Rubik', sans-serif;
    `;
    loadingOverlay.innerHTML = '<div>טוען...</div>';
    document.body.appendChild(loadingOverlay);
    
    // Load new stage image
    const imageFile = stage.image || `${nextStage}.jpg`;
    console.log('📸 Loading stage image:', imageFile);
    
    loadImage(imageFile, 
        (img) => {
            // Success callback
            console.log('✅ Image loaded successfully!');
            
            stageImage = img;
            centerImage();
            
            // Remove loading overlay
            if (loadingOverlay && loadingOverlay.parentNode) {
                loadingOverlay.parentNode.removeChild(loadingOverlay);
            }
            
            // Update UI
            console.log('🔄 Updating UI for stage:', nextStage);
            updateSearchItemCircle();
            
            console.log('✓ Stage image loaded successfully:', nextStage, imageFile);
        },
        (error) => {
            // Error callback
            console.error('❌ FAILED TO LOAD IMAGE');
            console.error('File:', imageFile);
            console.error('Error:', error);
            
            // Remove loading overlay
            if (loadingOverlay && loadingOverlay.parentNode) {
                loadingOverlay.parentNode.removeChild(loadingOverlay);
            }
            
            alert('שגיאה: לא ניתן לטעון את התמונה ' + imageFile);
        }
    );
}
