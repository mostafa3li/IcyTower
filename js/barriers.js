let barrierCanvas = document.querySelector("canvas"),
    container = document.getElementsByClassName("container")[0],
    contWidth = container.clientWidth,
    contHeight = container.clientHeight,
    barrier = barrierCanvas.getContext("2d"),
    // initial barrier data 
    barrierData = {
        width: 300,
        height: 50,
        y: Math.floor(Math.random() * (contHeight - this.height)),
        x: Math.floor(Math.random() * (contWidth - this.width)),
        // test function for colors
        getRandomColor: () => {
            let letters = '0123456789ABCDEF',
                color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        },
    },
    // game levels 
    level = {
        one: 1,
        two: 3,
        three: 5
    };
barrierCanvas.width = contWidth;
barrierCanvas.height = contHeight;

function Barrier(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.generateBarrier = function () {
        barrier.fillRect(this.x, this.y, this.width, this.height);
        // console.log("barier generated");
    }

    this.moveBarriers = function () {
        this.generateBarrier();
        this.y += level.one;
        if (this.y > contHeight) {
            this.y = 0;
            barrier.fillStyle = barrierData.getRandomColor();
            this.x = Math.floor(Math.random() * (contWidth - this.width));
        }
    }
}


let barriersArray = [];
for (let i = 0; i < 5; i++) {
    let x = Math.floor(Math.random() * (contWidth - barrierData.width));
    let y = Math.floor(Math.random() * (contHeight - barrierData.height));
    barriersArray.push(new Barrier(x, y, barrierData.width, barrierData.height));
}

console.log(barriersArray);

function moveDown() {
    // condition to check first if the player jumped up
    if (true) {
        requestAnimationFrame(moveDown);
    }
    barrier.clearRect(0, 0, contWidth, contHeight);

    for (let i = 0; i < barriersArray.length; i++) {
        barriersArray[i].moveBarriers();
    }
}
moveDown();


/*
function generateBarrier() {
    barrier.fillRect(barrierData.x, barrierData.y, barrierData.width, barrierData.height);
}
*/

/*
function moveBarriers() {
    requestAnimationFrame(moveBarriers);
    barrier.clearRect(0,0,contWidth,contHeight);
    generateBarrier();
    // let x = setInterval(generateBarrier(), 3);
    
    barrierData.y += level.two;
    if (barrierData.y > contHeight) {
        barrierData.y = 0;
        barrier.fillStyle = barrierData.getRandomColor();
        barrierData.x = Math.floor(Math.random() * (contWidth - barrierData.width));
    }
    console.log(barrierData.y);
    console.log(contHeight);
}
moveBarriers();
*/

// for(let i = 0; i<10; i++) {
//     let barrier_x = Math.floor(Math.random() * (contWidth - barrierData.width)),
//         barrier_y = Math.floor(Math.random() * (contHeight - barrierData.height));

//     barrier.fillStyle = getRandomColor();
//     barrier.fillRect(barrier_x,barrier_y,300,50);
// }