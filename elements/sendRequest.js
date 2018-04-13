class SendRequest extends Polymer.Element {

    static get is() {
        return 'send-request'
    }

    static get properties() {
        return {
            url: {
                type: String,
                notify: true,
            }
        }
    }

    handle(e){

    }

}

customElements.define(SendRequest.is, SendRequest);
