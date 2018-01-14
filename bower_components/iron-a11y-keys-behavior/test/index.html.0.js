
      // Load and run all tests (.html, .js) as one suite:
      WCT.loadSuites([
        'basic-test.html?wc-shadydom=true&wc-ce=true', //shady
        'basic-test.html?dom=shadow' //shadow
      ]);
    