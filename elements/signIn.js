class SignIn extends Polymer.Element {

   static get is() {
      return 'sign-in'
   }

   static get properties() {
      return {
          base: {
              type: String,
              value: "https://linker-nw.appspot.com"
          },
         userAvatar: {
            type: String,
            value: null,
            notify: true
         },
          loggedIn: {
              type: Boolean,
              value: false,
              notify: true
          },
         providers: {
            type: Array,
            value: function () {
               return [];
            }
         }
      }
   }

   constructor() {
      super();
   }

   static get observers() {
      return ['_infoUser(userAvatar)']
   }

   _infoUser(userAvatar) {
   }

   currentUser(e) {
      if (e.detail.response.data !== null) {
          this.dispatchEvent(new CustomEvent('picture',
              {detail:
                  {
                      picture: e.detail.response.data.picture
                  }}));
         this.userAvatar = e.detail.response.data.picture;
         this.loggedIn = true;
      }
   }

   getProviders(e) {
      let resProv = e.detail.response.data;
      const providers = Object.keys(resProv)
         .map(key => ({
            id: resProv.id,
            login_url: resProv.login_url
         }));
      this.push('providers', ...resProv);
   }

   signIn(e) {
      let target = e.model;
      let index = this.providers.indexOf(target.get('item'));
      chrome.tabs.create({url: this.base+this.providers[index].login_url});
   };
}

customElements.define(SignIn.is, SignIn);
