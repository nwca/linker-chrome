
      window.addEventListener('HTMLImportsLoaded', function() {
        window.importsOk = true;
      });
      window.webComponentsReadyCount = 0;
      document.addEventListener('WebComponentsReady', function() {
        window.webComponentsReadyCount++;
      });
    