function setRootFontSize() {
    const deviceWidth = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
    const deviceHeight = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
    document.documentElement.style.fontSize = `${(deviceWidth / 400) * 10}px`; // 1rem === 10px
    document.getElementById("root")!.style.height = `${deviceHeight}px`;
}

if (window && document) {
    setRootFontSize();
}
if (!window.onresize) {
    window.onresize = function () { setRootFontSize(); };
}

export {};
