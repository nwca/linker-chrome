class XLike extends Polymer.Element {

   static get is() {
      return 'like-dislike'
   }

   static get properties() {
      return {
         mark: {
            type: Boolean,
            notify: true,
            observer: 'changeLike'
         },
          like: {
             type: Boolean,
              value: false
          },
          disLike: {
              type: Boolean,
              value: false
          }
      }
   }
    constructor(){
       super();
   }

    changeLike(newValue) {
        if (newValue === true) {
            this.like = true;
        } else if (newValue === false) {
            this.disLike = true;
        }
    }

   chenger(e) {
        if (e.currentTarget.id === 'thumbUp') {
            this.like = !this.like;
            if (this.like === true) {
                this.mark = true;
            } else {
                this.mark = null
            }
            this.disLike = false;
        } else if (e.currentTarget.id === 'thumbDown') {
           this.disLike = !this.disLike;
            if (this.disLike === true) {
                this.mark = false;
            } else {
                this.mark = null
            }
            this.like = false;
       }
   }


    getClasses(like) {
        let classes = 'thumb';
        if(like) classes += ' active';
        return classes;
    }

}

customElements.define(XLike.is, XLike);
