/**
 * SAO Link Start Animation Controller
 */
export class LinkStartAnimation {
    // Keep existing properties
    private button: HTMLElement | null;
    private animationContainer: HTMLElement | null;
    private mainContent: HTMLElement | null;
    private linkStartText: HTMLElement | null;
    private tunnel: HTMLElement | null;
    private systemCheck: HTMLElement | null;
    private floatingBackground: HTMLElement | null;
    
    // Skill icons for floating background
    private skillIcons: string[] = [
        "img/Typescript-icon.png",
        "img/Javascript-icon.png",
        "img/PHP-icon.png",
        "img/Bootstrap-icon.png",
        "img/Tailwindcss-icon.png",
        "img/HTML-icon.png",
        "img/CSS-icon.png",
        "img/Git-icon.png",
        "img/MySQL-icon.png",
        "img/Java-icon.png",
        "img/c++-icon.png",
        "img/Python-icon.png",
        "img/Premiere-icon.png",
        "img/Photoshop-icon.png",
        "img/Ilustrator-icon.png",
        "img/After Effect-icon.png"
    ];

    constructor() {
        this.button = document.getElementById('link-start-button');
        this.animationContainer = document.getElementById('link-start-animation');
        // Fix: Use the first section element as main content instead of looking for #main-content
        this.mainContent = document.querySelector('body'); // Use body as container for all content sections
        this.linkStartText = document.querySelector('.link-start-text');
        this.tunnel = document.querySelector('.link-start-tunnel');
        this.systemCheck = document.querySelector('.system-check');
        this.floatingBackground = document.querySelector('.floating-skills-background');
        
        // Debug: Check if elements are found
        console.log("Link Start Button found:", !!this.button);
        console.log("Animation Container found:", !!this.animationContainer);
        console.log("Main Content found:", !!this.mainContent);
        console.log("Link Start Text found:", !!this.linkStartText);
        console.log("Tunnel found:", !!this.tunnel);
        console.log("System Check found:", !!this.systemCheck);
        console.log("Floating Background found:", !!this.floatingBackground);
        
        // Create floating skills background
        this.createFloatingSkills();
        this.init();
    }

    private init(): void {
        
        if (this.button) {
            this.button.addEventListener('click', () => this.startAnimation());
            
            // Add pulse animation to button
            this.button.classList.add('pulse-animation');
        }
    }
    
    /**
     * Create floating skill icons in the background
     */
    private createFloatingSkills(): void {
        if (!this.floatingBackground) return;
        
        // Create multiple instances of each skill icon
        const totalIcons = 24; // Total number of floating icons
        
        for (let i = 0; i < totalIcons; i++) {
            // Randomly select an icon
            const iconSrc = this.skillIcons[Math.floor(Math.random() * this.skillIcons.length)];
            
            // Create img element
            const skillImg = document.createElement('img');
            skillImg.src = iconSrc;
            skillImg.className = 'floating-skill';
            skillImg.alt = "Skill Icon";
            
            // Set random starting positions
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight;
            skillImg.style.left = `${startX}px`;
            skillImg.style.top = `${startY}px`;
            
            // Set random animation delay
            skillImg.style.animationDelay = `${Math.random() * 15}s`;
            
            // Set random size
            const size = 30 + Math.random() * 30; // Between 30px and 60px
            skillImg.style.width = `${size}px`;
            skillImg.style.height = `${size}px`;
            
            // Set random rotation
            const rotation = Math.random() * 360;
            skillImg.style.transform = `rotate(${rotation}deg)`;
            
            // Add to background
            this.floatingBackground?.appendChild(skillImg);
        }
    }

    private startAnimation(): void {
        if (this.button && this.animationContainer) {
            // Hide button and show animation container
            this.button.style.display = 'none';
            
            // Hide floating background when animation starts
            if (this.floatingBackground) {
                this.floatingBackground.style.opacity = '0';
                this.floatingBackground.style.transition = 'opacity 0.5s ease';
            }
            
            this.animationContainer.style.display = 'flex';
            
            // Rest of your startAnimation method remains the same
            console.log("Animation started!");
            
            // Play audio if available
            const audio = document.getElementById('link-start-audio') as HTMLAudioElement;
            if (audio) {
                audio.play().catch(err => console.log('Audio playback prevented:', err));
            }
            
            // Step 1: Show "LINK START" text with typing effect
            if (this.linkStartText) {
                this.linkStartText.innerHTML = '';
                this.linkStartText.style.opacity = '1';
                
                const text = 'LINK START';
                let i = 0;
                const typeInterval = setInterval(() => {
                    if (i < text.length) {
                        this.linkStartText!.innerHTML += text.charAt(i);
                        i++;
                    } else {
                        clearInterval(typeInterval);
                        
                        // Add glowing effect after typing completes
                        setTimeout(() => {
                            if (this.linkStartText) {
                                this.linkStartText.classList.add('text-glow');
                            }
                        }, 200);
                    }
                }, 70);
            }

            
            
            // Step 2: After 1.5s, start tunnel animation with enhanced effects
            setTimeout(() => {
                console.log("Starting tunnel animation");
                if (this.tunnel) {
                    this.tunnel.style.opacity = '1';
                    
                    // Clear any existing color lines
                    const existingLines = this.tunnel.querySelectorAll('.color-line');
                    existingLines.forEach(line => {
                        if (line.parentNode) {
                            line.parentNode.removeChild(line);
                        }
                    });
                    
                    // Create consistent color spectrum (rainbow effect)
                    const colorSpectrum = [
                        '#ff0000', // Red
                        '#ff7700', // Orange
                        '#ffce00', // Yellow
                        '#31ff6a', // Green
                        '#00a0ff', // Blue
                        '#0022ff', // Indigo
                        '#c900ff'  // Violet
                    ];
                    
                    // Create multiple lines for each color to create a fuller effect
                    for (let i = 0; i < colorSpectrum.length; i++) {
                        // Create 3 lines of each color at different positions
                        for (let j = 0; j < 3; j++) {
                            const offset = (j - 1) * 8; // -8, 0, 8 offset
                            const basePosition = 10 + ((i * 12) % 80); // Distribute across screen width
                            const position = Math.max(5, Math.min(95, basePosition + offset)); // Keep within 5-95% range
                            
                            const line = document.createElement('div');
                            line.className = 'color-line';
                            line.style.backgroundColor = colorSpectrum[i];
                            line.style.left = `${position}%`;
                            line.style.width = `${3 + Math.random() * 4}%`; // 3-7% width
                            line.style.opacity = '0.85';
                            
                            // Randomize slightly the rotation for natural feel
                            const rotationDeg = Math.random() * 14 - 7; // -7 to 7 degrees
                            line.style.transform = `rotate(${rotationDeg}deg)`;
                            line.style.animation = `moveTunnel ${1.8 + Math.random() * 0.7}s cubic-bezier(0.25, 0.1, 0.25, 1) forwards`;
                            line.style.animationDelay = `${Math.random() * 0.3}s`;
                            
                            this.tunnel.appendChild(line);
                        }
                    }
                }
                
                // Fade out text with blur effect
                if (this.linkStartText) {
                    this.linkStartText.style.transition = 'all 0.8s ease';
                    this.linkStartText.style.opacity = '0';
                    this.linkStartText.style.filter = 'blur(10px)';
                }
            }, 1500);
            
            // Step 3: After 2.5s, show enhanced system check
            setTimeout(() => {
                console.log("Starting system checks");
                if (this.systemCheck) {
                    this.systemCheck.style.display = 'flex';
                    
                    // Animate each check item with scanning effect
                    const checkItems = this.systemCheck.querySelectorAll('.check-item');
                    console.log(`Found ${checkItems.length} check items`);
                    
                    checkItems.forEach((item, index) => {
                        setTimeout(() => {
                            console.log(`Processing check item ${index + 1}`);
                            // Add scanning animation
                            item.classList.add('scanning');
                            
                            // Show progress bar
                            const progressBar = document.createElement('div');
                            progressBar.className = 'check-progress';
                            item.appendChild(progressBar);
                            
                            // Animate progress bar
                            setTimeout(() => {
                                progressBar.style.width = '100%';
                            }, 50);
                            
                            // After progress completes, show OK status
                            setTimeout(() => {
                                item.classList.remove('scanning');
                                item.classList.add('check-complete', 'animate__animated', 'animate__fadeInRight');
                                
                                const statusElement = item.querySelector('.check-status');
                                if (statusElement) {
                                    console.log(`Updating status for item ${index + 1}`);
                                    // Special animation for the last item (Portfolio)
                                    if (index === checkItems.length - 1) {
                                        setTimeout(() => {
                                            statusElement.textContent = 'OK';
                                            statusElement.classList.add('status-ok-flash');
                                            
                                            // Add connection complete text
                                            const connectionComplete = document.createElement('div');
                                            connectionComplete.className = 'connection-complete animate__animated animate__fadeIn';
                                            connectionComplete.textContent = 'CONNECTION COMPLETE';
                                            this.systemCheck?.appendChild(connectionComplete);
                                            
                                            console.log("All checks complete!");
                                        }, 1000);
                                    } else {
                                        statusElement.textContent = 'OK';
                                        statusElement.classList.add('status-ok');
                                    }
                                }
                            }, 800);
                        }, index * 600);
                    });
                }
            }, 2500);
            
            // Step 4: Final enhanced flash and transition to main content
            // Adding 500ms extra to ensure all system checks complete
            const totalDelay = 2500 + (5 * 600) + 1000 + 500; // base delay + all checks + last item special delay + buffer
            setTimeout(() => {
                console.log("Starting final transition");
                // Create and add circles effect before flash
                const circlesContainer = document.createElement('div');
                circlesContainer.className = 'circles-container';
                document.body.appendChild(circlesContainer);
                
                for (let i = 0; i < 5; i++) {
                    const circle = document.createElement('div');
                    circle.className = 'circle';
                    circle.style.animationDelay = `${i * 0.1}s`;
                    circlesContainer.appendChild(circle);
                }
                
                setTimeout(() => {
                    console.log("Final flash");
                    // Create and add flash element
                    const flash = document.createElement('div');
                    flash.className = 'final-flash';
                    document.body.appendChild(flash);
                    
                    // Animate flash
                    flash.style.animation = 'finalFlash 0.8s forwards';
                    
                    // After flash animation ends, show main content
                   // After flash animation ends, show main content
                    setTimeout(() => {
                        console.log("Showing main content");
                        console.log("Main content reference:", !!this.mainContent);
                        
                        const linkStartContainer = document.getElementById('link-start-container');
                        console.log("Link start container reference:", !!linkStartContainer);
                        
                        // IMPORTANT: Find and remove any animation overlays that might block interaction
                        const finalFlash = document.querySelector('.final-flash');
                        if (finalFlash && finalFlash.parentNode) {
                            finalFlash.parentNode.removeChild(finalFlash);
                        }
                        
                        const circlesContainer = document.querySelector('.circles-container');
                        if (circlesContainer && circlesContainer.parentNode) {
                            circlesContainer.parentNode.removeChild(circlesContainer);
                        }
                        
                        // Hide link start container
                        if (linkStartContainer) {
                            linkStartContainer.style.display = 'none';
                        }
                        
                        // Ensure navbar has proper z-index and is visible
                        const navbar = document.querySelector('.navbar') as HTMLElement;
                        if (navbar) {
                            navbar.style.zIndex = '1030';
                            navbar.style.display = 'block';
                        }
                        
                        if (this.mainContent) {
                            // Set flag in session storage to indicate animation completed
                            sessionStorage.setItem('linkStartCompleted', 'true');
                            
                            console.log("Resetting animations for all elements");
                            
                            // First, set all sections to invisible but keep them in the DOM
                            document.querySelectorAll('section').forEach(section => {
                                section.style.opacity = '0';
                            });
                            
                            // Hide any existing skill animations
                            const skillContainer = document.getElementById('skillsContainer');
                            if (skillContainer) {
                                skillContainer.querySelectorAll('.skill-item').forEach(skill => {
                                    (skill as HTMLElement).style.opacity = '0';
                                    (skill as HTMLElement).style.transform = 'translateX(-100px)'; // Reset position
                                });
                            }
                            
                            // Remove all animation classes first
                            document.querySelectorAll('.animate__animated').forEach(el => {
                                el.classList.forEach(cls => {
                                    if (cls.startsWith('animate__')) {
                                        el.classList.remove(cls);
                                    }
                                });
                            });
                            
                            // Wait a bit to ensure DOM updates before starting new animations
                            setTimeout(() => {
                                try {
                                    console.log("Triggering portfolio refresh event");
                                    
                                    // Reset laptop animation if it exists
                                    const laptopAnimation = document.querySelector('.laptop-animation');
                                    if (laptopAnimation) {
                                        // Clone and replace to reset animations
                                        const parent = laptopAnimation.parentNode;
                                        if (parent) {
                                            const clone = laptopAnimation.cloneNode(true);
                                            parent.replaceChild(clone, laptopAnimation);
                                        }
                                    }
                                    
                                    // Dispatch a custom event that will be caught by main.ts
                                    const event = new CustomEvent('portfolioReady', {
                                        detail: { 
                                            refreshAnimations: true,
                                            timestamp: new Date().getTime() // Add timestamp to ensure event is treated as new
                                        }
                                    });
                                    document.dispatchEvent(event);
                                    console.log("portfolioReady event dispatched");
                                } catch (error) {
                                    console.error("Error dispatching portfolioReady event:", error);
                                    
                                    // Fallback: force reload but skip link-start animation
                                    window.location.href = window.location.pathname + '?skipIntro=true';
                                }
                            }, 100);
                        }
                    }, 1000);
                }, 1000);
            }, totalDelay);
        }
    }
    
    private addExtraColorLines(): void {
        if (!this.tunnel) return;
        
        const colors = ['#00a0ff', '#ff2b4e', '#31ff6a', '#ffce00', '#c900ff', '#00ffea', '#ff7700'];
        
        // Create new random color line
        const line = document.createElement('div');
        line.className = 'color-line color-extra';
        line.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        line.style.left = `${Math.random() * 80 + 10}%`;
        line.style.width = `${Math.random() * 8 + 3}%`;
        
        // Fix the rotation style by setting the rotation directly instead of using CSS variables
        const rotationDeg = Math.random() * 20 - 10;
        line.style.transform = `rotate(${rotationDeg}deg)`;
        
        this.tunnel.appendChild(line);
        
        // Remove after animation completes
        setTimeout(() => {
            if (this.tunnel && this.tunnel.contains(line)) {
                this.tunnel.removeChild(line);
            }
        }, 2000);
    }
}

// Initialize the animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LinkStartAnimation();
});