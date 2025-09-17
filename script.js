// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Loading screen animation
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        const mainContent = document.getElementById('main-content');
        
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainContent.classList.add('show');
        }, 500);
    }, 3000); // Show loading for 3 seconds

    // Initialize interactive features
    initializeHeartButton();
    initializeMusicButton();
    initializeMessageButton();
    initializeModal();
    
    // Add continuous background effects
    createFloatingElements();
    
    // Add scroll animations
    initializeScrollAnimations();
});

// Hearts Button - Creates flying hearts effect
function initializeHeartButton() {
    const heartsBtn = document.getElementById('hearts-btn');
    const heartsContainer = document.getElementById('hearts-container');
    
    heartsBtn.addEventListener('click', function() {
        // Create multiple hearts
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                createFlyingHeart();
            }, i * 100);
        }
        
        // Button animation feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
    
    function createFlyingHeart() {
        const heart = document.createElement('div');
        heart.className = 'flying-heart';
        heart.innerHTML = ['💖', '💕', '💗', '💝', '💘'][Math.floor(Math.random() * 5)];
        
        // Random starting position
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = Math.random() * window.innerHeight + 'px';
        
        // Random animation duration
        heart.style.animationDuration = (2 + Math.random() * 2) + 's';
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 4000);
    }
}

// Music Button - Controls background music
function initializeMusicButton() {
    const musicBtn = document.getElementById('music-btn');
    const backgroundMusic = document.getElementById('background-music');
    let isPlaying = false;
    
    musicBtn.addEventListener('click', function() {
        if (!isPlaying) {
            // Since we don't have an actual audio file, we'll simulate it
            // In a real implementation, you would uncomment the following:
            // backgroundMusic.play();
            
            // Simulate music playing
            this.innerHTML = '<i class="fas fa-pause"></i> Pause Music';
            this.style.background = 'linear-gradient(135deg, #4CAF50, #66BB6A)';
            isPlaying = true;
            
            // Show music visualization effect
            createMusicVisualization();
            
            // Show notification
            showNotification('🎵 Playing our favorite song!');
            
        } else {
            // backgroundMusic.pause();
            
            this.innerHTML = '<i class="fas fa-music"></i> Play Our Song';
            this.style.background = 'linear-gradient(135deg, #ff6b9d, #ff8fab)';
            isPlaying = false;
            
            // Remove music visualization
            removeMusicVisualization();
            
            showNotification('🎵 Music paused');
        }
        
        // Button animation feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
    
    function createMusicVisualization() {
        const visualization = document.createElement('div');
        visualization.id = 'music-visualization';
        visualization.innerHTML = `
            <div class="music-bar"></div>
            <div class="music-bar"></div>
            <div class="music-bar"></div>
            <div class="music-bar"></div>
            <div class="music-bar"></div>
        `;
        visualization.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            display: flex;
            gap: 3px;
            align-items: end;
            z-index: 1000;
            padding: 10px;
            background: rgba(255, 107, 157, 0.1);
            border-radius: 10px;
            backdrop-filter: blur(10px);
        `;
        
        document.body.appendChild(visualization);
        
        // Animate music bars
        const bars = visualization.querySelectorAll('.music-bar');
        bars.forEach((bar, index) => {
            bar.style.cssText = `
                width: 4px;
                background: linear-gradient(to top, #ff6b9d, #ff8fab);
                border-radius: 2px;
                animation: musicBounce ${0.5 + Math.random() * 0.5}s ease-in-out infinite alternate;
                animation-delay: ${index * 0.1}s;
            `;
        });
        
        // Add CSS animation for music bars
        if (!document.getElementById('music-animation-style')) {
            const style = document.createElement('style');
            style.id = 'music-animation-style';
            style.textContent = `
                @keyframes musicBounce {
                    from { height: 10px; }
                    to { height: 30px; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    function removeMusicVisualization() {
        const visualization = document.getElementById('music-visualization');
        if (visualization) {
            visualization.remove();
        }
    }
}

// Special Message Button - Shows modal with special message
function initializeMessageButton() {
    const messageBtn = document.getElementById('message-btn');
    const modal = document.getElementById('message-modal');
    
    messageBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Create sparkle effect
        createSparkleEffect();
        
        // Button animation feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
}

// Modal functionality
function initializeModal() {
    const modal = document.getElementById('message-modal');
    const closeBtn = modal.querySelector('.close');
    
    // Close modal when clicking X
    closeBtn.addEventListener('click', function() {
        closeModal();
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable background scrolling
        removeSparkleEffect();
    }
}

// Create sparkle effect for special message
function createSparkleEffect() {
    const sparkleContainer = document.createElement('div');
    sparkleContainer.id = 'sparkle-container';
    sparkleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1999;
    `;
    document.body.appendChild(sparkleContainer);
    
    // Create sparkles
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createSparkle(sparkleContainer);
        }, i * 100);
    }
}

function createSparkle(container) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.cssText = `
        position: absolute;
        font-size: ${Math.random() * 20 + 15}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: sparkleAnimation ${Math.random() * 3 + 2}s ease-out forwards;
        pointer-events: none;
    `;
    container.appendChild(sparkle);
    
    // Remove sparkle after animation
    setTimeout(() => {
        sparkle.remove();
    }, 5000);
}

function removeSparkleEffect() {
    const sparkleContainer = document.getElementById('sparkle-container');
    if (sparkleContainer) {
        sparkleContainer.remove();
    }
}

// Create continuous floating elements
function createFloatingElements() {
    // Add sparkle animation CSS
    if (!document.getElementById('sparkle-animation-style')) {
        const style = document.createElement('style');
        style.id = 'sparkle-animation-style';
        style.textContent = `
            @keyframes sparkleAnimation {
                0% {
                    opacity: 0;
                    transform: translateY(0) rotate(0deg) scale(0);
                }
                10% {
                    opacity: 1;
                    transform: translateY(-20px) rotate(45deg) scale(1);
                }
                90% {
                    opacity: 1;
                    transform: translateY(-100px) rotate(315deg) scale(0.8);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-120px) rotate(360deg) scale(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Periodically create floating elements
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance every interval
            createRandomFloatingElement();
        }
    }, 2000);
}

function createRandomFloatingElement() {
    const elements = ['🌟', '💫', '✨', '💖', '🌙'];
    const element = document.createElement('div');
    element.innerHTML = elements[Math.floor(Math.random() * elements.length)];
    element.style.cssText = `
        position: fixed;
        font-size: 20px;
        left: ${Math.random() * window.innerWidth}px;
        top: ${window.innerHeight + 50}px;
        pointer-events: none;
        z-index: 100;
        animation: floatUpAndFade 8s linear forwards;
    `;
    
    document.body.appendChild(element);
    
    // Remove element after animation
    setTimeout(() => {
        element.remove();
    }, 8000);
}

// Add floating animation CSS
const floatingStyle = document.createElement('style');
floatingStyle.textContent = `
    @keyframes floatUpAndFade {
        0% {
            opacity: 0;
            transform: translateY(0) translateX(0) rotate(0deg);
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px) rotate(360deg);
        }
    }
`;
document.head.appendChild(floatingStyle);

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observe animated elements
    const animatedElements = document.querySelectorAll('.reason-item, .memory-item');
    animatedElements.forEach(el => {
        observer.observe(el);
        el.style.animationPlayState = 'paused';
    });
}

// Notification system
function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.getElementById('notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.id = 'notification';
    notification.innerHTML = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 107, 157, 0.95);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-size: 14px;
        font-weight: 600;
        z-index: 2000;
        backdrop-filter: blur(10px);
        box-shadow: 0 10px 25px rgba(255, 107, 157, 0.3);
        animation: notificationSlideIn 0.5s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'notificationSlideOut 0.5s ease-out forwards';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Add notification animation CSS
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes notificationSlideIn {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes notificationSlideOut {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-50px);
        }
    }
`;
document.head.appendChild(notificationStyle);

// Add some Easter eggs
document.addEventListener('keydown', function(e) {
    // Secret key combination: L + O + V + E
    const keys = [];
    document.addEventListener('keydown', function(event) {
        keys.push(event.key.toLowerCase());
        if (keys.length > 4) keys.shift();
        
        if (keys.join('') === 'love') {
            // Secret love effect
            for (let i = 0; i < 30; i++) {
                setTimeout(() => {
                    createSecretHeart();
                }, i * 50);
            }
            showNotification('💕 Secret love code activated! 💕');
            keys.length = 0; // Reset
        }
    });
});

function createSecretHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💝';
    heart.style.cssText = `
        position: fixed;
        font-size: 30px;
        left: ${Math.random() * window.innerWidth}px;
        top: ${Math.random() * window.innerHeight}px;
        pointer-events: none;
        z-index: 1500;
        animation: secretHeartAnimation 3s ease-out forwards;
    `;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 3000);
}

// Add secret heart animation
const secretHeartStyle = document.createElement('style');
secretHeartStyle.textContent = `
    @keyframes secretHeartAnimation {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        20% {
            opacity: 1;
            transform: scale(1.2) rotate(45deg);
        }
        80% {
            opacity: 1;
            transform: scale(1) rotate(315deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(secretHeartStyle);

// Make the page more interactive with mouse effects
document.addEventListener('mousemove', function(e) {
    if (Math.random() < 0.02) { // 2% chance on mouse move
        createMouseTrail(e.clientX, e.clientY);
    }
});

function createMouseTrail(x, y) {
    const trail = document.createElement('div');
    trail.innerHTML = '✨';
    trail.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 15px;
        pointer-events: none;
        z-index: 500;
        animation: trailFade 1.5s ease-out forwards;
    `;
    
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.remove();
    }, 1500);
}

// Add trail animation
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trailFade {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0) translateY(-30px);
        }
    }
`;
document.head.appendChild(trailStyle);

// Prevent right-click to keep the surprise intact
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    showNotification('💖 This surprise is protected with love! 💖');
});

console.log('💕 This webpage was made with love! 💕');
console.log('🌟 Try typing "love" for a secret surprise! 🌟');