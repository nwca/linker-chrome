class SendRequest extends Polymer.Element {

    static get is() {
        return 'send-request'
    }

    static get properties() {
        return {
            method: {
                type: String,
                notify: true
            },
            base: {
                type: String,
                value: "https://linker-nw.appspot.com"
            },
            apiV1: {
                type: String,
                value: "/api/v1/"
            },
            path:{
                type: String,
                notify: true
            },
            authority: {
                type: String,
                computed: 'computeAuthority(base, apiV1, path)'
            },
            lastResponse: {
                type: Object,
                notify: true
            },
            debounceDuration: {
                type: Number,
                notify: true
            },
            auto: {
                type: Boolean,
                notify: true
            },
            body: {
                type: Object,
                notify: true
            }
        }
    }

    computeAuthority(base, apiV1,path) {
        return base + apiV1 + path;
    }

    _handle(e){
        this.dispatchEvent(new CustomEvent('handle',
            {detail:
                {
                    status: e.detail.status,
                    response: e.detail.response
                }}));
    }

    _error(e) {
        this.dispatchEvent(new CustomEvent('error',
            {detail:
                {
                    status: e.detail.request.status,
                }}));
    }

}

customElements.define(SendRequest.is, SendRequest);
