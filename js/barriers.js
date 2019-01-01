let interval_y_bottom = 0;

function move() {
    let pos_y = -70,
        barrier = document.getElementById("barrier"),
        container = document.getElementById("container"),
        contWidth = container.clientWidth,
        contHeight = container.clientHeight;

    function moveY() {
        if (pos_y >= (contHeight + 50)) {
            clearInterval(interval_y_bottom);
            barrier.style.top = "-70px";
            pos_y = -70;
            interval_y_bottom = setInterval(moveAgain, 5);
        } else {
            pos_y++;
            barrier.style.top = `${pos_y}px`;
        }
    }
    interval_y_bottom = setInterval(moveY, 5);

    function moveAgain() {
        if (pos_y >= (contHeight + 50)) {
            clearInterval(interval_y_bottom);
            barrier.style.top = "-70px";
            pos_y = -70;
            interval_y_bottom = setInterval(moveY, 5);
        } else {
            pos_y++;
            barrier.style.top = `${pos_y}px`;
        }
    }
}

move();