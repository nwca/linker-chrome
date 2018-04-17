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
            fields: {
               type: Array,
               value: function () {
                  return [];
               }
            },
             fullUrl: {
               type: String,
               computed: 'computeFullUrl(url)'
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
            },
            flag: {
               type: Boolean,
               value: true
            },
             spinner: {
               type: Boolean,
               value: true
            }
         }
      }

      constructor() {
         super();
      }

       computeFullUrl(url){
         return "notes?url=" + (url);
       }

      static get observers() {
         return ['changeFields(fields.*,getFields,starRating,description,like,linkType,linkTitle)']
      }

      checkStatus(e) {
         if (e.detail.status === 200) {
            this.flag = true;
         }
      }

      handle(e) {
          if (e.detail.status === 200) {
             this.$.plugin.hidden = false;
          }
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
         Polymer.dom(this.root).removeChild(this.$.spinner)
      }

      handleErrorResponse(e) {
          if (e.detail.status === 401) {
              this.$.providers.hidden = false;
              Polymer.dom(this.root).removeChild(this.$.spinner)
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
         if (this.like !== null) {
            result['like'] = JSON.stringify(this.like);
         }
         if ((!isNaN(this.starRating)) && (this.starRating !== 0)) {
            result['star'] = JSON.stringify(this.starRating);
         }
         if (this.linkTitle !== '') {
            result['title'] = this.linkTitle;
         }
         if (this.linkType !== '') {
            result['type'] = this.linkType;
         }
         this.postFields = JSON.stringify({id: this.fullUrl, data: result});
         if ((this.getFields !== null) && (JSON.stringify(this.getFields) !== JSON.stringify(result))) {
            this.$.xhr.auto = 'true';
            this.flag = false;
         }
      }
   }

   customElements.define(MyPlugin.is, MyPlugin);

});