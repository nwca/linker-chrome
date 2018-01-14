
      suite('Promise', () => {
        test('Promise exists', () => {
          assert(window.Promise);
        });
        test('resolve', () => {
          return Promise.resolve('hi!');
        });
        test('reject', () => {
          return Promise.reject('foo').then(() => {throw 'nope!'}, () => {});
        });
        test('race', () => {
          return Promise.race([Promise.resolve(), Promise.resolve()]);
        });
        test('all', () => {
          return Promise.all([Promise.resolve(), Promise.resolve()]);
        });
        test('catch', () => {
          return Promise.reject('nope!').catch(() => {});
        });
        test('then', () => {
          return Promise.resolve().then(() => {});
        });
      })
    