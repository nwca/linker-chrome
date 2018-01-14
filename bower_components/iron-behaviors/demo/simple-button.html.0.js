

    Polymer({

      is: 'simple-button',

      behaviors: [
        Polymer.IronControlState,
        Polymer.IronButtonState
      ],

      hostAttributes: {
        role: 'button'
      }
    });

  