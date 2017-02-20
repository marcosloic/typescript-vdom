export class Element {

    public create(node) {
        if (typeof node === 'string') {
            return document.createTextNode(node);
        }
        const $el = document.createElement(node.type);
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

}