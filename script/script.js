// ===============================
// GSAP / SCROLL ANIMATIONS
// ===============================

if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.defaults({
    toggleActions: "play none none reverse"
  });

  gsap.to(".img-container", {
    scale: 52,
    ease: "ease",
    scrollTrigger: {
      trigger: ".video-section",
      scrub: 1,
      start: "top top",
      end: "bottom",
      pin: true
    }
  });

  gsap.to(".right", {
    autoAlpha: 0,
    x: 500,
    duration: 1.5,
    scrollTrigger: {
      start: 1
    }
  });

  gsap.to(".left", {
    autoAlpha: 0,
    x: -500,
    duration: 1.5,
    scrollTrigger: {
      start: 1
    }
  });

  gsap.to(".txt-bottom", {
    autoAlpha: 0,
    letterSpacing: -10,
    duration: 2,
    scrollTrigger: {
      start: 2
    }
  });

  const tl = gsap.timeline();

  tl.from(".left-side div", {
    y: 150,
    opacity: 0,
    stagger: {
      amount: 0.4
    },
    delay: 0.5
  })
    .from(".right-side", { opacity: 0, duration: 2 }, 0.5)
    .to(".wrapper", { x: -window.innerWidth });

  ScrollTrigger.create({
    animation: tl,
    trigger: ".wrapper",
    start: "top top",
    end: "+=600",
    scrub: 3,
    pin: true,
    ease: "ease"
  });

  if (window.innerWidth > 1024) {
    gsap.utils.toArray(".col").forEach((image) => {
      gsap.fromTo(
        image,
        {
          opacity: 0.3,
          x: 20
        },
        {
          opacity: 1,
          x: -10,
          scrollTrigger: {
            trigger: image,
            start: "-50%",
            stagger: {
              amount: 0.4
            }
          }
        }
      );
    });
  } else {
    gsap.utils.toArray(".col").forEach((image) => {
      gsap.fromTo(
        image,
        {
          opacity: 0.3,
          x: 0
        },
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: image,
            start: "-50%",
            stagger: {
              amount: 0.4
            }
          }
        }
      );
    });
  }

  const timeline = gsap.timeline();

  timeline
    .from(".title span", {
      y: 150,
      skewY: 7,
      duration: 3
    })
    .from(".txt-bottom", {
      letterSpacing: -10,
      opacity: 0,
      duration: 3
    });
}

// ===============================
// NAVBAR SCROLLED
// ===============================

(function () {
  const nav = document.querySelector(".navbar");
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle("navbar--scrolled", window.scrollY > 8);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();

// ===============================
// NAVBAR MOBILE
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const burguer = document.querySelector(".burguer");
  const menu = document.querySelector(".nav-menu-mobile div:nth-child(2)");

  if (burguer && menu) {
    burguer.addEventListener("click", () => {
      burguer.classList.toggle("active");
      menu.classList.toggle("open");
    });
  }
});


// ===============================
// SWIPER PROJECTS
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slider-wrapper");

  if (slider && typeof Swiper !== "undefined") {
    new Swiper(".slider-wrapper", {
      loop: true,
      grabCursor: true,
      spaceBetween: 30,

      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true
      },

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },

      breakpoints: {
        0: {
          slidesPerView: 1
        },
        768: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 3
        }
      }
    });
  }
});

// ===============================
// PROJECT CARDS MOBILE FLIP
// ===============================

(function () {
  const MOBILE_MAX_WIDTH = 500;

  let cards = [];
  let inners = [];
  let lastActiveIndex = -1;

  function collectCards() {
    cards = Array.from(document.querySelectorAll(".project-card"));
    inners = cards.map((card) => card.querySelector(".project-card-inner"));
  }

  function setActiveCard(index, isMobile) {
    if (index === lastActiveIndex) return;

    inners.forEach((inner, i) => {
      if (!inner) return;

      if (i === index && isMobile) {
        inner.style.transition = "transform 1.5s cubic-bezier(0.22, 0.61, 0.36, 1)";
        inner.classList.add("is-flipped");
      } else if (isMobile) {
        inner.style.transition = "transform 0.5s ease-out";
        inner.classList.remove("is-flipped");
      } else {
        inner.style.transition = "";
        inner.classList.remove("is-flipped");
      }
    });

    lastActiveIndex = index;
  }

  function handleScroll() {
    const isMobile = window.innerWidth <= MOBILE_MAX_WIDTH;

    if (!cards.length) return;

    if (!isMobile) {
      if (lastActiveIndex !== -1) setActiveCard(-1, false);
      return;
    }

    const viewportCenter = window.innerHeight / 2;
    let bestIndex = -1;
    let bestDist = Infinity;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const dist = Math.abs(cardCenter - viewportCenter);

      if (dist < bestDist) {
        bestDist = dist;
        bestIndex = index;
      }
    });

    if (bestIndex !== -1) setActiveCard(bestIndex, true);
  }

  function init() {
    collectCards();
    handleScroll();
  }

  window.addEventListener("load", init);
  window.addEventListener("resize", () => {
    collectCards();
    handleScroll();
  });
  window.addEventListener("scroll", handleScroll, { passive: true });
})();

// ===============================
// SKILLS REVEAL ANIMATION
// ===============================

document.addEventListener("DOMContentLoaded", function () {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  const cards = document.querySelectorAll(".skill-card");
  if (!cards.length) return;

  function setHiddenState() {
    gsap.set(cards, {
      opacity: 0,
      y: 70,
      x: () => gsap.utils.random(-40, 40),
      rotation: () => gsap.utils.random(-8, 8),
      scale: 0.9,
      transformOrigin: "center center"
    });
  }

  function playIn() {
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      x: 0,
      rotation: 0,
      scale: 1,
      ease: "expo.out",
      duration: 1.1,
      stagger: {
        each: 0.06,
        from: "center",
        ease: "power3.out"
      }
    });
  }

  setHiddenState();

  ScrollTrigger.create({
    trigger: ".skills-grid-wrapper",
    start: "top 80%",
    end: "bottom 20%",
    onEnter: () => playIn(),
    onEnterBack: () => playIn(),
    onLeave: () => setHiddenState(),
    onLeaveBack: () => setHiddenState()
  });
});