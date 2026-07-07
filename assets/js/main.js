/* iPortfolio-style theme behaviours (reconstructed) */
(function () {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  const on = (type, el, listener, all = false) => {
    const els = select(el, all);
    if (!els) return;
    if (all) els.forEach((e) => e.addEventListener(type, listener));
    else els.addEventListener(type, listener);
  };

  const onscroll = (el, listener) => el.addEventListener("scroll", listener);

  /* Mobile nav toggle */
  on("click", ".mobile-nav-toggle", function () {
    const header = select("#header");
    header.classList.toggle("header-show");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /* Navbar links active state on scroll */
  const navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    const position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      const section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /* Smooth scroll for .scrollto links */
  const scrollto = (el) => {
    const element = select(el);
    if (!element) return;
    window.scrollTo({ top: element.offsetTop, behavior: "smooth" });
  };

  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();
        const header = select("#header");
        if (header && header.classList.contains("header-show")) {
          header.classList.remove("header-show");
          const toggle = select(".mobile-nav-toggle");
          if (toggle) {
            toggle.classList.toggle("bi-list");
            toggle.classList.toggle("bi-x");
          }
        }
        scrollto(this.hash);
      }
    },
    true
  );

  window.addEventListener("load", () => {
    if (window.location.hash && select(window.location.hash)) {
      scrollto(window.location.hash);
    }
  });

  /* Back to top button */
  const backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) backtotop.classList.add("active");
      else backtotop.classList.remove("active");
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
    backtotop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* Typed.js */
  const typed = select(".typed");
  if (typed && typeof Typed !== "undefined") {
    let items = typed.getAttribute("data-typed-items");
    items = items.split(",");
    new Typed(".typed", {
      strings: items,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  /* Animate skill progress bars when scrolled into view */
  const skillsAnimation = () => {
    select(".skills-content", true).forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        item.querySelectorAll(".progress-bar").forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      }
    });
  };
  window.addEventListener("load", skillsAnimation);
  onscroll(document, skillsAnimation);

  /* Portfolio isotope and filter */
  window.addEventListener("load", () => {
    const portfolioContainer = select(".portfolio-container");
    if (portfolioContainer && typeof Isotope !== "undefined") {
      const initIso = () => {
        const iso = new Isotope(portfolioContainer, {
          itemSelector: ".portfolio-item",
          layoutMode: "fitRows",
        });
        const filters = select("#portfolio-flters li", true);
        on(
          "click",
          "#portfolio-flters li",
          function (e) {
            e.preventDefault();
            filters.forEach((el) => el.classList.remove("filter-active"));
            this.classList.add("filter-active");
            iso.arrange({ filter: this.getAttribute("data-filter") });
          },
          true
        );
      };
      if (typeof imagesLoaded !== "undefined") {
        imagesLoaded(portfolioContainer, initIso);
      } else {
        initIso();
      }
    }
  });

  /* GLightbox */
  if (typeof GLightbox !== "undefined") {
    GLightbox({ selector: ".portfolio-lightbox" });
  }

  /* AOS */
  window.addEventListener("load", () => {
    if (typeof AOS !== "undefined") {
      AOS.init({ duration: 1000, easing: "ease-in-out", once: true, mirror: false });
    }
  });
})();
