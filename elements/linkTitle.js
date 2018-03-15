class LTitle extends Polymer.Element {

    static get is() {
        return 'link-title'
    }

    static get properties() {
        return {
            ltitle:{
                type: String,
                value: null,
                notify: true,
            }
        }
    }

}

customElements.define(LTitle.is, LTitle);
