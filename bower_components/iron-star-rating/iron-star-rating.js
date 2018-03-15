  /**
        * `iron-star-rating`
        * 5-star rating element (Polymer 2.x)
        *
        * @customElement
        * @polymer
        * @demo demo/index.html
        */
        class IronStarRating extends Polymer.GestureEventListeners(Polymer.Element) {
            static get is() { return 'iron-star-rating'; }
            static get properties() {
                return {
                    value: {
                        type: Number,
                        notify: true,
                        observer: '_valueChanged'
                    },
                    icon: {
                        type: String,
                        value: 'icons:star'
                    },
                    disableAutoUpdate: {
                        type: Boolean,
                        value: false,
                    }
                };
            }

            constructor() {
                super();

                this.ratings = [
                    {value: 5, class: 'whole', selected: false},
                    {value: 4.5, class: 'half', selected: false},
                    {value: 4, class: 'whole', selected: false},
                    {value: 3.5, class: 'half', selected: false},
                    {value: 3, class: 'whole', selected: false},
                    {value: 2.5, class: 'half', selected: false},
                    {value: 2, class: 'whole', selected: false},
                    {value: 1.5, class: 'half', selected: false},
                    {value: 1, class: 'whole', selected: false},
                    {value: 0.5, class: 'half', selected: false},
                ];
            }

            _valueChanged(newValue, oldValue) {
                if (newValue !== 0 && !newValue) {
                    return;
                }

                var self = this;
                this.ratings.forEach(function(rating, index) {
                    if (rating.value === newValue) {
                        rating.selected = true;
                    } else {
                        rating.selected = false;
                    }
                    self.notifyPath('ratings.' + index + '.selected')
                });
            }
            _getSelected(selected) {
                return selected ? 'selected' : '';
            }

            _starClicked(e) {
                e.preventDefault();

                if (!this.disableAutoUpdate) {
                    this.value = e.model.item.value;
                }
                this.dispatchEvent(new CustomEvent('rating-selected', {detail: {rating: e.model.item.value}}));
            }
        }

        window.customElements.define(IronStarRating.is, IronStarRating);
    
