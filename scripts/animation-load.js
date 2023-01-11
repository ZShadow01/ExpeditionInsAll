AFRAME.registerComponent('animation-load', {
    init: function() {
        this.loadAnimation = this.loadAnimation.bind(this);
    }
});
