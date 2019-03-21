import grapesjs from 'grapesjs';

export default grapesjs.plugins.add('grapesjs-blocks-bootstrap', (editor, opts = {}) => {
    window.editor = editor;


});