/* ==========================================================================
   Interaksi bersama untuk tiga mockup.

   Semua efek dibuat dengan Web Animations / IntersectionObserver, bukan
   library. Alasan: mockup harus bisa dibuka langsung dari file:// tanpa
   server, dan meniru library (AOS, slick, GSAP) untuk tujuan tampilan tidak
   sepadan dengan beratnya.
   ========================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. reveal saat masuk viewport ---------- */
  function initReveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    if (!els.length) return;

    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 2. header: latar muncul setelah scroll ---------- */
  function initHeader() {
    var hdr = document.querySelector('.hdr');
    if (!hdr) return;
    var onScroll = function () {
      hdr.classList.toggle('scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- 3. menu overlay: generik untuk tiga varian ---------- */
  function initMenu() {
    var openers = document.querySelectorAll('[data-menu-open]');
    var overlay = document.querySelector('[data-menu-overlay]');
    if (!overlay || !openers.length) return;

    var closers = overlay.querySelectorAll('[data-menu-close]');
    var lastFocus = null;

    function open() {
      lastFocus = document.activeElement;
      overlay.classList.add('is-open');
      overlay.removeAttribute('aria-hidden');
      document.body.style.overflow = 'hidden';
      openers.forEach(function (b) { b.setAttribute('aria-expanded', 'true'); });
      var first = overlay.querySelector('a, button');
      if (first) first.focus();
    }
    function close() {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      openers.forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
      if (lastFocus) lastFocus.focus();
    }

    openers.forEach(function (b) {
      b.addEventListener('click', function () {
        if (overlay.classList.contains('is-open')) close();
        else open();
      });
    });
    closers.forEach(function (b) { b.addEventListener('click', close); });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
    });

    // klik di area kosong overlay menutup
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });
  }

  /* ---------- 4. carousel: panah + dot + swipe ---------- */
  function initCarousel() {
    document.querySelectorAll('[data-carousel]').forEach(function (root) {
      var track = root.querySelector('[data-carousel-track]');
      if (!track) return;
      var slides = Array.prototype.slice.call(track.children);
      if (!slides.length) return;

      var prev = root.querySelector('[data-carousel-prev]');
      var next = root.querySelector('[data-carousel-next]');
      var dotsWrap = root.querySelector('[data-carousel-dots]');
      var counter = root.querySelector('[data-carousel-counter]');
      var index = 0;

      var dots = [];
      if (dotsWrap) {
        slides.forEach(function (_, i) {
          var d = document.createElement('button');
          d.type = 'button';
          d.className = 'car-dot';
          d.setAttribute('aria-label', 'Go to step ' + (i + 1));
          d.addEventListener('click', function () { go(i); });
          dotsWrap.appendChild(d);
          dots.push(d);
        });
      }

      function go(i) {
        index = (i + slides.length) % slides.length;
        track.style.transform = 'translateX(' + (-index * 100) + '%)';
        track.style.transition = reduced ? 'none' : 'transform .62s cubic-bezier(.4,0,.2,1)';
        dots.forEach(function (d, k) { d.classList.toggle('on', k === index); });
        if (counter) {
          counter.textContent =
            String(index + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
        }
        slides.forEach(function (s, k) {
          s.setAttribute('aria-hidden', k === index ? 'false' : 'true');
        });
      }

      if (prev) prev.addEventListener('click', function () { go(index - 1); });
      if (next) next.addEventListener('click', function () { go(index + 1); });

      // swipe
      var x0 = null;
      root.addEventListener('touchstart', function (e) {
        x0 = e.touches[0].clientX;
      }, { passive: true });
      root.addEventListener('touchend', function (e) {
        if (x0 === null) return;
        var dx = e.changedTouches[0].clientX - x0;
        if (Math.abs(dx) > 46) go(index + (dx < 0 ? 1 : -1));
        x0 = null;
      }, { passive: true });

      // keyboard
      root.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') { go(index - 1); e.preventDefault(); }
        if (e.key === 'ArrowRight') { go(index + 1); e.preventDefault(); }
      });

      go(0);
    });
  }

  /* ---------- 5. proses bertahap (Ricey "The Process") ---------- */
  function initSteps() {
    document.querySelectorAll('[data-steps]').forEach(function (root) {
      var items = Array.prototype.slice.call(root.querySelectorAll('[data-step]'));
      var panelTitle = root.querySelector('[data-step-title]');
      var panelText = root.querySelector('[data-step-text]');
      var panelNum = root.querySelector('[data-step-num]');
      var bar = root.querySelector('[data-step-bar]');
      if (!items.length || !panelText) return;

      var i = 0;
      var timer = null;
      var autoplay = !reduced;

      function show(k, fromUser) {
        i = (k + items.length) % items.length;
        items.forEach(function (el, n) {
          el.classList.toggle('on', n === i);
          el.setAttribute('aria-current', n === i ? 'step' : 'false');
        });
        var el = items[i];
        if (panelNum) panelNum.textContent = String(i + 1).padStart(2, '0');
        if (panelTitle) panelTitle.textContent = el.dataset.title || '';
        panelText.textContent = el.dataset.text || '';
        if (bar) bar.style.width = ((i + 1) / items.length * 100) + '%';
        if (fromUser) restart();
      }

      function restart() {
        if (timer) clearInterval(timer);
        if (!autoplay) return;
        timer = setInterval(function () { show(i + 1); }, 5200);
      }

      items.forEach(function (el, n) {
        el.addEventListener('click', function () { show(n, true); });
        el.addEventListener('mouseenter', function () { show(n, true); });
      });

      var prev = root.querySelector('[data-step-prev]');
      var next = root.querySelector('[data-step-next]');
      if (prev) prev.addEventListener('click', function () { show(i - 1, true); });
      if (next) next.addEventListener('click', function () { show(i + 1, true); });

      show(0);
      restart();
    });
  }

  /* ---------- 6. floating buttons: muncul setelah scroll ---------- */
  function initFloating() {
    var wrap = document.querySelector('[data-floating]');
    if (!wrap) return;
    var onScroll = function () {
      wrap.classList.toggle('is-visible', window.scrollY > 320);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    var up = wrap.querySelector('[data-scroll-top]');
    if (up) {
      up.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
      });
    }
  }

  /* ---------- 7. counter angka ---------- */
  function initCounters() {
    var els = document.querySelectorAll('[data-count]');
    if (!els.length) return;

    // Mode statis / reduced-motion: langsung set nilai akhir.
    // Animasi rAF tidak berjalan andal di render headless, dan angka 0
    // yang tertangkap screenshot akan menyesatkan.
    var still = document.documentElement.classList.contains('still');
    if (reduced || still || !('IntersectionObserver' in window)) {
      els.forEach(function (el) {
        el.textContent = el.dataset.count + (el.dataset.suffix || '');
      });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var target = parseFloat(el.dataset.count);
        var suffix = el.dataset.suffix || '';
        var dur = 1100, t0 = null;
        function tick(t) {
          if (t0 === null) t0 = t;
          var p = Math.min(1, (t - t0) / dur);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 8. tahun berjalan ---------- */
  function initYear() {
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---------- 9. mode statis untuk screenshot ---------- */
  // ?still=1 -> matikan transisi & tampilkan semua, supaya render headless
  // menangkap konten penuh (sama seperti menunggu pengguna scroll manual).
  function initStill() {
    var still = /(\?|&)still=1/.test(location.search);
    if (still || navigator.webdriver) {
      document.documentElement.classList.add('still');
    }
  }

  function boot() {
    initStill();
    initReveal();
    initHeader();
    initMenu();
    initCarousel();
    initSteps();
    initFloating();
    initCounters();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
