
    window.addEventListener('WebComponentsReady', function() {
      Polymer({
        is: 'meta-test',
        ready: function() {
          this.textContent = new Polymer.IronMeta({key: 'info'}).value;
        }
      });
    });

    Polymer({
      is: 'type-one',

      ready: function() {
        var resultList = new Polymer.IronMeta({type: "type1"}).list;
        this.textContent = JSON.stringify(resultList);
      }
    });

    Polymer({
      is: 'type-two',

      ready: function() {
        var resultList = new Polymer.IronMeta({type: "type2"}).list;
        this.textContent = JSON.stringify(resultList);
      }
    });

  