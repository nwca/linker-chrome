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
         loggedIn: {
            type: Boolean,
            value: null,
            notify: true
         },
         userAvatar: {
            type: String,
            value: null,
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
      return ['_infoUser(loggedIn, userAvatar)']
   }

   _infoUser(loggedIn, userAvatar) {
   }

   currentUser(e) {
       console.log(this.loggedIn)
      if (e.detail.response.data !== null) {
         this.loggedIn = true;
         this.userAvatar = e.detail.response.data.picture;
      } else {
         this.loggedIn = false;
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
