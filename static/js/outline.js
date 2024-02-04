function isElementInViewport (el, contained=true) {
    // See: https://stackoverflow.com/questions/123999/how-can-i-tell-if-a-dom-element-is-visible-in-the-current-viewport
    // Special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    if (contained) {
        const topIntersect = rect.top > -1;
        const leftIntersect = rect.left > -1;
        const bottomIntersect = rect.bottom <= (window.innerHeight || document.documentElement.clientHeight); /* or $(window).height() */
        const rightIntersect = rect.right <= (window.innerWidth || document.documentElement.clientWidth);
        return topIntersect && leftIntersect && bottomIntersect && rightIntersect;
    }
    else {
        const topIntersect = rect.top <= (window.innerHeight || document.documentElement.clientHeight); /* or $(window).height() */
        const leftIntersect = rect.left <= (window.innerWidth || document.documentElement.clientWidth);
        const bottomIntersect = rect.bottom > -1;
        const rightIntersect = rect.right > -1;
        return topIntersect && leftIntersect && bottomIntersect && rightIntersect;
    }

    //return contained ? () : (topIntersect && leftIntersect || bottomIntersect || rightIntersect);
}

function generateOutline() {
    const outlineElement = document.getElementById("outline").getElementsByTagName("ol")[0];

    //const anchors = Array.from(document.querySelectorAll("a[href^='#']"));
    //const targets = [];
    const targets = Array.from(document.querySelectorAll("section[id][name]"));
    const outlineItems = [];

    for (const target of targets) {
    // for (const anchor of anchors) {
        /*const targetId = anchor.getAttribute('href').slice(1);
        let targetElement = document.getElementById(targetId).querySelector("h1,h2,h3,h4,h5,h6");
        targets.push(targetElement);
        if (targetElement.hasChildNodes()) {
            targetElement = targetElement.firstChild;
        }*/

        const newItem = document.createElement('li');
        const newDiv = document.createElement('div');
        const newAnchor = document.createElement('a');

        newAnchor.innerHTML = target.getAttribute("name");
        newAnchor.setAttribute("href", "#" + target.getAttribute("id"));
        newDiv.appendChild(newAnchor);
        newItem.appendChild(newDiv);
        outlineElement.appendChild(newItem)

        outlineItems.push(newAnchor);
    }

    function detectVisibilityChanges() {
        for (const i in targets) {
            if (isElementInViewport(targets[i], false)) {
                outlineItems[i].classList.add("active")
            }
            else {
                outlineItems[i].classList.remove("active")
            }
        }
    }

    window.addEventListener("scroll", detectVisibilityChanges);
    window.addEventListener("resize", detectVisibilityChanges);
    detectVisibilityChanges()
}

window.addEventListener("load", generateOutline);
