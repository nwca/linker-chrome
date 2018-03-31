class LType extends Polymer.Element {

   static get is() {
      return 'link-type'
   }

   static get properties() {
      return {
         ltype: {
            type: String,
            value: null,
            notify: true,
         },
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
      }
   }

   computeFullUrl(base, apiV1) {
      return base + apiV1 + "types";
   }

}

customElements.define(LType.is, LType);
