AFRAME.registerComponent('torch', {
    schema: {
        target: {default: ""}
    },
    init: function() {
        this.handleError = this.handleError.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.torchElement = this.data.target && document.querySelector(this.data.target);
        if (!this.torchElement) {
            this.torchElement = this.el;
        }

        this.torchElement.addEventListener('click', this.handleClick);
    },
    handleClick: async function() {
        let domElement = document.querySelector('#arjs-video');
        let oldStream = domElement.srcObject;

        const track = oldStream.getVideoTracks()[0];
        const settings = track.getSettings();

        if (settings.torch === undefined || settings.torch === null) {
            alert('Taschenlampe ist nicht verfügbar');
            return;
        }

        await track.applyConstraints({
            advanced: [{torch: !settings.torch}]
        });
    },
    handleError: function (error) {
        console.log("Something went wrong. " + error.message + ' | ' + error.name);
    }
});
