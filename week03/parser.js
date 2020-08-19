const css = require('css')

const EOF = Symbol('EOF')
let currentToken = null
let currentAttr = null

const stack = [{ tagName: 'document', child: [] }]
let currentText = null
const rules = []

function cssParse(content) {
    let ast = css.parse(content)
    // console.log(JSON.stringify(ast, null, 4));
    rules.push(...ast.stylesheet.rules)
    console.log(JSON.stringify(rules, null, 4));
}
function computeCss(element){
}

function emit(token) {
    let top = stack[stack.length - 1]
    if (token.type === 'startTag') {
        let element = { type: 'element', child: [], attr: [] }
        element.tagChar = token.tagChar
        for (const key in token) {
            if (key !== 'type' && key !== 'tagChar') {
                element.attr.push({ name: key, value: token[key] })
            }
        }
        computeCss(element)
        element.parent = top
        top.child.push(element)
        if (!token.isFinished) {
            stack.push(element)
        }
        currentText = null
    }
    else if (token.type === 'endTag') {
        if (token.tagChar === top.tagChar) {
            if (token.tagChar === 'style') {
                cssParse(currentText.content)
            }
            stack.pop()
        }
        else {
            throw new Error('Start tag and End tag dont\'t Match')
        }
        currentText = null
    }
    else if (token.type === 'text') {
        if (currentText === null) {
            currentText = {
                type: 'text',
                content: ''
            }
            top.child.push(currentText)
        }
        currentText.content += token.text
    }
    // console.log(stack);
}



function data(c) {
    if (c === '<') {
        return openTag;
    }
    else if (c === EOF) {
        emit({ type: 'EOF', text: c })
        return;
    }
    else {
        emit({ type: 'text', text: c })
        return data
    }
}

function openTag(c) {
    if (c.match(/^[a-zA-Z]$/)) {
        currentToken = { type: 'startTag', tagChar: '' }
        return startTag(c);
    }
    else if (c === '/') {
        return endTag
    }
    else {

    }
}

function startTag(c) {
    if (c.match(/^[a-zA-Z]$/)) {
        currentToken.tagChar += c
        return startTag
    }
    else if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttrTag
    }

    else if (c === '/') {
        return selfTag
    }
    else if (c === '>') {
        emit(currentToken)
        return data
    }
    else {
        return startTag
    }

}


function endTag(c) {
    if (c.match(/^[a-zA-Z]$/)) {
        currentToken = { type: 'endTag', tagChar: '' }
        return startTag(c)
    }
    else if (c === '>') {
        emit(currentToken)
        return data
    }
}

function beforeAttrTag(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttrTag
    }
    else if (c === '/') {
        return selfTag
    }
    else if (c === '>') {
        return startTag(c)
    }
    else {
        currentAttr = { tagName: '', tagVal: '' }
        return attrName(c)
    }
}

function attrName(c) {
    if (c === '=') {
        return beforeAttrVal
    } else {
        currentAttr.tagName += c
        return attrName
    }
}

function beforeAttrVal(c) {
    if (c === '\'') {
        return singleAttrVal
    }
    else if (c === '\"') {
        return dbSingleAttrVal
    }
    else {
        return unQuoted
    }
}

function singleAttrVal(c) {
    if (c === '\'') {
        return afterAttr
    } else {
        currentAttr.tagVal += c
        return singleAttrVal
    }
}

function dbSingleAttrVal(c) {
    if (c === '\"') {
        return afterAttr
    } else {
        currentAttr.tagVal += c
        return dbSingleAttrVal
    }
}

function unQuoted(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return afterAttr
    } else {
        currentAttr.tagVal += c
        return unQuoted
    }
}

function afterAttr(c) {
    currentToken[currentAttr.tagName] = currentAttr.tagVal
    return beforeAttrTag(c)
}

function selfTag(c) {
    if (c === '>') {
        currentToken.isFinished = true
        return startTag(c)
    }
}


module.exports.parseHTML = function parseHTML(html) {
    let state = data;
    for (const c of html) {
        // if (state) {
        //     let temState = state(c)
        //     state = temState === void 0 ? state : temState
        // }
        state = state(c)
    }
    state(EOF)
    // console.log(stack[0]);
}

