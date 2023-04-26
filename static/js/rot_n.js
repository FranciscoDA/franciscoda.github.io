function rotN(s, n, r=256) {
    result = "";
    for (let i = 0; i < s.length; i++) {
        const v = s.charCodeAt(i) + n;
        result += String.fromCharCode((v < 0 ? r + v : v) % r);
    }
    return result;
}

window.addEventListener("load", function () {
    const elements = document.querySelectorAll("a[data-rot-n][data-rot-href]");
    for (let el of elements) {
        el.addEventListener("mouseover", function(ev) {
            const n = el.getAttribute("data-rot-n");
            const rotHref = el.getAttribute("data-rot-href");
            el.setAttribute("href", rotN(atob(rotHref), -n));
        })
    }
});
