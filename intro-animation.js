// intro-animation.js

(function() {
    // Only run if GSAP is loaded
    if (typeof gsap === 'undefined') return;

    // Don't run splash screen if they've already seen it recently (optional)
    // For now, let's run it every time or based on session storage.
    if (sessionStorage.getItem('splashSeen')) {
        // Just fade in body instantly
        document.body.classList.add('loaded');
        return;
    }

    document.body.classList.add('splash-active');

    // Create Splash Screen HTML using the custom raster images
    const splashHTML = `
        <div id="splash-screen">
            <div class="splash-logo-container" style="position: relative; width: 300px; height: 300px; display: flex; align-items: center; justify-content: center;">
                <img id="splash-se-group" src="assets/images/transparent_se_no_sun.png" alt="SE Base" style="position: absolute; width: 100%; height: 100%; object-fit: contain;">
                
                <!-- The sun image now contains ONLY the sun pixels, flawlessly isolated via Python Hue filtering! -->
                <img id="splash-sun-group" src="assets/images/isolated_sun.png" alt="SE Sun" style="position: absolute; width: 100%; height: 100%; object-fit: contain;">
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', splashHTML);

    const tl = gsap.timeline();

    // Initial Setup
    // Sun starts off-screen (moved left and down), scaled down, and rotated
    gsap.set('#splash-sun-group', { x: -80, y: 50, opacity: 0, scale: 0.5, transformOrigin: "75% 25%" });
    // SE base starts slightly scaled down and invisible
    gsap.set('#splash-se-group', { scale: 0.8, opacity: 0, transformOrigin: "center center" });

    // Step 1: Reveal 'SE' base
    tl.to('#splash-se-group', { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' })
      
      // Step 2: Animate Sun swooping perfectly into its spot!
      .to('#splash-sun-group', { 
          x: 0, 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          rotation: 360,
          duration: 1.5, 
          ease: 'back.out(1.5)' 
      }, "+=0.2")

      // Step 3: Glow Effect
      .add(() => {
          document.querySelector('.splash-logo-container').classList.add('splash-glow-active');
      }, "+=0.3")
      
      // Wait a moment for the glow to be admired
      .to({}, { duration: 1.0 })

      // Step 4: Fly to Header!
      .add(() => {
          const headerLogo = document.querySelector('header .brand-logo-img');
          const splashContainer = document.querySelector('.splash-logo-container');
          
          if (headerLogo && splashContainer) {
              const headerRect = headerLogo.getBoundingClientRect();
              const splashRect = splashContainer.getBoundingClientRect();
              
              // Calculate difference
              const deltaX = headerRect.left - splashRect.left + (headerRect.width / 2) - (splashRect.width / 2);
              const deltaY = headerRect.top - splashRect.top + (headerRect.height / 2) - (splashRect.height / 2);
              const scale = headerRect.height / splashRect.height; // Scale down to match header logo height

              gsap.to('.splash-logo-container', {
                  x: deltaX,
                  y: deltaY,
                  scale: scale * 0.8, // Slightly smaller to match visual weight
                  opacity: 0, // Crossfade out as it lands
                  duration: 1.2,
                  ease: 'power3.inOut'
              });
          }
      })
      
      // Fade out the black overlay to reveal the site
      .to('#splash-screen', { 
          opacity: 0, 
          duration: 1.2, 
          ease: 'power2.inOut' 
      }, "<0.2") // Start slightly after the fly animation begins

      // Final State
      .add(() => {
          document.getElementById('splash-screen').remove();
          document.body.classList.remove('splash-active');
          document.body.classList.add('loaded'); // Triggers the rest of the site animations
          sessionStorage.setItem('splashSeen', 'true');
      });
})();
