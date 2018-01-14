

    suite('basic', function() {

      test('byKey', function() {
        var meta = new Polymer.IronMeta({
          key: 'info'
        });

        expect(meta.value).to.be.eql('foo/bar');
      });

      test('list', function() {
        assert.equal(document.querySelector('iron-meta').list.length, 1);
      });

      test('constructor with no arguments', function() {
        expect(function() {
          new Polymer.IronMeta();
        }).to.not.throw();
      });

    });

  