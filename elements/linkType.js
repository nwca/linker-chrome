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
            value: "http://localhost:8080"
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
