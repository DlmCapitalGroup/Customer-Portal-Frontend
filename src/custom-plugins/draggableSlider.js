const slider = document.querySelector(".slides");
var isDown = false;
var startX;
var scrollLeft;

slider.addEventListener("mousedown", mouseDown);

slider.addEventListener("mouseleave", mouseLeave);

slider.addEventListener("mouseup", mouseUp);

slider.addEventListener("mousemove", mouseMove);

function mouseDown(e) {
    isDown = true;
    slider.classList.add("cursor-grab");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
}

function mouseLeave() {
    isDown = false;
    slider.classList.remove("cursor-grab");
}


function mouseMove(e) {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const move = (x - startX) * 3;
    slider.scrollLeft = scrollLeft - move;
}

function mouseUp() {
    isDown = false;
    slider.classList.remove("cursor-grab");
}