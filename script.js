document.addEventListener('DOMContentLoaded', () => {
    // Scroll reveal animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2
    });

    document.querySelectorAll('.appear-scroll').forEach((el) => {
        observer.observe(el);
    });

    // Confetti effect
    const btn = document.getElementById('lets-go-btn');
    const container = document.getElementById('confetti-container');

    const colors = ['#2563eb', '#60a5fa', '#f472b6', '#ffffff', '#3b82f6'];

    btn.addEventListener('click', () => {
        createConfetti();
        btn.textContent = "Yay!! 🎉";
        btn.style.transform = "scale(1.1)";
        setTimeout(() => {
            btn.textContent = "Let's Go! ✨";
            btn.style.transform = "scale(1)";
        }, 2000);
        
        // Smooth scroll to the itinerary
        document.querySelector('.timeline-container').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });

    function createConfetti() {
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            // Random properties
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const size = Math.random() * 8 + 6;
            const animDuration = Math.random() * 3 + 2;
            const animDelay = Math.random() * 0.5;
            
            // Apply styles
            confetti.style.backgroundColor = color;
            confetti.style.left = left + 'vw';
            confetti.style.top = '-10px';
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            
            // Animation
            confetti.animate([
                { transform: `translate3d(0,0,0) rotate(0deg)`, opacity: 1 },
                { transform: `translate3d(${Math.random() * 200 - 100}px, 100vh, 0) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ], {
                duration: animDuration * 1000,
                delay: animDelay * 1000,
                easing: 'cubic-bezier(.37,0,.63,1)',
                fill: 'forwards'
            });

            container.appendChild(confetti);

            // Cleanup
            setTimeout(() => {
                confetti.remove();
            }, (animDuration + animDelay) * 1000);
        }
    }
});
