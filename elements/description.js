class XDescription extends Polymer.Element {

    static get is() {
        return 'x-description'
    }

    static get properties() {
        return {
            description:{
                type: String,
                value: null,
                notify: true,
            }
        }
    }

}

customElements.define(XDescription.is, XDescription);
