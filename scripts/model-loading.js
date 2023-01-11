AFRAME.registerComponent('model-loading', {
    init: function() {
        this.el.addEventListener('model-loaded', (e) => {
            alert('Loaded');
        });
    }
});
