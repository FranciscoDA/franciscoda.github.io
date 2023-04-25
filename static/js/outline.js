function isElementInViewport (el) {
    // See: https://stackoverflow.com/questions/123999/how-can-i-tell-if-a-dom-element-is-visible-in-the-current-viewport
    // Special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top > -1 &&
        rect.left > -1 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
}

function generateOutline() {
    const outlineElement = document.getElementById("outline").getElementsByTagName("ol")[0];

    const anchors = Array.from(document.querySelectorAll("a[href^='#']"));
    const targets = [];
    const outlineItems = [];

    for (const anchor of anchors) {
        const targetId = anchor.getAttribute('href').slice(1);
        let targetElement = document.getElementById(targetId).querySelector("h1,h2,h3,h4,h5,h6");
        targets.push(targetElement);
        if (targetElement.hasChildNodes()) {
            targetElement = targetElement.firstChild;
        }

        const newItem = document.createElement('li');
        const newDiv = document.createElement('div');
        const newAnchor = document.createElement('a');

        newAnchor.innerText = targetElement.innerHTML.replace(" ¶", "");
        newAnchor.setAttribute("href", "#" + targetId);
        newDiv.appendChild(newAnchor);
        newItem.appendChild(newDiv);
        outlineElement.appendChild(newItem)

        outlineItems.push(newAnchor);
    }

    function detectVisibilityChanges() {
        for (const i in targets) {
            if (isElementInViewport(targets[i])) {
                outlineItems[i].classList.add("active")
                console.log("item", i, "is visible");
            }
            else {
                outlineItems[i].classList.remove("active")
                console.log("item", i, "is not visible");
            }
        }
    }

    window.addEventListener("scroll", detectVisibilityChanges);
    window.addEventListener("resize", detectVisibilityChanges);
    detectVisibilityChanges()
}

window.addEventListener("load", generateOutline);