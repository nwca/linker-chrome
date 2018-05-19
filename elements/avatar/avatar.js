class UserAvatar extends Polymer.Element {

   static get is() {
      return 'user-avatar'
   }

   static get properties() {
      return {
         avatar: {
            type: String,
            notify: true
         }
      }
   }


}

customElements.define(UserAvatar.is, UserAvatar);
