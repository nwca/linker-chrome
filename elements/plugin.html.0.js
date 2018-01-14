chrome.tabs.getSelected(null, tab => {
  Polymer({
      is: 'my-plugin',
      properties: {
        url: {
            type:String,
            value:tab.url
        },
          base: {
            type: String,
            value: function () {
                let protocol = "http://";
                let host = "www.localhost:";
                let port = "8080";
                let api = "/api/notes?url=";
                let base = protocol + host + port + api;
                return base;

            }
          },
          fullUrl: {
              type:String,
              computed: 'computeFullUrl(base, url)'
          },
          fields: {
              type: Array,
              value: function () {
                  return [];
              }
          },
          resRes: {
              type: String,
              value: function () {
                  return {};
              }
          }
      },
      observers:['changeFields(fields.*)'],
      computeFullUrl: function (base,url) {
          return base + encodeURIComponent(url);
      },
      handle: function (e) {
          let that = this;
          const note = event.detail.response.data.data;
          const resGet = Object.keys(note)
              .reduce((acc, key) => {
                  let a = {key: key,val: note[key]};
                  that.push('fields',a);
                  return a;
              }, [])
      },
      addFields: function (e) {
          this.push('fields', {});
      },
      removeFields: function (e) {
          let target = e.model;
          let index = this.fields.indexOf(target.get('item'));
          this.splice('fields', index, 1);
      },
      changeFields:function (changeRecord,index) {
          const result = this.fields
              .reduce((acc, obj) => {
                  acc[obj.key] = obj.val;
                  return acc;
              }, {});
          this.resRes = JSON.stringify({id:this.fullUrl,data:result});
          this.$.xhr.auto = "false";
          if ((this.fields.length != 0) && ( this.$.getAjax.status === 200)) {
              this.$.xhr.auto = "true";
          }
      },
  });
});