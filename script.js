// script.js

document.addEventListener("DOMContentLoaded", () => {
    // Terminal Typing Effect Data
    const terminalBody = document.getElementById("hero-terminal");
    
    const lines = [
        { text: "Initializing secure connection...", delay: 500, style: "muted" },
        { text: "Authentication successful.", delay: 800, style: "success" },
        { text: "Loading profile data...", delay: 1200, style: "muted" },
        { text: " ", delay: 1400, style: "" },
        { text: "NAME   : Rakshit Prinja", delay: 1600, style: "output" },
        { text: "ROLE   : Aspiring Cybersecurity Professional", delay: 1800, style: "output highlight" },
        { text: "CERT   : CompTIA Security+", delay: 2100, style: "output highlight" },
        { text: "AREAS  : Networking | Web | System Security", delay: 2400, style: "output" },
        { text: "STATUS : Exploring Offensive & Defensive Security", delay: 2700, style: "output" }
    ];

    let currentLine = 0;

    function createTypewriterLine(lineObj) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const lineElement = document.createElement("div");
                lineElement.className = `terminal-line ${lineObj.style}`;
                terminalBody.appendChild(lineElement);

                // Typewriter effect for text
                let charIndex = 0;
                const typingInterval = setInterval(() => {
                    lineElement.innerHTML += lineObj.text.charAt(charIndex);
                    charIndex++;
                    if (charIndex >= lineObj.text.length) {
                        clearInterval(typingInterval);
                        resolve();
                    }
                }, 30); // typing speed
            }, lineObj.delay - (currentLine > 0 ? lines[currentLine-1].delay : 0));
        });
    }

    async function runTerminalSequence() {
        for (let i = 0; i < lines.length; i++) {
            currentLine = i;
            await createTypewriterLine(lines[i]);
        }
        
        // Add a blinking cursor at the end
        const cursorLine = document.createElement("div");
        cursorLine.className = "terminal-line";
        cursorLine.innerHTML = `<span class="prompt">rakshit@soc:~$</span> <span class="blink">_</span>`;
        terminalBody.appendChild(cursorLine);
    }

    runTerminalSequence();

    // Skills Filter Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });

    // Scroll Reveal Animation Setup
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // More lenient threshold
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Grab elements to animate
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(sec => {
        sec.classList.add('hidden-scroll');
        observer.observe(sec);
    });

    // Fallback: Force reveal all sections after 3 seconds if they haven't appeared
    // This handles edge cases where the observer might not trigger correctly
    setTimeout(() => {
        sections.forEach(sec => {
            if (!sec.classList.contains('visible')) {
                sec.classList.add('visible');
            }
        });
    }, 3000);
});
