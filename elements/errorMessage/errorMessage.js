class EMessage extends Polymer.Element {

    static get is() {
        return 'error-message'
    }

    static get properties() {
        return {
            errorMessage: {
                type: String,
                notify: true
            }
        }
        }
    }

customElements.define(EMessage.is, EMessage);
