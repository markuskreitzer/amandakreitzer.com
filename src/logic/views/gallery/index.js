'use strict';

export default () => {

    // return early if not in target document
    if (!document.getElementById('gallery')) return null;

    document.querySelector('.gallery-main').addEventListener('click', event => {

        // prevent page from losing vertical position upon close
        if (event.target.matches('.gallery-main__modal-close')) {
            window.location.hash = '$';
            event.preventDefault();
        }

    });

};
