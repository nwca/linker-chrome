
    window.addEventListener('WebComponentsReady', function() {
      scope.getIconNames = function(iconset) {
        return iconset.getIconNames();
      };
      scope.parentNode.getIconNames = scope.getIconNames;
      iconsetRepeat.items = new Polymer.IronMeta({type: 'iconset'}).list;
    });
  