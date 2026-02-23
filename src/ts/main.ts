import { LinkStartAnimation } from './link-start';

interface Project {
    title: string;
    description: string;
    imageUrl: string;
    technologies: string[];
}

interface Skill {
    name: string;
    imageUrl?: string;
}

class Portfolio {
    private initNavbar(): void {
        // Handle navbar scrolling effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('main-navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
        });

        // Update active nav item based on scroll position - FIXED VERSION
        window.addEventListener('scroll', () => {
            // Get the scroll position with a small offset to trigger earlier
            const scrollPosition = window.scrollY + 300; // 300px offset for better UX

            // Get all sections and find the one currently in view
            const sections = document.querySelectorAll('section[id]');
            let current = '';

            sections.forEach(section => {
                // Get top position using getBoundingClientRect() which is more reliable
                const sectionTop = section.getBoundingClientRect().top + window.scrollY;
                const sectionHeight = section.clientHeight;
                const sectionId = section.getAttribute('id') || '';

                // Check if we've scrolled to this section
                if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                    current = sectionId;
                }
            });

            // Update the active class on nav links
            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('active');
                const href = navLink.getAttribute('href');
                if (href && href.substring(1) === current) {
                    navLink.classList.add('active');
                }
            });
        });
    }
    private projects: Project[] = [
        {
            title: "Warung UMKM",
            description: "a website cashier application, and a website for customers can order things online",
            imageUrl: "img/warung-umkm.jpg",
            technologies: ["Javascript", "Tailwind", "PHP", "MySQL"]
        }
    ];

    private skills: Skill[] = [
        { name: "TypeScript", imageUrl: "img/Typescript-icon.png" },
        { name: "JavaScript", imageUrl: "img/Javascript-icon.png" },
        { name: "PHP", imageUrl: "img/PHP-icon.png" },
        { name: "Bootstrap", imageUrl: "img/Bootstrap-icon.png" },
        { name: "Tailwind", imageUrl: "img/Tailwindcss-icon.png" },
        { name: "HTML", imageUrl: "img/HTML-icon.png" },
        { name: "CSS", imageUrl: "img/CSS-icon.png" },
        { name: "Git", imageUrl: "img/Git-icon.png" },
        { name: "MySQL", imageUrl: "img/MySQL-icon.png" },
        { name: "Java", imageUrl: "img/Java-icon.png" },
        { name: "C++", imageUrl: "img/c++-icon.png" },
        { name: "Python", imageUrl: "img/Python-icon.png" },
        { name: "Premiere Pro", imageUrl: "img/Premiere-icon.png" },
        { name: "Photoshop", imageUrl: "img/Photoshop-icon.png" },
        { name: "Illustrator", imageUrl: "img/Ilustrator-icon.png" },
        { name: "After Effect", imageUrl: "img/After Effect-icon.png" }
    ];

    public init(): void {
        this.loadProjects();
        this.loadSkills();
        this.setupContactForm();
        this.initializeAnimations();
        this.initNavbar();
        this.initFaceRecognitionVideo();

        // Listen for video initialization event from link-start
        document.addEventListener('initFaceRecognitionVideo', () => {
            console.log('Re-initializing face recognition video from event');
            this.initFaceRecognitionVideo();
        });
    }



    private initFaceRecognitionVideo(): void {
        console.log("Initializing face recognition video hover effect");

        // Wait a bit to ensure DOM is ready
        setTimeout(() => {
            const creativitySection = document.getElementById('creativity');
            if (!creativitySection) {
                console.error("Creativity section not found");
                return;
            }

            const creativityCard = creativitySection.querySelector('.sao-card');
            if (!creativityCard) {
                console.error("SAO card not found in creativity section");
                return;
            }

            const video = creativityCard.querySelector('.project-video') as HTMLVideoElement;
            if (!video) {
                console.error("Video element not found in creativity card");
                return;
            }

            console.log("Video element found:", video);
            console.log("Video source:", video.querySelector('source')?.getAttribute('src'));

            // Load the video
            video.load();

            // Remove previous handlers if any (to avoid duplicate listeners on re-init)
            const el = creativityCard as any;
            if (el._videoMouseEnter) {
                creativityCard.removeEventListener('mouseenter', el._videoMouseEnter);
            }
            if (el._videoMouseLeave) {
                creativityCard.removeEventListener('mouseleave', el._videoMouseLeave);
            }

            // Store named handlers on the element so they can be removed on re-init
            let playPromise: Promise<void> | undefined;

            el._videoMouseEnter = () => {
                video.muted = true; // enforce muted for production autoplay policy
                playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(err => {
                        console.error("Error playing video:", err);
                        playPromise = undefined;
                    });
                }
            };
            el._videoMouseLeave = () => {
                if (playPromise !== undefined) {
                    // Wait for play to resolve before pausing — avoids DOMException in production
                    playPromise.then(() => {
                        video.pause();
                        video.currentTime = 0;
                    }).catch(() => {
                        // play was already rejected, nothing to pause
                    });
                    playPromise = undefined;
                } else {
                    video.pause();
                    video.currentTime = 0;
                }
            };

            creativityCard.addEventListener('mouseenter', el._videoMouseEnter);
            creativityCard.addEventListener('mouseleave', el._videoMouseLeave);

            console.log("Face recognition video hover handlers attached successfully");
        }, 100);
    }

    private loadProjects(): void {
        const container = document.getElementById('projectsContainer');
        if (!container) return;

        // Clear any existing projects in the container
        container.innerHTML = '';

        this.projects.forEach(project => {
            const projectElement = this.createProjectElement(project);
            container.appendChild(projectElement);
        });
    }

    private createProjectElement(project: Project): HTMLElement {
        const col = document.createElement('div');
        col.className = 'col-lg-4 col-md-6 mb-4';

        col.innerHTML = `
            <div class="card h-100 project-card">
                <div class="project-media">
                    <img src="${project.imageUrl}" class="card-img-top" alt="${project.title}">
                    <video class="project-video" muted>
                        <source src="video/video-project-web-umkm.mp4" type="video/mp4">
                    </video>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${project.title}</h5>
                    <p class="card-text text-white">${project.description}</p>
                    <div class="technology-stack">
                        ${project.technologies.map(tech =>
            `<span class="badge bg-secondary me-1">${tech}</span>`
        ).join('')}
                    </div>
                </div>
            </div>
        `;

        // Add hover event listeners
        const card = col.querySelector('.project-card');
        const video = col.querySelector('.project-video') as HTMLVideoElement;

        card?.addEventListener('mouseenter', () => {
            video.play();
        });

        card?.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });

        return col;
    }

    private createSkillElement(skill: Skill, index: number): HTMLElement {
        const div = document.createElement('div');
        div.className = `col-6 mb-3 skill-item ${index % 2 === 0 ? 'odd' : 'even'}`;

        div.innerHTML = `
            <div class="d-flex align-items-center skill-box">
                <img src="${skill.imageUrl}" class="skill-custom-icon" alt="${skill.name}">
                <span>${skill.name}</span>
            </div>
        `;


        // Create and append sliding icon once
        const slidingIcon = document.createElement('div');
        slidingIcon.className = 'sliding-icon';
        slidingIcon.innerHTML = `<img src="${skill.imageUrl}" alt="${skill.name}">`;

        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            // Create a cleanup function for the previous icon
            const cleanup = () => {
                const existingIcon = aboutSection.querySelector(`.sliding-icon[data-skill="${skill.name}"]`);
                if (existingIcon) {
                    existingIcon.remove();
                }
            };

            // Add data attribute for identification
            slidingIcon.setAttribute('data-skill', skill.name);

            div.addEventListener('mouseenter', () => {
                cleanup(); // Remove any existing icon
                aboutSection.appendChild(slidingIcon);

                // Force reflow
                slidingIcon.offsetHeight;

                requestAnimationFrame(() => {
                    slidingIcon.style.transform = 'translate(0, -50%)';
                    slidingIcon.classList.add('active');
                });
            });

            div.addEventListener('mouseleave', () => {
                slidingIcon.style.transform = 'translate(100%, -50%)';
                slidingIcon.classList.remove('active');

                // Cleanup after animation
                setTimeout(cleanup, 500);
            });
        }

        return div;
    }

    private loadSkills(): void {
        const container = document.getElementById('skillsContainer');
        if (!container) return;

        // Clear any existing skills in the container
        container.innerHTML = '';

        container.className = 'row';
        this.skills.forEach((skill, index) => {
            const skillElement = this.createSkillElement(skill, index);
            container.appendChild(skillElement);
        });
    }

    private setupContactForm(): void {
        const form = document.getElementById('contactForm') as HTMLFormElement;
        if (!form) return;

        form.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            const formData = new FormData(form);
            const formObject: Record<string, string> = {};

            formData.forEach((value, key) => {
                formObject[key] = value.toString();
            });

            console.log('Form submitted:', formObject);
        });
    }

    private initializeAnimations(): void {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target as HTMLElement;
                    if (element.id === 'skillsContainer') {
                        const skills = element.querySelectorAll('.skill-item');
                        skills.forEach((skill, index) => {
                            setTimeout(() => {
                                skill.classList.add('animate__animated');
                                skill.classList.add(index % 2 === 0 ? 'animate__fadeInLeft' : 'animate__fadeInRight');
                            }, index * 100);
                        });
                    } else {
                        element.classList.add('animate__animated', 'animate__fadeIn');
                    }
                }
            });
        }, {
            threshold: 0.2
        });

        document.querySelectorAll('section, #skillsContainer').forEach(section => {
            observer.observe(section);
        });

    }
}

// Initialize portfolio
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM content loaded, initializing portfolio");
    const portfolio = new Portfolio();
    portfolio.init();

    // Listen for portfolio refresh event
    document.addEventListener('portfolioReady', (e: Event) => {
        console.log('Portfolio ready event received. Reinitializing...');
        try {
            const portfolio = new Portfolio();
            portfolio.init();

            const customEvent = e as CustomEvent;
            if (customEvent.detail?.refreshAnimations) {
                console.log("Refreshing animations with timestamp:", customEvent.detail.timestamp);

                // Restore section visibility with animation
                document.querySelectorAll('section').forEach((section, sectionIndex) => {
                    // Stagger the sections slightly
                    setTimeout(() => {
                        // Force reflow by accessing offsetHeight
                        void section.offsetHeight;

                        // Make visible with animation
                        section.style.opacity = '1';
                        section.classList.add('animate__animated', 'animate__fadeIn');
                    }, sectionIndex * 40);
                });

                // Handle skill items separately with staggered animation
                const skillContainer = document.getElementById('skillsContainer');
                if (skillContainer) {
                    const skills = skillContainer.querySelectorAll('.skill-item');
                    skills.forEach((skill, index) => {
                        // Clear any existing animations and prepare for new ones
                        skill.classList.remove('animate__animated', 'animate__fadeInLeft', 'animate__fadeInRight');

                        // Prepare starting positions based on odd/even
                        if (index % 2 === 0) {
                            (skill as HTMLElement).style.transform = 'translateX(-100px)';
                        } else {
                            (skill as HTMLElement).style.transform = 'translateX(100px)';
                        }

                        // Stagger the animations
                        setTimeout(() => {
                            // Force reflow
                            (skill as HTMLElement).offsetHeight;

                            // Make visible with proper animation
                            (skill as HTMLElement).style.opacity = '1';
                            skill.classList.add('animate__animated');
                            skill.classList.add(index % 2 === 0 ? 'animate__fadeInLeft' : 'animate__fadeInRight');
                        }, 100 + (index * 30)); // Reduce from 500ms+100ms to 200ms+30ms
                    });
                }

                // Refresh any other custom animations (like laptop)
                const laptopCode = document.querySelectorAll('.code-line');
                laptopCode.forEach((line, index) => {
                    // Reset and restart typing animation
                    line.classList.remove('typing');
                    void (line as HTMLElement).offsetHeight;
                    setTimeout(() => {
                        line.classList.add('typing');
                    }, index * 20); // Staggered but faster
                });
            }
        } catch (error) {
            console.error("Error reinitializing portfolio:", error);
        }
    });
}
);
