
      window.addEventListener('WebComponentsReady', function() {
        Polymer({
          is: 'iron-ajax-demo',

          url: function(videoId) {
            return 'https://www.youtube.com/watch?v=' + videoId;
          }
        });
      })
    