AFRAME.registerComponent('animation-load', {
    init: function() {
        this.loadAnimation = this.loadAnimation.bind(this);
        this.loaded = false;
        this.el.addEventListener('model-loaded', () => {
            this.loadAnimation();
        });
    },
    loadAnimation: function() {
        if ('gltf-model' in this.el.components) {
            const gltfModel = this.el.components['gltf-model'].model;
            if (gltfModel.animations) {
                const clips = gltfModel.animations[0];
            
                this.mixer = new THREE.AnimationMixer(gltfModel);
                this.mixer.clipAction(clips).play();
            }
        }
    },
    tick: function (time, delta) {
        if (!this.mixer) return;
        this.mixer.update(delta / 1000);
    }
});
