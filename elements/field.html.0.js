
    Polymer({
      is:'x-field',
      properties: {
          key: {
              type: String,
              notify: true
          },
          value: {
              type: String,
              notify: true
          }
      },
        delete: function () {
          this.fire('delete');
        }
    });
