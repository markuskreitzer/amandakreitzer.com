'use strict';

export default ({
    delay = 5000,
    slide: slideClass = '.slide',
    active: activeClass = '.active',
    container = '.carousel-1',
} = {}) => {

    // first check if the specified container is in document
    if (!document.querySelector(container)) return null;

    // retrieve the DOM element of the container selector
    container = document.querySelector(container);

    // corral all the slides that's in the slideshow container
    const slides = container.querySelectorAll(slideClass);
    const activeElement = container.querySelector(activeClass);
    const numberOfSlides = slides.length;

    // locate the index of the slide earmarked for initial display
    let indexOfActiveSlide = [].indexOf.call(slides, activeElement);

    // the slide rotator
    const rotate = () => {
        slides[indexOfActiveSlide].classList.remove('active');
        // modulo shifts to next slide in queue and restarts at end
        indexOfActiveSlide = ++indexOfActiveSlide % numberOfSlides;
        slides[indexOfActiveSlide].classList.add('active');
    };

    // begin rotation
    setInterval(rotate, delay);

};
