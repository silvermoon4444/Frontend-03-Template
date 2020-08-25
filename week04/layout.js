function getStyle(element) {
    if (!element.style) {
        element.style = {}
    }
    for (let prop in element.computedStyle) {
        if (prop !== 'specificity') {
            element.style[prop] = element.computedStyle[prop]

            if (element.computedStyle[prop].toString().match(/px$/)) {
                element.style[prop] = parseFloat(element.computedStyle[prop])
            }
            if (element.computedStyle[prop].toString().match(/^[0-9\.]+$/)) {
                element.style[prop] = parseFloat(element.computedStyle[prop])
            }
        }
    }
    return element.style
}

function layout(element) {
    if (element.computedStyle) {
        let elementStyle = getStyle(element)
        if (elementStyle.display === 'flex') {
            let sons = element.child.filter(v => v.type === 'element')
            sons.sort((a, b) => (a.order || 0) - (b.order || 0))
            let style = elementStyle;
            ['width', 'height'].forEach(size => {
                if (style[size] === 'auto' || style[size] === '') {
                    style[size] = null
                }
            })
            if (!style.flexDirection || style.flexDirection === 'auto') {
                style.flexDirection = 'row'
            }
            if (!style.alignItems || style.alignItems === 'auto') {
                style.alignItems = 'stretch'
            }
            if (!style.justifyContent || style.justifyContent === 'auto') {
                style.justifyContent = 'flex-start'
            }
            if (!style.flexWrap || style.flexWrap === 'auto') {
                style.flexWrap = 'nowrap'
            }
            if (!style.alignContent || style.alignContent === 'auto') {
                style.alignContent = 'stretch'
            }

            let mainSize, mainStart, mainEnd, mainSign, mainBase, crossSize, crossStart, crossEnd, crossSign, crossBase

            if (style.flexDirection === 'row') {
                mainSize = 'width'
                mainStart = 'left'
                mainEnd = 'right'
                mainSign = +1
                mainBase = 0

                crossSize = 'height'
                crossStart = 'top'
                crossEnd = 'bottom'
            }
            else if (style.flexDirection === 'row-reverse') {
                mainSize = 'width'
                mainStart = 'right'
                mainEnd = 'left'
                mainSign = -1
                mainBase = style.width

                crossSize = 'height'
                crossStart = 'top'
                crossEnd = 'bottom'
            }
            else if (style.flexDirection === 'column') {
                mainSize = 'height'
                mainStart = 'top'
                mainEnd = 'bottom'
                mainSign = +1
                mainBase = 0

                crossSize = 'width'
                crossStart = 'left'
                crossEnd = 'right'
            }
            else if (style.flexDirection === 'column-reverse') {
                mainSize = 'height'
                mainStart = 'bottom'
                mainEnd = 'top'
                mainSign = -1
                mainBase = style.height

                crossSize = 'width'
                crossStart = 'left'
                crossEnd = 'right'
            }

            if (style.flexWrap === 'wrap-reverse') {
                let tmp = crossStart
                crossStart = crossEnd
                crossEnd = tmp
                crossSign = -1
            }
            else {
                crossBase = 0
                crossSign = 1
            }

            let isAutoMainAxis = false

            if (!style[mainSize]) {
                for (const son of sons) {
                    let sonStyle = getStyle(son)
                    if (sonStyle[mainSize] !== null && sonStyle[mainSize] !== (void 0)) {
                        style[mainSize] += sonStyle[mainSize]
                    }
                }
                isAutoMainAxis = true
            }

            let flexLines = []
            let flexLine = []
            flexLines.push(flexLine)
            let mainSpace = style[mainSize]
            let crossSpace = 0

            for (const son of sons) {
                let sonStyle = getStyle(son)

                if (!sonStyle[mainSize]) {
                    sonStyle[mainSize] = 0
                }
                if (sonStyle.flex) {
                    flexLine.push(son)
                }
                else if (style.justifyContent === 'nowrap' && isAutoMainAxis) {
                    mainSpace -= sonStyle
                    if (sonStyle[crossSize] !== null && sonStyle[crossSize] !== (void 0)) {
                        crossSpace = Math.max(sonStyle[crossSize], crossSpace)
                    }
                    flexLine.push(son)
                }
                else {
                    if (sonStyle[mainSize] > style[mainSize]) {
                        sonStyle[mainSize] = style[mainSize]
                    }
                    if (sonStyle[mainSize] > mainSpace) {
                        flexLine.mainSpace = mainSpace
                        flexLine.crossSpace = crossSpace
                        flexLine = [son]
                        flexLines.push(flexLine)
                        mainSpace = style[mainSpace]
                        crossSpace = 0
                    }
                    else {
                        flexLine.push(son)
                    }
                    if (sonStyle[crossSize] !== null && sonStyle[crossSize] !== (void 0)) {
                        crossSpace = Math.max(sonStyle[crossSize], crossSpace)
                    }
                    mainSpace -= sonStyle[mainSize]
                }
            }
            flexLine.mainSpace = mainSpace
            // 主轴计算
            if (mainSpace < 0) {
                let scale = style[mainSize] / (style[mainSize] - mainSpace)
                let currentMain = mainBase

                for (const son of sons) {
                    let sonStyle = getStyle(son)
                    if (sonStyle.flex) {
                        sonStyle[mainSize] = 0
                    }
                    sonStyle[mainSize] *= scale
                    sonStyle[mainStart] = currentMain
                    sonStyle[mainEnd] = sonStyle[mainStart] + sonStyle[mainSize] * mainSign
                    currentMain = sonStyle[mainEnd]
                }
            }
            else {
                flexLines.forEach(currentLine => {
                    let flexTotal = 0
                    let mainSpace = currentLine.mainSpace
                    for (const son of currentLine) {
                        let sonStyle = getStyle(son)
                        if (sonStyle.flex) {
                            flexTotal += Number(sonStyle.flex)
                        }
                    }
                    if (flexTotal > 0) {
                        let currentMain = mainBase
                        for (const son of currentLine) {
                            let sonStyle = getStyle(son)

                            if (sonStyle.flex) {
                                sonStyle[mainSize] = mainSpace * (sonStyle.flex / flexTotal)
                            }

                            sonStyle[mainStart] = currentMain
                            sonStyle[mainEnd] = sonStyle[mainStart] + mainSign * sonStyle[mainSize]
                            currentMain = sonStyle[mainEnd]
                        }
                    }
                    else {
                        let currentLineStyle = getStyle(currentLine)

                        if (currentLineStyle.flexDirection === 'flex-start') {
                            let currentMain = mainBase
                            let step = 0
                        }
                        else if (currentLineStyle.flexDirection === 'flex-end') {
                            let currentMain = mainBase + mainSign * mainSpace
                            let step = 0
                        }
                        else if (currentLineStyle.flexDirection === 'center') {
                            let currentMain = mainBase + mainSign * (mainSpace / 2)
                            let step = 0
                        }
                        else if (currentLineStyle.flexDirection === 'space-between') {
                            let step = mainSpace / (currentLine.length - 1)
                            let currentMain = mainBase
                        }
                        else if (currentLineStyle.flexDirection === 'space-around') {
                            let step = mainSpace / currentLine.length
                            let currentMain = mainBase + mainSign * (step / 2)
                        }

                    }
                })
                // 交叉轴计算

                if (style[crossSize]) {
                    crossSpace = style[crossSize]
                    for (const flexLine of flexLines) {
                        if (flexLine.crossSpace) {
                            crossSpace -= flexLine.crossSpace
                        }

                    }
                }
                else {
                    crossSpace = 0
                    style[crossSize] = 0
                    for (const flexLine of flexLines) {
                        style[crossSize] += flexLine[crossSize]
                    }
                }

                if (style.flexWrap === 'wrap-reverse') {
                    crossBase = style[crossSize]
                }
                else {
                    crossBase = 0
                }

                let lineSize = style[crossSize] / flexLines.length

                let step = 0
                if (style.alignContent === 'flex-start') {
                    crossBase += 0
                    step = 0
                }
                else if (style.alignContent === 'flex-end') {
                    crossBase += crossSign * crossSpace
                    step = 0
                }
                else if (style.alignContent === 'center') {
                    crossBase += crossSign * (crossSpace / 2)
                    step = 0
                }
                else if (style.alignContent === 'space-between') {
                    step = crossSpace / (flexLines.length - 1)
                    crossBase += 0
                }
                else if (style.alignContent === 'space-around') {
                    step = crossSpace / flexLines.length
                    crossBase += crossSign * (step / 2)
                }
                else if (style.alignContent === 'stretch') {
                    crossBase += 0
                    step = 0
                }

                flexLines.forEach(currentLine => {
                    if (!currentLine.crossSpace) {
                        currentLine.crossSpace = 0
                    }
                    let lineCrossSize = style.alignContent === 'stretch' ? (currentLine.crossSpace + crossSpace / flexLines.length) : currentLine.crossSpace

                    for (const son of currentLine) {
                        let sonStyle = getStyle(son)
                        let align = sonStyle.alignSelf || style.alignItems
                        if (sonStyle[crossSize] === null) {
                            sonStyle[crossSize] = (align === 'stretch') ? lineCrossSize : 0
                        }

                        if (align === 'flex-start') {
                            sonStyle[crossStart] = crossBase
                            sonStyle[crossEnd] = sonStyle[crossStart] + crossSign * sonStyle[crossSize]
                        }
                        else if (align === 'flex-end') {
                            sonStyle[crossEnd] = crossBase + crossSign * lineCrossSize
                            sonStyle[crossStart] = sonStyle[crossEnd] - crossSign * sonStyle[crossSize]
                        }
                        else if (align === 'center') {
                            sonStyle[crossStart] = crossBase + crossSign * (lineCrossSize - sonStyle[crossSize]) / 2
                            sonStyle[crossEnd] = sonStyle[crossStart] + crossSign * sonStyle[crossSize]
                        }
                        else if (align === 'stretch') {
                            sonStyle[crossStart] = crossBase
                            sonStyle[crossEnd] = sonStyle[crossStart] + (sonStyle[crossSize] || lineCrossSize)

                            sonStyle[crossSize] = crossSign * (sonStyle[crossEnd] - sonStyle[crossStart])
                        }
                    }
                    crossBase += crossSign * (lineCrossSize + step)
                })
            }
            // console.log(sons);
        }
    }
}

module.exports = layout
