// Tilt effect on card-inner
document.querySelectorAll("[data-tilt]").forEach(card => {
    const inner = card.querySelector(".card-inner");

    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((x - centerX) / centerX) * 10;
        inner.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => {
        inner.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    });
});

// Fade-in on scroll (with initial load check)
const cards = document.querySelectorAll(".card");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = "running";
        }
    });
}, { threshold: 0.1 });

cards.forEach(card => {
    card.style.animationPlayState = "paused";
    observer.observe(card);

    // Trigger animation immediately if already visible
    if (card.getBoundingClientRect().top < window.innerHeight) {
        card.style.animationPlayState = "running";
    }
});
