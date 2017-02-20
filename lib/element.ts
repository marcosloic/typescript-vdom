class Element {

    public create(node) {
        if (typeof node === 'string') {
            return document.createTextNode(node);
        }
        const $el = document.createElement(node.type);
        this.setProps($el, node.props);
        node.children
            .map(child => this.create(child))
            .forEach($el.appendChild.bind($el));
        return $el;
    }

    public diff(one, two) {
        return typeof one !== typeof two ||
            typeof one === 'string' && one !== two ||
            one.type !== two.type
    }

    public patch($parent, newNode, oldNode, index = 0) {
        if (!oldNode) {
            $parent.appendChild(
                this.create(newNode)
            );
        } else if (!newNode) {
            $parent.removeChild(
                $parent.childNodes[index]
            );
        } else if (this.diff(newNode, oldNode)) {
            $parent.replaceChild(
                this.create(newNode),
                $parent.childNodes[index]
            );
        } else if (newNode.type) {
            const newLength = newNode.children.length;
            const oldLength = oldNode.children.length;
            for (let i = 0; i < newLength || i < oldLength; i++) {
                this.patch(
                    $parent.childNodes[index],
                    newNode.children[i],
                    oldNode.children[i],
                    i
                );
            }
        }
    }

    public createLotsOfElements(num: number) {
        let i = 1;
        let arr = [];

        while (i < (num + 1)) {
            arr.push({
                type: 'li',
                props: {className: `item`, style: 'list-style:square'},
                children: [`item ${i}`]
            });
            i++
        }
        return arr;
    }

    private setProps($target, props) {
        Object.keys(props).forEach(name => {
            this.setProp($target, name, props[name]);
        });
    }

    private setProp($target, name, value) {
        if (name === 'className') {
            $target.setAttribute('class', value);
        } else if (typeof value === 'boolean') {
            this.setBooleanProp($target, name, value);
        } else {
            $target.setAttribute(name, value);
        }
    }

    private setBooleanProp($target, name, value) {
        if (value) {
            $target.setAttribute(name, value);
            $target[name] = true;
        } else {
            $target[name] = false;
        }
    }

}

export default new Element();