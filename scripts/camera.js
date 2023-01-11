AFRAME.registerComponent('camera-init', {
    init: function() {
        this.searchDevice = this.searchDevice.bind(this);
        if (!('mediaDevices' in navigator)) {
            return;
        }

        navigator.mediaDevices.enumerateDevices()
            .then(this.searchDevice);
    },
    searchDevice: function(devices) {
        const userMediaConstraints = {
            audio: false,
            video: {
                facingMode: 'environment',
                width: {
                    ideal: _this.parameters.sourceWidth
                },
                height: {
                    ideal: _this.parameters.sourceHeight
                }
            }
        }

        if (null !== _this.parameters.deviceId) {
            userMediaConstraints.video.deviceId = {
                exact: _this.parameters.deviceId
            };
        }

        navigator.mediaDevices.getUserMedia(userMediaConstraints, function(stream) {
            domElement.srcObject = stream;
            document.body.addEventListener('click', function() {
                domElement.play();
            }, {once: true});
            var interval = setInterval(function() {
                if (!domElement.videoWidth) return;
                clearInterval(interval);
            });
        });
    }
});
