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
                userAvatar: {
                    type: String
                },
                loggedIn: {
                    type: Boolean,
                    value: null
                },
                starRating: {
                    type: Number,
                    value: 0
                },
                like: {
                    type: Boolean,
                    value: null
                },
                description: {
                    type: String,
                    value: ' '
                },
                linkType: {
                    type: String,
                    value: null
                },
                linkTitle: {
                    type: String,
                    value: null
                }
            }
        }

        constructor() {
            super();
        }

        static get observers() {
            return ['changeFields(fields.*,getFields,starRating,description,like,linkType,linkTitle)']
        }

        computeFullUrl(base, url, apiV1) {
            return base + apiV1 + "notes?url=" + (url);
        }

        handle(e) {
            const note = e.detail.response.data.data || {};
            const {
                description,
                star,
                like,
                type,
                title,
                ...noteFields
            } = note;
            this.description = description;
            this.starRating = +star;
            this.linkType = type;
            this.linkTitle = title;
            if ((like !== null) && (like !== undefined)) {
                this.like = JSON.parse(like);
            }
            const fields = Object.keys(noteFields)
                .map(key => ({
                    key: key,
                    val: note[key]
                }));
            this.push('fields', ...fields);
            this.getFields = note;
            Polymer.dom(this.root).removeChild(this.$.loader)
        }

        _handleErrorResponse(e) {
            if(e.detail.request.xhr.status === 404) {
                this.$.xhr.generateRequest();
                this.$.getAjax.generateRequest();
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
            this.userAvatar = this.$.signIn.userAvatar;
            this.loggedIn = this.$.signIn.loggedIn;
            this.like = this.$.like.like;
            this.description = this.$.description.description;
            this.starRating = this.$.starRating.value;
            this.linkTitle = this.$.title.ltitle;
            this.linkType = this.$.type.ltype;
            const result = this.fields
                .reduce((acc, obj) => {
                    acc[obj.key] = obj.val;
                    return acc;
                }, {});
            if ((this.description !== ' ') && (this.description !== '')) {
                result['description'] = this.description;
            }
            if (this.like !== null)
            {
                result['like'] = JSON.stringify(this.like);
            }
            if ((!isNaN(this.starRating)) && (this.starRating !== 0)) {
                result['star'] = JSON.stringify(this.starRating);
            }
            if (this.linkTitle !== ''){
                result['title'] = this.linkTitle;
            }
            if (this.linkType !== ''){
                result['type'] = this.linkType;
            }
            this.postFields = JSON.stringify({id: this.fullUrl, data: result});
            if ((this.getFields !== null) && (JSON.stringify(this.getFields) !== JSON.stringify(result))) {
                this.$.xhr.auto = 'true';
            }
        }
    }

    customElements.define(MyPlugin.is, MyPlugin);

});