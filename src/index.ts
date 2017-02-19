function h(type, props, ...children) {
    return {type, props, children};
}

const a = ({
        type: 'ul', props: {className: 'list'},
        children: [
            {type: 'li', props: {}, children: ['item 1']},
            {type: 'li', props: {}, children: ['item 2']},

        ]
    });

console.log(a);