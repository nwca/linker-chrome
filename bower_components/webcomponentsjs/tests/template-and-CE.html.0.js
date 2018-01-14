
      var created = [];
      var attached = [];
      var childCreated = false;
      var foundTemplate = false;

      class XChild extends HTMLElement {
        constructor() {
          super();
          this.custom = true;
          childCreated = true;
        }
      }

      class XAfter extends HTMLElement {
        constructor() {
          super();
          this.custom = true;

          var template = document.querySelector('#before');
          if (template && template.content) {
            foundTemplate = true;
          }
        }
      }

      window.customElements.define('x-child', XChild);
      window.customElements.define('x-after', XAfter);

      suite('template and custom elements', function() {
        test('elements within templates not upgraded', function() {
          assert(!childCreated);
        });

        test('templates before elements are bootstrapped before createdCallback', function() {
          assert(foundTemplate);
        });
      });
    