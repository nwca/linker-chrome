
    window.ShadyDOM = {
      force: true
    };
    if (window.customElements) customElements.forcePolyfill = true;
    window.webComponentsReadyCount = 0;
    window.addEventListener('WebComponentsReady', function() {
      window.webComponentsReadyCount++;
    });
  