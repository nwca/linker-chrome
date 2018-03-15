class XLike extends Polymer.Element {

    static get is() {
        return 'like-dislike'
    }

    static get properties() {
        return {
            like: {
                type: Boolean,
                notify: true
            }
        }
    }

    static get observers() {
        return ['changeLike(like)']
    }

    changeLike(like) {
        if (like === true) {
            this.$.thumbUp.classList.add('active');
        } else if (like === false) {
            this.$.thumbDown.classList.add('active');
        }
    }

    changer(e) {
        if (e.target.id === 'thumbUp') {
            this.like = true;
            e.target.classList.add('active');
            this.$.thumbDown.classList.remove('active');
        } else {
            this.like = false;
            e.target.classList.add('active');
            this.$.thumbUp.classList.remove('active');
        }

    }

}

customElements.define(XLike.is, XLike);
