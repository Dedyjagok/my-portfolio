var Portfolio = /** @class */ (function () {
    function Portfolio() {
        this.projects = [
            {
                title: "Warung UMKM",
                description: "a website cashier application, and a website for customers can order things online",
                imageUrl: "img/warung-umkm.jpg",
                technologies: ["Javascript", "Tailwind", "PHP", "MySQL"]
            }
        ];
        this.skills = [
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
    }
    Portfolio.prototype.init = function () {
        this.loadProjects();
        this.loadSkills();
        this.setupContactForm();
        this.initializeAnimations();
    };
    Portfolio.prototype.loadProjects = function () {
        var _this = this;
        var container = document.getElementById('projectsContainer');
        if (!container)
            return;
        this.projects.forEach(function (project) {
            var projectElement = _this.createProjectElement(project);
            container.appendChild(projectElement);
        });
    };
    Portfolio.prototype.createProjectElement = function (project) {
        var col = document.createElement('div');
        col.className = 'col-lg-4 col-md-6 mb-4';
        col.innerHTML = "\n            <div class=\"card h-100 project-card\">\n                <div class=\"project-media\">\n                    <img src=\"".concat(project.imageUrl, "\" class=\"card-img-top\" alt=\"").concat(project.title, "\">\n                    <video class=\"project-video\" muted>\n                        <source src=\"video/video-project-web-umkm.mp4\" type=\"video/mp4\">\n                    </video>\n                </div>\n                <div class=\"card-body\">\n                    <h5 class=\"card-title\">").concat(project.title, "</h5>\n                    <p class=\"card-text\">").concat(project.description, "</p>\n                    <div class=\"technology-stack\">\n                        ").concat(project.technologies.map(function (tech) {
            return "<span class=\"badge bg-secondary me-1\">".concat(tech, "</span>");
        }).join(''), "\n                    </div>\n                </div>\n            </div>\n        ");
        // Add hover event listeners
        var card = col.querySelector('.project-card');
        var video = col.querySelector('.project-video');
        card === null || card === void 0 ? void 0 : card.addEventListener('mouseenter', function () {
            video.play();
        });
        card === null || card === void 0 ? void 0 : card.addEventListener('mouseleave', function () {
            video.pause();
            video.currentTime = 0;
        });
        return col;
    };
    Portfolio.prototype.createSkillElement = function (skill, index) {
        var div = document.createElement('div');
        div.className = "col-6 mb-3 skill-item ".concat(index % 2 === 0 ? 'odd' : 'even');
        div.innerHTML = "\n            <div class=\"d-flex align-items-center skill-box\">\n                <img src=\"".concat(skill.imageUrl, "\" class=\"skill-custom-icon\" alt=\"").concat(skill.name, "\">\n                <span>").concat(skill.name, "</span>\n            </div>\n        ");
        // Create and append sliding icon once
        var slidingIcon = document.createElement('div');
        slidingIcon.className = 'sliding-icon';
        slidingIcon.innerHTML = "<img src=\"".concat(skill.imageUrl, "\" alt=\"").concat(skill.name, "\">");
        var aboutSection = document.getElementById('about');
        if (aboutSection) {
            // Create a cleanup function for the previous icon
            var cleanup_1 = function () {
                var existingIcon = aboutSection.querySelector(".sliding-icon[data-skill=\"".concat(skill.name, "\"]"));
                if (existingIcon) {
                    existingIcon.remove();
                }
            };
            // Add data attribute for identification
            slidingIcon.setAttribute('data-skill', skill.name);
            div.addEventListener('mouseenter', function () {
                cleanup_1(); // Remove any existing icon
                aboutSection.appendChild(slidingIcon);
                // Force reflow
                slidingIcon.offsetHeight;
                requestAnimationFrame(function () {
                    slidingIcon.style.transform = 'translate(0, -50%)';
                    slidingIcon.classList.add('active');
                });
            });
            div.addEventListener('mouseleave', function () {
                slidingIcon.style.transform = 'translate(100%, -50%)';
                slidingIcon.classList.remove('active');
                // Cleanup after animation
                setTimeout(cleanup_1, 500);
            });
        }
        return div;
    };
    Portfolio.prototype.loadSkills = function () {
        var _this = this;
        var container = document.getElementById('skillsContainer');
        if (!container)
            return;
        container.className = 'row';
        this.skills.forEach(function (skill, index) {
            var skillElement = _this.createSkillElement(skill, index);
            container.appendChild(skillElement);
        });
    };
    Portfolio.prototype.setupContactForm = function () {
        var form = document.getElementById('contactForm');
        if (!form)
            return;
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var formData = new FormData(form);
            var formObject = {};
            formData.forEach(function (value, key) {
                formObject[key] = value.toString();
            });
            console.log('Form submitted:', formObject);
        });
    };
    Portfolio.prototype.initializeAnimations = function () {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var element = entry.target;
                    if (element.id === 'skillsContainer') {
                        var skills = element.querySelectorAll('.skill-item');
                        skills.forEach(function (skill, index) {
                            setTimeout(function () {
                                skill.classList.add('animate__animated');
                                skill.classList.add(index % 2 === 0 ? 'animate__fadeInLeft' : 'animate__fadeInRight');
                            }, index * 100);
                        });
                    }
                    else {
                        element.classList.add('animate__animated', 'animate__fadeIn');
                    }
                }
            });
        }, {
            threshold: 0.2
        });
        document.querySelectorAll('section, #skillsContainer').forEach(function (section) {
            observer.observe(section);
        });
    };
    return Portfolio;
}());
// Initialize portfolio
document.addEventListener('DOMContentLoaded', function () {
    var portfolio = new Portfolio();
    portfolio.init();
});
