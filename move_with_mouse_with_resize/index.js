var cursor = {
    x: 0,
    y: 0
};

var dragobj = null, h1, i1, oLeft, oTop;

/**
 * Returns the element with the provided id
 * @param {string} id: HtmlElement ID
 * @returns htmlElement
 */
function rel(id) {
    if (id) {
        return document.getElementById(id)
    } else {
        return null
    }
}

/**
 * Writes a text on an HtmlElement
 * @param {HtmlElement} ob 
 * @param {string} txt 
 */
function gTxt(ob, txt) {
    rel(ob).innerHTML = txt;
}

/**
 * Assigns onmousedown, onmouseup and onmousemove event handlers to the provided htmlElement
 * @param {HtmlEvent} event
 */
function makeObjectToDrag(event) {
    let element = event.target
    let elementDim = {x: element.clientWidth, y: element.clientHeight}
    let cursorPos = getCursorPos(event)
    let elementPos = findPos(element)
    let elementEnd = {x: elementPos.x + elementDim.x, y: elementPos.y + elementDim.y}
    const ALLOWANCE = 5

    if (Math.abs(elementEnd.x - cursorPos.x) < ALLOWANCE && Math.abs(elementEnd.y - cursorPos.y) < ALLOWANCE) return

    if (element) {
        dragobj = rel(element.id);
        document.onmousedown = startMove;
        document.onmouseup = drop;
        document.onmousemove = moving;
    }
}

/**
 * Iteratively get the offset from parent, and the offset of parent from grandparent, and so on, till the root node.
 * https://www.quirksmode.org/js/findpos.html
 * @param {HtmlElement} element 
 * @returns 
 */
function findPos(element) {
    let curleft = curtop = 0

    if (element.offsetParent) {
        do{
            curleft += element.offsetLeft
            curtop += element.offsetTop
        } while (element = element.offsetParent)
    }

    return {x: curleft, y: curtop}
}

/**
 * 
 * @param {HtmlEvent} event 
 */
function startMove(event) {
    if (dragobj) {
        getCursorPos(event);
        dragobj.className = "moving";
        i1 = cursor.x - dragobj.offsetLeft;
        h1 = cursor.y - dragobj.offsetTop;
    }
}

/**
 * Returns the element to it's original state, where it simply waits for an onmousedown event
 * It also clears the dragobject variable, since the dragging has stopped.
 */
function drop() {
    if (dragobj) {
        dragobj.className = "move";
        dragobj = null;
    }
}

/**
 * Returns the cursor position of the dragged object
 * @param {HtmlEvent} event 
 * @returns {x: number, y: number}
 */
function getCursorPos(event) {
    event = event || window.event;
    if (event.pageX || event.pageY) {
        cursor.x = event.pageX;
        cursor.y = event.pageY;
    } else {
        let documentElement = document.documentElement;
        let documentBody = document.body;
        cursor.x = event.clientX +
            (documentElement.scrollLeft || documentBody.scrollLeft) - (documentElement.clientLeft || 0);
        cursor.y = event.clientY +
            (documentElement.scrollTop || documentBody.scrollTop) - (documentElement.clientTop || 0);
    }
    
    return cursor;
}

/**
 * Moves the object being dragged
 * @param {HtmlEvent} event 
 */
function moving(event) {
    getCursorPos(event);
    if (dragobj) {
        oLeft = cursor.x - i1;
        oTop = cursor.y - h1;
        dragobj.style.left = oLeft + 'px';
        dragobj.style.top = oTop + 'px';
    }
}