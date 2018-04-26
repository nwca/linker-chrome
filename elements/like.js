class XLike extends Polymer.Element {

   static get is() {
      return 'like-dislike'
   }

   static get properties() {
      return {
         like: {
            type: Boolean,
            notify: true,
            observer: 'changeLike'
         },
          disLike: {
             type: Boolean,
              value: false
          },
          markLike:{
             type: Number,
              value: -1
          },
          markDisLike: {
             type: Number,
              value: -1
          }
      }
   }

   changeLike(newValue) {
      if (newValue === true) {
         this.disLike = false;
         this.markLike++;
      } else if (newValue === false) {
         this.disLike = true;
         this.markDisLike++;
      }
   }

    getClasses(like) {
        let classes = 'thumb';
        if(like) classes += ' active';
        return classes;
    }

   changer(e) {
       if (this.like === true) {
           this.markLike = 1;
       }
       if (this.like === false) {
           this.markDisLike = 1;
       }
       if (e.target.id === 'thumbUp') {
           this.like = true;
           this.markLike++;
           this.markDisLike = 1;
           if((this.markLike % 2 === 0)) {
               this.like = null;
               this.markLike = 1;
           }
       }
       else if (e.target.id === 'thumbDown') {
           this.like = false;
           this.markDisLike++;
           this.markLike = 1;
           if((this.markDisLike % 2 === 0)) {
               this.like = null;
               this.disLike = null;
               this.markDisLike = 1;
           }
       }
   }

}

customElements.define(XLike.is, XLike);
