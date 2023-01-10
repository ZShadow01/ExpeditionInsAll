function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const navbar = document.getElementById('navbar');
const title = navbar.getElementsByClassName('title').item(0);
const subtitle = navbar.getElementsByClassName('subtitle').item(0);

let onceAnimationElements = document.getElementsByClassName('once-animation');

(async function(delay, wordDelay) {
    const titleSpans = title.getElementsByTagName('span');
    const subtitleSpans = subtitle.getElementsByTagName('span');

    const style = 'opacity: 1;';

    let spans = Array.prototype.slice.call(titleSpans);
    spans = [...titleSpans, ...subtitleSpans];

    await sleep(delay);
    
    let index = 0;
    var interval = setInterval(() => {
        spans[index++].setAttribute('style', style);

        if (index >= spans.length) {
            clearInterval(interval);
        }
    }, wordDelay);
})(1300, 200);


title.parentElement.addEventListener('click', () => {
    scrollTo(0, 0);
});


const defaultNavbarPos = navbar.getBoundingClientRect().top + window.scrollY;


addEventListener('scroll', async (e) => {
    const halfWindowHeight = window.innerHeight / 2;

    if (window.scrollY > defaultNavbarPos) {
        navbar.classList.add('scrolled');
    }
    else {
        navbar.classList.remove('scrolled');
    }

    for (const element of onceAnimationElements) {
        const elementRect = element.getBoundingClientRect();
        if (elementRect.top < halfWindowHeight + navbar.offsetHeight + 100) {
            element.classList.remove('once-animation');
            element.classList.add('once-animated');
        }
    }
});
