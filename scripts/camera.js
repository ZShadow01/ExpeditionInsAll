AFRAME.registerComponent('camera-init', {
    init: function() {
        this.initialize = this.initialize.bind(this);
        this.switchCamera = this.switchCamera.bind(this);
        this.gotDevices = this.gotDevices.bind(this);
        this.gotStream = this.gotStream.bind(this);

        if (!('mediaDevices' in navigator)) {
            return;
        }

        this.videoSelect = document.querySelector('select#videoSource');
        this.selectors = [this.videoSelect];

        this.videoSelect.addEventListener('change', this.switchCamera);

        this.initialize();
    },
    initialize: function() {
        navigator.mediaDevices.enumerateDevices()
            .then(this.gotDevices)
            .catch(console.error);
    },
    switchCamera: function() {
        let domElement = document.querySelector('#arjs-video');
        if (domElement.srcObject) {
            domElement.srcObject.getTracks().forEach(function(track) {
                track.stop();
            });

            let videoSource = this.videoSelect.value;
            const constraints = {
                video: {
                    deviceId: videoSource ? { exact: videoSource } : undefined
                }
            };

            navigator.mediaDevices.getUserMedia(constraints)
                .then(this.gotStream)
                .then(this.gotDevices);
        }
    },
    gotDevices: function(devices) {
        var values = this.selectors.map(function(select) {
            return select.value;
        });
    
        this.selectors.forEach(function(select) {
            while (select.firstChild) {
                select.removeChild(select.firstChild);
            }
        });

        devices.sort((a, b) => {
            a.deviceId < b.deviceId;
        });
    
        for (let i = 0; i < devices.length; i++) {
            let deviceInfo = devices[i];
            let option = document.createElement('option');
            option.value = deviceInfo.deviceId;
    
            if (deviceInfo.kind === "videoinput") {
                option.text = deviceInfo.label || "Kamera " + (this.videoSelect.length + 1);
                this.videoSelect.appendChild(option);
            }
            // else it's some other input type
    
            this.selectors.forEach(function(select, selectorIndex) {
                if (Array.prototype.slice.call(select.childNodes).some(function(n) {
                    return n.value === values[selectorIndex];
                })) {
                    select.value = values[selectorIndex];
                }
            });
        }
    },
    gotStream: function(stream) {
        document.querySelector('#arjs-video').srcObject = stream;
        return navigator.mediaDevices.enumerateDevices();
    }
});
