AFRAME.registerComponent('model-loading', {
    init: function() {
        this.el.parentElement.addEventListener('markerFound', (e) => {
            this.el.classList.add('model-loaded');
            this.el.addEventListener('model-loaded', (e) => {
                this.el.classList.remove('loading');
            });
        });
    }
});
