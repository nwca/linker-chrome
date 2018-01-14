
    suite('Force polyfill', function() {
      test('expected boot', function() {
        assert.equal(window.webComponentsReadyCount, 1, 'failed to fire WebComponentsReady');
      });
    });
  