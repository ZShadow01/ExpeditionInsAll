AFRAME.registerComponent('model-loading', {
    init: function() {
        this.el.addEventListener('model-loaded', (e) => {
            this.el.classList.remove('loading');
        });
    }
});
