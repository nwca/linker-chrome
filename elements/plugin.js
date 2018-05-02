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
             provShow: {
               type: Boolean,
                 value: false
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
             loggedIn: {
               type: Boolean,
               value: false
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
               value: ''
            },
            linkType: {
               type: String,
               value: null
            },
            linkTitle: {
               type: String,
               value: null
            },
            visible: {
               type: Boolean,
               value: true
            },
            errorMessage: {
               type: String
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

       userPicture(e) {
          this.userAvatar = e.detail.picture;
      }

      checkStatus(e) {
         if (e.detail.status === 200) {
            this.visible = true;
         }
      }

      handle(e) {
         const note = e.detail.response.data.data || {};
         this.loggedIn = this.$.signIn.loggedIn;
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
      }

      handleErrorResponse(e) {
          if ((e.detail.status >= 400) && (e.detail.status < 600)) {
              this.errorMessage = e.detail.status;
              if (e.detail.status === 404) {
                  this.$.xhr.auto = true;
                  this.loggedIn = true;
              } else if (e.detail.status === 401) {
                  this.provShow = true;
                  this.$.spinner.hidden = true;
              }
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
         this.like = this.$.like.mark;
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
            this.visible = false;
         }
      }
   }

   customElements.define(MyPlugin.is, MyPlugin);

});