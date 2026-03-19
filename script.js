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

    // Check-in Buttons Logic
    document.querySelectorAll('.check-in-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.glass-card');
            
            // Mark as completed
            card.classList.add('completed');
            e.target.textContent = '✅ Completed!';
            e.target.disabled = true;

            // Make some mini confetti originating from the button
            const rect = e.target.getBoundingClientRect();
            createMiniConfetti(rect.left + rect.width / 2, rect.top);
        });
    });

    function createMiniConfetti(x, y) {
        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 6 + 4;
            
            confetti.style.backgroundColor = color;
            confetti.style.left = x + 'px';
            confetti.style.top = y + 'px';
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            confetti.style.position = 'fixed'; // Ensure it's fixed to the viewport like the main confetti
            
            // Random directional velocity
            const tx = (Math.random() - 0.5) * 200;
            const ty = (Math.random() - 1) * 200;
            
            confetti.animate([
                { transform: `translate3d(0,0,0) rotate(0deg)`, opacity: 1 },
                { transform: `translate3d(${tx}px, ${ty}px, 0) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ], {
                duration: 1000 + Math.random() * 1000,
                easing: 'cubic-bezier(.37,0,.63,1)',
                fill: 'forwards'
            });

            container.appendChild(confetti);

            setTimeout(() => { confetti.remove(); }, 2000);
        }
    }

    // Magic Sparkle Cursor
    document.addEventListener('mousemove', (e) => {
        // Create one sparkle randomly to avoid overwhelming the DOM
        if (Math.random() > 0.4) return;
        
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        // Offset slightly to be right at the cursor pointer
        sparkle.style.left = (e.clientX - 3) + 'px';
        sparkle.style.top = (e.clientY - 3) + 'px';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => { sparkle.remove(); }, 1000);
    });

    // Easter Egg Logic
    const easterEgg = document.getElementById('secret-easter-egg');
    const modal = document.getElementById('treasure-modal');
    const closeBtn = document.getElementById('close-modal-btn');

    if(easterEgg && modal && closeBtn) {
        easterEgg.addEventListener('click', () => {
            // Massive confetti!
            createConfetti();
            setTimeout(createConfetti, 500); // double confetti 500ms later for extra celebration!
            
            // Show modal
            modal.classList.remove('hidden');
            
            // Hide the egg since it's found
            easterEgg.style.display = 'none';
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }
});
