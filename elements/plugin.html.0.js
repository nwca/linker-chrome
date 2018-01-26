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
                value: "http://www.localhost:8080"
            },
            fullUrl: {
                type: String,
                computed: 'computeFullUrl(base, url)'
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
            }
            }
        }

        constructor() {
            super();
        }

        static get observers() {
            return ['changeFields(fields.*,getFields)']
        }

        computeFullUrl(base, url) {
        return base + "/api/notes?url=" + encodeURIComponent(url);
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

    }

    customElements.define(MyPlugin.is, MyPlugin);

});