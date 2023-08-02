function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
        
        var context = this, args = arguments;
        var later = function() {
            console.log("later");
            console.count("debounce");
            timeout = null;
            if(!immediate) func.apply(context, args);
        }
        var callNow = immediate & !timeout;
        clearTimeout(timeout);
        console.log("setTimeout");
        console.count("debounce");
        timeout = setTimeout(later, wait);
        if(callNow) {
            console.log("callNow");
            console.count("debounce");
            func.apply(context, args)
        };
    }
}

const sliderImages = document.querySelectorAll('.slide-in');

// function excuteDebounce() {
//     console.log("excuteDebounce");
//     console.count("debounce");
// }
// window.addEventListener('scroll', debounce(excuteDebounce, 3000));

function checkSliderImg(e) {
    sliderImages.forEach(sliderImage => {
        // half way through the image
        const slideInAt = (window.scrollY + window.innerHeight) - (sliderImage.height / 2);
        //bottom of the image
        const imageBottom = sliderImage.offsetTop + sliderImage.height; // sliderImage.offsetTop position of image

        const isHalfShown = slideInAt > sliderImage.offsetTop;
        const isNotScrolledPast = window.scrollY < imageBottom;

        if (isHalfShown && isNotScrolledPast) {
            sliderImage.classList.add('active');
        } else {
            sliderImage.classList.remove('active');
        }

    });
}



window.addEventListener('scroll', debounce(checkSliderImg));