const slider = document.querySelector(".slides") as HTMLDivElement;
var isDown = false;
var startX: number;
var scrollLeft: number;

slider.addEventListener("mousedown", mouseDown);

slider.addEventListener("mouseleave", mouseLeave);

slider.addEventListener("mouseup", mouseUp);

slider.addEventListener("mousemove", mouseMove);

function mouseDown(e: any): void {
    isDown = true;
    slider.classList.add("cursor-grab");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
}

function mouseLeave(): void {
    isDown = false;
    slider.classList.remove("cursor-grab");
}

function mouseMove(e: any): void {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const move = (x - startX) * 3;
    slider.scrollLeft = scrollLeft - move;
}

function mouseUp(): void {
    isDown = false;
    slider.classList.remove("cursor-grab");
}

export { mouseDown, mouseLeave, mouseMove, mouseUp, slider };
