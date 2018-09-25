export default {
    getIndexOfFilter(selecteds, selected) {
        let counter = 0, index = null;
        selecteds.forEach(function(val, key) {
            if(
                Object.keys(val)[0] == Object.keys(selected)[0] && Object.values(val)[0] == Object.values(selected)[0] &&
                Object.keys(val)[1] == Object.keys(selected)[1] && Object.values(val)[1] == Object.values(selected)[1]
            ) {
                index = counter;
            }

            counter++;
        });

        return index;
    },

    hasGetUserMedia() {
        return !!(navigator.mediaDevices &&
        navigator.getUserMedia);
    },

    b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        let byteCharacters = atob(b64Data);
        let byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            let slice = byteCharacters.slice(offset, offset + sliceSize);

            let byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            let byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        let blob = new Blob(byteArrays, {type: contentType});
        return blob;
    },

    freezeScrolling() {
        let top= window.scrollY;

        document.body.style.overflow= 'hidden';

        window.onscroll= function() {
            window.scroll(0, top);
        }
    },

    unfreezeScrolling() {
        document.body.style.overflow= '';
        window.onscroll= null;
    },

    handleError(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log('Response', error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log('Request', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
    }
};
