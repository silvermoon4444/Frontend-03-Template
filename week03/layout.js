function getStyle(element) {
  if (!element.style) {
    element.style = {};
  }
  for (let prop in element.computedStyle) {
    element.style[prop] = element.computedStyle[prop].value;

    if (element.style[prop].toString().match(/px$/)) {
      element.style[prop] = parseFloat(element.style[prop]);
    }
    if (element.style[prop].toString().match(/^[0-9\.]+$/)) {
      element.style[prop] = parseFloat(element.style[prop]);
    }
  }
  return element.style;
}

function layout(element) {
  if (element.computedStyle) {
    let elementStyle = getStyle(element);
    if (elementStyle.display === "flex") {
      let sons = element.child.filter((v) => v.type === "element");
      sons.sort((a, b) => (a.order || 0) - (b.order || 0));
      let style = elementStyle[("width", "height")] //?
        .forEach((size) => {
          if (style[size] === "auto" || style[size] === "") {
            style[size] = null;
          }
        });
      if (!style.flexDirection || style.flexDirection === "auto") {
        style.flexDirection === "row";
      }
      if (!style.alignItems || style.alignItems === "auto") {
        style.alignItems === "stretch";
      }
      if (!style.justifyContent || style.justifyContent === "auto") {
        style.justifyContent === "flex-start";
      }
      if (!style.flexWrap || style.flexWrap === "auto") {
        style.justifyContent === "nowrap";
      }
      if (!style.alignContent || style.alignContent === "auto") {
        style.justifyContent === "stretch";
      }

      let mainSize,
        mainStart,
        mainEnd,
        mainSign,
        mainBase,
        crossSize,
        crossStart,
        crossEnd,
        crossSign,
        crossBase;

      if (style.flexDirection === "row") {
        mainSize = "width";
        mainStart = "left";
        mainEnd = "right";
        mainSign = +1;
        mainBase = 0;

        crossSize = "height";
        crossStart = "top";
        crossEnd = "bottom";
      } else if (style.flexDirection === "row-reverse") {
        mainSize = "width";
        mainStart = "right";
        mainEnd = "left";
        mainSign = -1;
        mainBase = style.width;

        crossSize = "height";
        crossStart = "top";
        crossEnd = "bottom";
      } else if (style.flexDirection === "column") {
        mainSize = "height";
        mainStart = "top";
        mainEnd = "bottom";
        mainSign = +1;
        mainBase = 0;

        crossSize = "width";
        crossStart = "left";
        crossEnd = "right";
      } else if (style.flexDirection === "column-reverse") {
        mainSize = "height";
        mainStart = "bottom";
        mainEnd = "top";
        mainSign = -1;
        mainBase = style.height;

        crossSize = "width";
        crossStart = "left";
        crossEnd = "right";
      }

      if (style.flexWrap === "wrap-reverse") {
        let tmp = crossStart;
        crossStart = crossEnd;
        crossEnd = tmp;
        crossSign = -1;
      } else {
        crossBase = 0;
        crossSign = 1;
      }

      let isAutoMainAxis = false;

      if (!style[mainSize]) {
        for (const son of sons) {
          let sonStyle = getStyle(son);
          if (sonStyle[mainSize] !== null && sonStyle[mainSize] !== void 0) {
            style[mainSize] += sonStyle[mainSize];
          }
        }
        isAutoMainAxis = true;
      }

      let flexLines = [];
      let flexLine = [];
      flexLines.push(flexLine);
      let mainSpace = style[mainSize];
      let crossSpace = 0;

      for (const son of sons) {
        let sonStyle = getStyle(son);

        if (!sonStyle[mainSize]) {
          sonStyle[mainSize] = 0;
        }
        if (sonStyle.flex) {
          flexLine.push(son);
        } else if (style.justifyContent === "nowrap" && isAutoMainAxis) {
          mainSpace -= sonStyle;
          if (sonStyle[crossSize] !== null && sonStyle[crossSize] !== void 0) {
            crossSpace = Math.max(sonStyle[crossSize], crossSpace);
          }
          flexLine.push(son);
        } else {
          if (sonStyle[mainSize] > style[mainSize]) {
            sonStyle[mainSize] = style[mainSize];
          }
          if (sonStyle[mainSize] > mainSpace) {
            flexLine.mainSpace = mainSpace;
            flexLine.crossSpace = crossSpace;
            flexLine = [son];
            flexLines.push(flexLine);
            mainSpace = style[mainSpace];
            crossSpace = 0;
          } else {
            flexLine.push(son);
          }
          if (sonStyle[crossSize] !== null && sonStyle[crossSize] !== void 0) {
            crossSpace = Math.max(sonStyle[crossSize], crossSpace);
          }
          mainSpace -= sonStyle[mainSize];
        }
      }
      flexLine.mainSpace = mainSpace;
      if (mainSpace < 0) {
        let scale = style[mainSize] / (style[mainSize] - mainSpace);
        let currentMain = mainBase;
        for (const son of sons) {
          let sonStyle = getStyle(son);

          if (sonStyle.flex) {
            sonStyle[mainSize] = 0;
          }

          sonStyle[mainSize] = sonStyle[mainSize] * scale;
          mainStart = currentMain;
          mainEnd = currentMain + mainSign * sonStyle[mainSize];
          currentMain = mainEnd;
        }
      } else {
        let flexCount = 0;
        flexLines.forEach((currentLineItem) => {
          for (const son of currentLineItem) {
            let sonStyle = getStyle(son);

            if (sonStyle.flex) {
              flexCount++;
            }
          }
          if (flexCount > 0) {
            let currentMain = mainBase;
            for (const son of currentLineItem) {
              let sonStyle = getStyle(son);
              if (sonStyle.flex) {
                sonStyle[mainSize] = mainSpace * (sonStyle.flex / flexCount);
              }
              mainStart = currentMain;
              mainEnd = currentMain + mainSign * sonStyle[mainSize];
              currentMain = mainEnd;
            }
          } else {
              
          }
        });
      }
    }
  }
}

module.exports = layout;
