chrome.tabs.getSelected(null, tab => {

    class MyPlugin extends Polymer.Element {

        static get is() {
            return 'my-plugin'
        }

        static get properties() {
            return {
                url: {
                    type: String,
                    value: tab.url
                },
                base: {
                    type: String,
                    value: "http://localhost:8080"
                },
                apiV1: {
                    type: String,
                    value: "/api/v1/"
                },
                fullUrl: {
                    type: String,
                    computed: 'computeFullUrl(base, url, apiV1)'
                },
                fields: {
                    type: Array,
                    value: function () {
                        return [];
                    }
                },
                postFields: {
                    type: Object,
                    value: null
                },
                getFields: {
                    type: Object,
                    value: null
                },
                signInUrl: {
                    type: String,
                    computed: 'computeFullSignUrl(base, apiV1)'
                },
                providers: {
                    type: Array,
                    value: function () {
                        return [];
                    }
                },
                getUser: {
                    type: String,
                    computed: 'computeGetUser(base, apiV1)'
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

        static get observers() {
            return ['changeFields(fields.*,getFields)']
        }

        computeFullUrl(base, url, apiV1) {
            return base + apiV1 + "notes?url=" + (url);
        }

        computeFullSignUrl(base, apiV1) {
            return base + apiV1 + "auth/providers"
        }
        computeGetUser(base, apiV1) {
            return base + apiV1 + "me"
        }

        handle(e) {
            const note = e.detail.response.data.data || {};
            const fields = Object.keys(note)
                .map(key => ({
                    key: key,
                    val: note[key]
                }));
            this.push('fields', ...fields);
            this.getFields = note;
        }

        _handleErrorResponse(e) {
            if (e.detail.request.xhr.status === 404) {
                this.$.xhr.auto = 'true';
            }
        }

        addFields() {
            this.push('fields', {});
        }

        removeFields(e) {
            let target = e.model;
            let index = this.fields.indexOf(target.get('item'));
            this.splice('fields', index, 1);
        }

        changeFields(changed) {
            const result = this.fields
                .reduce((acc, obj) => {
                    acc[obj.key] = obj.val;
                    return acc;
                }, {});
            this.postFields = JSON.stringify({id: this.fullUrl, data: result});
            if ((this.getFields !== null) && (JSON.stringify(this.getFields) !== JSON.stringify(result))) {
                this.$.xhr.auto = 'true';
            }
        }

        getProviders(e) {
            var resProv = e.detail.response.data;
            const providers = Object.keys(resProv)
                .map(key => ({
                    id: resProv.id,
                    login_url: resProv.login_url
                }));
            this.push('providers', ...resProv);
        }

        signIn(e) {
            let target = e.model;
            let index = this.providers.indexOf(target.get('item'));
            chrome.tabs.create({url: this.providers[index].login_url});
        };

        currentUser(e) {
            if (e.detail.response.data != null) {
                this.flag = !this.flag;
            }
        }
    }

    customElements.define(MyPlugin.is, MyPlugin);

});