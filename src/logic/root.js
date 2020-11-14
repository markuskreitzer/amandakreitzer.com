/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ROOT  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Main entry point for client-side JavaScript, bundled as IIFE.      ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

// DEPENDENCIES

// modules
// import form from 'modules/form';
import { smooth } from 'modules/scroll';

// components
import nav1 from 'navigation/1/_';

// EXECUTION
document.addEventListener('DOMContentLoaded', () => {

    nav1();
    smooth();

    // new form({
    //     id: 'amandakreitzer_1',
    //     success: '/contact/success.html',
    //     failure: '/contact/failure.html',
    //     destination: 'https://forms.cygnul.com/',
    //     recaptcha: '6LcQTNkZAAAAAIJkLl4z0vRRMDpuLUv4LjZD2OJR',
    // });

});
