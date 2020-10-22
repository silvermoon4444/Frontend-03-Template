export function createElement(type, attribute, ...children) {
    if (typeof type === 'string') {
        type = new ElementWrapper(type)
    } else {
        type = new type()
    }
    for (const key in attribute) {
        if (attribute.hasOwnProperty(key)) {
            const eleVal = attribute[key];
            type.setAttribute(key, eleVal)
        }
    }
    for (const child of children) {
        if (typeof child === 'string') {
            child = new TexttWrapper(child)
        }
        type.appendChild(child)
    }
    return type
}

export class Component {
    constructor() {
    }
    appendChild(child) {
        child.mountTo(this.root)
    }
    setAttribute(key, val) {
        this.root.setAttribute(key, val)
    }
    getAttribute(key) {
        return this.root.getAttribute(key)
    }
    mountTo(parent) {
        parent.appendChild(this.root)
    }
}

class ElementWrapper extends Component {
    constructor(type) {
        this.root = document.createElement(type)
    }
}
class TexttWrapper extends Component {
    constructor(text) {
        this.root = document.createElement(text)
    }

}