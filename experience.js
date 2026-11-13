const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');

if (!motionPreference.matches) {
  import('https://cdn.jsdelivr.net/npm/locomotive-scroll@5.0.1/+esm')
    .then(({ default: LocomotiveScroll }) => {
      if (motionPreference.matches) return;

      const scrolling = new LocomotiveScroll({
        lenisOptions: { smoothWheel: true, syncTouch: false, lerp: 0.12 },
      });
      motionPreference.addEventListener('change', () => scrolling.destroy(), { once: true });
    })
    .catch(() => {
      // Native scrolling remains available if the library cannot load.
    });

  import('https://cdn.jsdelivr.net/npm/motion@12.23.24/+esm')
    .then(({ animate, inView }) => {
      window.motionReady = true;
      inView('[data-reveal]', (element) => {
        if (motionPreference.matches || element.classList.contains('has-entered')) return;

        element.classList.add('motion-entered');
        const delay = parseFloat(getComputedStyle(element).getPropertyValue("--reveal-delay")) || 0;
        const animation = animate(
          element,
          { opacity: [0.55, 1], y: [16, 0] },
          { duration: 0.65, delay, ease: [0.2, 0.7, 0.3, 1] },
        );
        motionPreference.addEventListener('change', () => animation.complete(), { once: true });
      }, { amount: 0.12 });
    })
    .catch(() => {
      // The page's CSS reveals remain available if Motion cannot load.
    });
}


