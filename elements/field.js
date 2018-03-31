class XField extends Polymer.Element {

   static get is() {
      return 'x-field'
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
         autoKey: {
            type: String,
            computed: 'computeFullUrl(base, apiV1)'
         },
         key: {
            type: String,
            notify: true
         },
         value: {
            type: String,
            notify: true
         }
      }
   }

   computeFullUrl(base, apiV1) {
      return base + apiV1 + "preds?q=";
   }

   _delete(e) {
      this.dispatchEvent(new CustomEvent('delete'));
   }

}

customElements.define(XField.is, XField);
