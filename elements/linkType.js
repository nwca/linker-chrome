class LType extends Polymer.Element {

    static get is() {
        return 'link-type'
    }

    static get properties() {
        return {
            ltype:{
                type: String,
                value: null,
                notify: true,
            }
        }
    }

}

customElements.define(LType.is, LType);
