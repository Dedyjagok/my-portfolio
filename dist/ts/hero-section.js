export class HeroSection {
    constructor() {
        this.backgroundImages = [
            'img/img-animation-hero-section/antony-elgazing.png',
            'img/img-animation-hero-section/desain-sepatu-inevitable.png',
            'img/img-animation-hero-section/jinhsi.png',
            'img/img-animation-hero-section/Subaru.png',
            'img/img-animation-hero-section/zhezhi.png'
        ];
    }
    init() {
        this.initHeroBackground();
    }
    initHeroBackground() {
        const heroSection = document.getElementById('home');
        if (!heroSection)
            return;
        // Create slideshow container
        const slideshow = document.createElement('div');
        slideshow.className = 'bg-slideshow';
        // Create and preload image elements
        const loadedImages = this.backgroundImages.map((imgPath, index) => {
            const img = document.createElement('img');
            img.src = imgPath;
            img.alt = 'Background Slide';
            if (index === 0)
                img.classList.add('active');
            return img;
        });
        // Add loaded images to slideshow
        loadedImages.forEach(img => slideshow.appendChild(img));
        // Wrap existing content
        const existingContent = heroSection.innerHTML;
        heroSection.innerHTML = '';
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'hero-content container h-100';
        contentWrapper.innerHTML = existingContent;
        // Add elements to hero section
        heroSection.appendChild(slideshow);
        heroSection.appendChild(contentWrapper);
        // Start slideshow
        let currentSlide = 0;
        setInterval(() => {
            loadedImages[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % loadedImages.length;
            loadedImages[currentSlide].classList.add('active');
        }, 5000);
    }
}
