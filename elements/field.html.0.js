class XField extends Polymer.Element {

    static get is() {
        return 'x-field'
    }

    static get properties() {
        return {
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

    _delete(e) {
        this.dispatchEvent(new CustomEvent('delete'));
    }

}

customElements.define(XField.is, XField);
