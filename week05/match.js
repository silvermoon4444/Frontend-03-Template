function match(selectors, element) {
    let selArr = selectors.split(' ')
    let lastSel = selArr[selArr.length - 1]

    let typeSel = computeSel(lastSel)


}

function computeSel(selector) {
    let tag = Symbol('tag')
    let typeSel = {
        '#': {
            name: '',
            count: 0
        },
        '.': {
            name: '',
            count: 0
        },
        [tag]: {
            name: '',
            count: 0
        }
    }
    if (lastSel.match(/#/)) {
        typeSel["#"].name
        typeSel["#"].count++
    }
    if (lastSel.match(/\./g)) {
        typeSel["."] += Number(lastSel.match(/\./g).length)
    }
    if ((lastSel.split('.').length > 1 && Boolean(lastSel.split('.')[0]) && !lastSel.split('.')[0].match(/#/)) || (lastSel.split('#').length > 1 && Boolean(lastSel.split('#')[0]) && !lastSel.split('.')[0].match(/\./))) {
        typeSel[tag]++
    }
    return typeSel
}