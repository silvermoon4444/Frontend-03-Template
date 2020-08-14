const EOF = Symbol('EOF')
let currentToken = null
let currentAttr = null

function emit(token) {
    console.log(token);
}


function data(c) {
    if (c === '<') {
        return openTag;
    }
    else if (c === 'EOF') {
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
    // console.log('html', html);
    let state = data;
    for (const c of html) {
        // if (state) {
        //     let temState = state(c)
        //     state = temState === void 0 ? state : temState
        // }
        state = state(c)
    }
    state(EOF)
}

