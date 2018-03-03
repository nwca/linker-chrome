class SignIn extends Polymer.Element {

    static get is() {
        return 'sign-in'
    }

    static get properties() {
        return {
            signInUrl: {
                type: String,
                computed: 'computeFullSignUrl(base)'
            },
            providers: {
                type: Array,
                value: function () {
                    return [];
                }
            },
            getUser: {
                type: String,
                computed: 'computeGetUser(base)'
            },
            flag: {
                type: Boolean,
                value: false
            }
        }
    }

    constructor() {
        super();
    }

    computeFullSignUrl(base) {
        return base + "/api/v1/auth/providers"
    }
    compluteGetUser(base) {
        return base + "/api/v1/me"
    }

    getProviders(e) {
        var resProv = e.detail.response.data;
        const provider = Object.keys(resProv)
            .map(key => ({
                id:resProv.id,
                login_url:resProv.login_url
            }));
        this.push('providers',...resProv);
    }

    singIn(e) {
        let target = e.model;
        let index = this.providers.indexOf(target.get('item'));
        chrome.tabs.create({url:this.providers[index].login_url});
    };

    currentUser(e) {
      if (e.detail.response.data != null) {
          this.flag = !this.flag;
      }
    };
}

customElements.define(SignIn.is, SignIn);