/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ROOT  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Main entry point for client-side JavaScript, bundled as IIFE.      ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

// DEPENDENCIES

// modules
import Form from 'modules/form';
import { smooth } from 'modules/scroll';
import galleryView from 'views/gallery';

// components
import nav1 from 'navigation/1/_';
import gallery1 from 'galleries/1/logic/';
import carousel1 from 'carousels/1/_';

// EXECUTION
document.addEventListener('DOMContentLoaded', () => {

    nav1();
    smooth();
    galleryView();
    gallery1({ navigation: true, autoplay: true });
    carousel1({ delay: 5000 });

    new Form({
        id: 'amandakreitzer_1',
        success: '/contact/success.html',
        failure: '/contact/failure.html',
        destination: 'https://forms.cygnul.com/',
        recaptcha: '6LcLifEZAAAAADKfIJsRnfEc2BTrSmJK_pIKtK50',
    });

});
