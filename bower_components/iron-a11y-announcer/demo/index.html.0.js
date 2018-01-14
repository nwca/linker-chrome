
          window.addEventListener('WebComponentsReady', function() {
            // Initialize the announcer.
            Polymer.IronA11yAnnouncer.requestAvailability();

            // Optional; for testing, set the mode to assertive to announce immediately.
            Polymer.IronA11yAnnouncer.instance.mode = 'assertive';
          });

          function _announce() {
            Polymer.IronA11yAnnouncer.instance.fire('iron-announce', {
              text: input.value.trim()
            }, {
              bubbles: true
            });
          }
        