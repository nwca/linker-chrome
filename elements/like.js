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
         this.$.thumbUp.classList.add('active');
         this.markLike++;
      } else if (newValue === false) {
         this.$.thumbDown.classList.add('active');
         this.markDisLike++;
      }
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
           e.target.classList.add('active');
           this.markLike++;
           this.markDisLike = 1;
           if((this.markLike % 2 === 0)) {
               this.$.thumbUp.classList.remove('active');
               this.like = null;
               this.markLike = 1;
           }
           this.$.thumbDown.classList.remove('active');
       }
       else if (e.target.id === 'thumbDown') {
           this.like = false;
           this.markDisLike++;
           this.markLike = 1;
           e.target.classList.add('active');
           if((this.markDisLike % 2 === 0)) {
               this.$.thumbDown.classList.remove('active');
               this.like = null;
               this.markDisLike = 1;
           }
           this.$.thumbUp.classList.remove('active');
       }
   }

}

customElements.define(XLike.is, XLike);
