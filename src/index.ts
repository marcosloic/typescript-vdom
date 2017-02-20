import {Element}  from '../lib/element';
const El = new Element();

const a = ({
        type: 'ul', props: {className: 'list'},
        children: [
            {type: 'li', props: {}, children: ['item 1']},
            {type: 'li', props: {}, children: ['item 2']},

        ]
    });

const b = ({
    type: 'ul', props: {className: 'list'},
    children: [
        {type: 'li', props: {}, children: ['item 3']},
        {type: 'li', props: {}, children: ['item 4']},

    ]
});

const $root = document.getElementById('root');
$root.appendChild(El.create(a));
$root.appendChild(El.create(b));