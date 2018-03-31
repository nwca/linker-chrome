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
         apiV1: {
            type: String,
            value: "/api/v1/"
         },
         signInUrl: {
            type: String,
            computed: 'computeFullSignUrl(base, apiV1)'
         },
         getUser: {
            type: String,
            computed: 'computeGetUser(base, apiV1)'
         },
         loggedIn: {
            type: Boolean,
            value: false,
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

   computeFullSignUrl(base, apiV1) {
      return base + apiV1 + "auth/providers"
   }

   computeGetUser(base, apiV1) {
      return base + apiV1 + "me"
   }

   currentUser(e) {
      if (e.detail.response.data !== null) {
         this.loggedIn = !this.loggedIn;
         this.userAvatar = e.detail.response.data.picture;
      }
   }

   getProviders(e) {
      var resProv = e.detail.response.data;
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
