const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(localMediaStream => {

        // DEPRECIATION : 
        // The following has been depreceated by major browsers as of Chrome and Firefox.
        // video.src = window.URL.createObjectURL(localMediaStream);
        // Please refer to these:
        // Deprecated  - https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
        // Newer Syntax - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject
      
        video.srcObject = localMediaStream;
        video.play();
    })
    .catch(err => console.log(err));
}

function paintToCanvas(color) {
    const width = video.videoWidth;
    const height = video.videoHeight;

    canvas.width = width;
    canvas.height = height;


    const timeInterval =  setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        // take the pixels out
        let pixels = ctx.getImageData(0, 0, width, height);

        //mess with them
        if(color === 'red') {
            pixels = redEffect(pixels);
        }

        if(color === 'green') {
            pixels = rgbSplit(pixels);
            ctx.globalAlpha = 0.1;
        }

        if(color === 'rgb') {
            pixels = greenScreen(pixels);
        }

        if(color === 'red' || color === 'green') {
            setTimeout(() => {
                clearInterval(timeInterval);
            }, 5000)
        }

        //put them back
        ctx.putImageData(pixels, 0, 0);
    }, 16);


    return timeInterval;
}

function takePhoto() {
    //played the sound
    snap.currentTime = 0;
    snap.play();

    //take the data out of canvas
    const data = canvas.toDataURL('image/jpeg');
    const linkImg = document.createElement('a');
    linkImg.href = data;
    linkImg.setAttribute('download', 'handsome');
    linkImg.textContent = 'Download Image';
    linkImg.innerHTML = `<img src="${data}" alt="" />`
    strip.insertBefore(linkImg, strip.firstChild);
}

function redEffect(pixels) {
    for(let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 100; // red
        pixels.data[i + 1] = pixels.data[i + 1] - 50; // red
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // red
    }
    return pixels;
}

function rgbSplit(pixels) {
    for(let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i - 150] = pixels.data[i + 0]; // red
        pixels.data[i + 100 ] = pixels.data[i + 1]; // red
        pixels.data[i - 550] = pixels.data[i + 2]; // red
    }
    return pixels;
}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

function filterColor(color) {
    paintToCanvas(color);
}


getVideo();

video.addEventListener('canplay', paintToCanvas);
