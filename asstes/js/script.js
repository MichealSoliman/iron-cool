// ===================================
// Mobile Menu Toggle
// ===================================


// ===================================
// Smooth Scrolling for Anchor Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Active Navigation Link on Scroll
// ===================================
const sections = document.querySelectorAll('section[id]');

function activateNavOnScroll() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            navLink.classList.add('active');
        }
    });
    
    // Set home as active if at top
    if (scrollY < 100) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        const homeLink = document.querySelector('.nav-link[href="#"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }
}

window.addEventListener('scroll', activateNavOnScroll);

// ===================================
// Header Background Change on Scroll
// ===================================
const header = document.querySelector('.header');

function changeHeaderOnScroll() {
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(26, 26, 26, 1)';
    } else {
        header.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
    }
}

window.addEventListener('scroll', changeHeaderOnScroll);

// ===================================
// Contact Form Submission
// ===================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString()
        };
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Success message
            alert('شكراً لتواصلك معنا! سنقوم بالرد عليك في أقرب وقت ممكن.');
            
            // Reset form
            contactForm.reset();
            
            // Restore button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            
            // Log form data (for testing - remove in production)
            console.log('Form Data:', formData);
        }, 1500);
        
        // In production, replace the setTimeout with actual API call:
        /*
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                alert('شكراً لتواصلك معنا! سنقوم بالرد عليك في أقرب وقت ممكن.');
                contactForm.reset();
            } else {
                alert('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.');
            }
        } catch (error) {
            alert('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.');
            console.error('Error:', error);
        } finally {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
        */
    });
}

// ===================================
// Animations on Scroll (Fade In)
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .service-card, .about-content, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===================================
// Phone Number Validation (Saudi Format)
// ===================================
const phoneInput = document.getElementById('phone');

if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        // Limit to 10 digits for Saudi numbers
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        
        // Format: 05X XXX XXXX
        if (value.length > 3 && value.length <= 6) {
            value = value.slice(0, 3) + ' ' + value.slice(3);
        } else if (value.length > 6) {
            value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6);
        }
        
        e.target.value = value;
    });
    
    phoneInput.addEventListener('blur', (e) => {
        const value = e.target.value.replace(/\D/g, '');
        
        // Validate Saudi phone number format
        if (value.length > 0 && (value.length !== 10 || !value.startsWith('05'))) {
            phoneInput.setCustomValidity('يرجى إدخال رقم هاتف سعودي صحيح (05XXXXXXXX)');
        } else {
            phoneInput.setCustomValidity('');
        }
    });
}

// ===================================
// Scroll to Top Button (Optional)
// ===================================
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.setAttribute('aria-label', 'العودة للأعلى');
document.body.appendChild(scrollToTopBtn);

// Add styles for scroll to top button
const scrollToTopStyles = document.createElement('style');
scrollToTopStyles.textContent = `
    .scroll-to-top {
        position: fixed;
        bottom: 30px;
        left: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 20px;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
    
    .scroll-to-top.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .scroll-to-top:hover {
        background-color: var(--secondary-color);
        color: var(--dark-color);
        transform: translateY(-5px);
    }
`;
document.head.appendChild(scrollToTopStyles);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Scroll to top on click
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Prevent Form Resubmission on Page Reload
// ===================================
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

console.log('🌟 Iron Cool AC Services - Website Loaded Successfully!');