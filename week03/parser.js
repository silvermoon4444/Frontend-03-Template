const EOF = Symbol('EOF')
let currentToken = null

function emit(token) {
    console.log(token);
}


function data(char) {
    if (char === '<') {
        return openTag;
    }
    else if (char === 'EOF') {
        emit({ type: 'EOF', text: char })
        return;
    }
    else {
        emit({ type: 'text', text: char })
        return data
    }
}

function openTag(char) {
    if (char.match(/^[a-zA-Z]$/)) {
        currentToken = { type: 'startTag', tagChar: '' }
        return startTag(char);
    }
    else if (char === '/') {
        return endTag
    }
    else {

    }
}

function startTag(char) {
    if (char.match(/^[a-zA-Z]$/)) {
        currentToken.tagChar += char
        return startTag
    }
    else if (char.match(/^[\t\n\f ]$/)) {
        return attrTag
    }

    else if (char === '/') {
        return selfTag
    }
    else if (char === '>') {
        emit(currentToken)
        return data
    }
    else {
        return startTag
    }

}


function endTag(char) {
    if (char.match(/^[a-zA-Z]$/)) {
        currentToken = { type: 'endTag', tagChar: '' }
        return startTag(char)
    }
    else if (char === '>') {
        emit(currentToken)
        return data
    }
}

function attrTag(char) {
    if (char.match(/^[\t\n\f ]$/)) {
        return attrTag
    }
    else if (char.match(/^[a-zA-Z]$/)) {
        return attrTag
    }
    else if (char === '=') {
        return attrTag
    }
    else if (char === '/') {
        return selfTag
    }
    else if (char === '>') {
        return startTag(char)
    }
    else {
        return attrTag
    }
}

function selfTag(char) {
    if (char === '>') {
        currentToken.isFinished = true
        return startTag(char)
    }
}

module.exports.parseHTML = function parseHTML(html) {
    // console.log('html', html);
    let state = data;
    for (const char of html) {
        // if (state) {
        //     let temState = state(char)
        //     state = temState === void 0 ? state : temState
        // }
        state = state(char)
    }
    state(EOF)
}

