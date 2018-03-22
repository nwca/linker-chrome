class CSending extends Polymer.Element {

   static get is() {
      return 'checked-sending'
   }

   static get properties() {
      return {
         flag: {
            type: Boolean,
            value: null
         },
         status: {
            type: Boolean,
            value: null
         }
      }
   }
}

customElements.define(CSending.is, CSending);
