class SignIn extends Polymer.Element {

    static get is() {
        return 'sign-in'
    }

    static get properties() {
        return {
            provId: {
                type: String,
                notify: true
            },
            provImg: {
                type: String,
                notify: true
            }
        }
    }

    constructor() {
        super();
    }
    failedLoadImage(e) {
        this.src= "/img/login-unrecognized.png"
    }

    _sign(e) {
        this.dispatchEvent(new CustomEvent('sign'));
    }
}

customElements.define(SignIn.is, SignIn);