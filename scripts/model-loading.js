AFRAME.registerComponent('model-loading', {
    init: function() {
        let element = this.el;
        console.log(element);
        element.parentElement.addEventListener('markerFound', (e) => {
            element.addEventListener('model-loaded', (e) => {
                element.classList.remove('loading');
            });
        });
    }
});
