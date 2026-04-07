/* ================================================
   Surendra Bhujel — Portfolio JavaScript
   Interactions, animations, smooth scroll
   ================================================ */

(function () {
    "use strict";

    // ——— Preloader ———
    window.addEventListener("load", () => {
        const preloader = document.getElementById("preloader");
        if (preloader) {
            setTimeout(() => preloader.classList.add("hidden"), 600);
        }
    });

    // ——— Custom Cursor Glow ———
    const glow = document.getElementById("cursor-glow");
    if (glow && window.matchMedia("(hover:hover)").matches) {
        document.addEventListener("mousemove", (e) => {
            glow.style.left = e.clientX + "px";
            glow.style.top = e.clientY + "px";
        });
    }

    // ——— Navbar scroll state ———
    const navbar = document.getElementById("navbar");
    const onScroll = () => {
        if (window.scrollY > 60) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ——— Mobile nav toggle ———
    const navToggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");
    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            navToggle.classList.toggle("open");
            navLinks.classList.toggle("open");
        });
        // Close menu on link click
        navLinks.querySelectorAll(".nav-link").forEach((link) => {
            link.addEventListener("click", () => {
                navToggle.classList.remove("open");
                navLinks.classList.remove("open");
            });
        });
    }

    // ——— Active nav link on scroll ———
    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-link[data-section]");
    const highlightNav = () => {
        let current = "";
        sections.forEach((sec) => {
            const top = sec.offsetTop - 120;
            if (window.scrollY >= top) current = sec.id;
        });
        navItems.forEach((item) => {
            item.classList.toggle("active", item.dataset.section === current);
        });
    };
    window.addEventListener("scroll", highlightNav, { passive: true });

    // ——— Typing Effect ———
    const typedEl = document.getElementById("typed-text");
    const words = ["Web Developer.", "IT Undergraduate.", "Tech Support Enthusiast.", "Problem Solver."];
    let wordIdx = 0;
    let charIdx = 0;
    let deleting = false;
    const typeSpeed = 90;
    const deleteSpeed = 50;
    const pauseEnd = 1800;
    const pauseDel = 400;

    function typeWriter() {
        if (!typedEl) return;
        const current = words[wordIdx];
        if (!deleting) {
            typedEl.textContent = current.substring(0, charIdx + 1);
            charIdx++;
            if (charIdx === current.length) {
                deleting = true;
                setTimeout(typeWriter, pauseEnd);
                return;
            }
            setTimeout(typeWriter, typeSpeed);
        } else {
            typedEl.textContent = current.substring(0, charIdx - 1);
            charIdx--;
            if (charIdx === 0) {
                deleting = false;
                wordIdx = (wordIdx + 1) % words.length;
                setTimeout(typeWriter, pauseDel);
                return;
            }
            setTimeout(typeWriter, deleteSpeed);
        }
    }
    typeWriter();

    // ——— Scroll Reveal (data-aos) ———
    const revealEls = document.querySelectorAll("[data-aos]");
    const reveal = () => {
        const trigger = window.innerHeight * 0.88;
        revealEls.forEach((el) => {
            const top = el.getBoundingClientRect().top;
            if (top < trigger) el.classList.add("visible");
        });
    };
    window.addEventListener("scroll", reveal, { passive: true });
    reveal(); // initial check

    // ——— Counter Animation (About stats) ———
    const counters = document.querySelectorAll("[data-count]");
    let counterDone = false;
    const animateCounters = () => {
        if (counterDone) return;
        counters.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9) {
                counterDone = true;
                const target = +el.dataset.count;
                let current = 0;
                const step = Math.ceil(target / 40);
                const interval = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(interval);
                    }
                    el.textContent = current;
                }, 35);
            }
        });
    };
    window.addEventListener("scroll", animateCounters, { passive: true });

    // ——— Skill-bar fill on scroll ———
    const skillFills = document.querySelectorAll(".skill-fill");
    let skillsDone = false;
    const fillSkills = () => {
        if (skillsDone) return;
        skillFills.forEach((bar) => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.92) {
                skillsDone = true;
                bar.style.width = bar.dataset.percent + "%";
            }
        });
    };
    window.addEventListener("scroll", fillSkills, { passive: true });
    fillSkills();

    // ——— Contact Form (toast feedback) ———
    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            showToast("Thanks for reaching out! I'll get back to you soon 🚀");
            form.reset();
        });
    }

    function showToast(msg) {
        let toast = document.querySelector(".toast");
        if (!toast) {
            toast = document.createElement("div");
            toast.className = "toast";
            document.body.appendChild(toast);
        }
        toast.textContent = msg;
        requestAnimationFrame(() => {
            toast.classList.add("show");
            setTimeout(() => toast.classList.remove("show"), 3500);
        });
    }

    // ——— Back to Top ———
    const topBtn = document.getElementById("backToTop");
    if (topBtn) {
        topBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
})();
