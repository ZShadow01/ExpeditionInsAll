AFRAME.registerComponent('easter-egg', {
    schema: {
        targetImage: {default: ''}
    },
    init: function() {
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);

        this.targetElement = this.data.targetImage && document.querySelector(this.data.targetImage);
        if (!this.targetElement) {
            return;
        }

        this.el.addEventListener('markerFound', this.show);
        this.el.addEventListener('markerLost', this.hide);
    },
    show: function() {
        console.log("Found");
        this.targetElement.classList.remove('hide');
        console.log(this.targetElement);
    },
    hide: function() {
        console.log('Lost');
        this.targetElement.classList.add('hide');
    }
});
