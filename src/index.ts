import Element from '../lib/element';

const el = Element.createLotsOfElements(10000);

const list = ({
    type: 'ul', props: {className: 'list'},
    children: [ ...el]
});

const $root = document.getElementById('root');
console.time();
$root.appendChild(Element.create(list));
console.timeEnd();