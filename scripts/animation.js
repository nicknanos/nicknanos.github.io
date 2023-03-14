let canvas;
let ctx;
let flowField;
let flowFieldAnimation;
let welcomBox;

window.onload = ()=>{
    canvas = document.getElementById("homeCanvas");
    ctx = canvas.getContext("2d");
    initializeAnimation();
}

window.addEventListener('resize', ()=>{
    cancelAnimationFrame(flowFieldAnimation);
    initializeAnimation();
});

function initializeAnimation() {
    welcomBox = document.querySelector('.welcome');
    canvas.width = welcomBox.offsetWidth;
    canvas.height = welcomBox.offsetHeight;
    flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
    flowField.animate(0);
}

const mouse = {
    x:0,
    y:0,
}

window.addEventListener('mousemove', (e)=>{
    mouse.x = e.x;
    mouse.y = e.y;
});

class FlowFieldEffect {
    #ctx;
    #width;
    #height;

    constructor(ctx, width, height){
        this.#ctx = ctx;
        //this.#ctx.strokeStyle = 'rgb(185, 41, 41)';
        this.#ctx.lineWidht = 5;
        this.#width = width;
        this.#height = height;
        //this.angle = 0;
        this.lastTime = 0;
        this.interval = 1000/60;
        this.timer = 0;
        this.cellSize = 150;
        this.gradient;
        this.#createGradient();
        this.#ctx.strokeStyle = this.gradient;
    }

    #createGradient() {
        this.gradient = this.#ctx.createLinearGradient(0, 0, this.#width, this.#height);
        this.gradient.addColorStop("0.1", "#392B58");
        this.gradient.addColorStop("0.9", "#17301C");    
    }

    #drawLine(x,y){
        const length = 300;
        this.#ctx.beginPath();
        this.#ctx.moveTo(x,y);
        this.#ctx.lineTo(mouse.x, mouse.y);
        //this.#ctx.lineTo(x+5, y+5);
        this.#ctx.stroke();
    }

    animate(timeStamp){
        let deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;
        if (this.timer > this.interval){
            //this.angle += 0.1;
            this.#ctx.clearRect(0, 0, this.#width, this.#height);
            for (let y = 0; y < this.#height; y+=this.cellSize){
                for (let x = 0; x < this.#width; x+=this.cellSize){
                    this.#drawLine(x, y);
                }
            }
            //this.#drawLine(this.#width/2 , this.#height/2);
            //this.#draw(this.#width/2 + Math.sin(this.angle)*100, this.#height/2 + Math.cos(this.angle)*50);
            this.timer = 0;
            console.log("animating");
        }else {
            this.timer += deltaTime;
        }
        
        flowFieldAnimation = requestAnimationFrame(this.animate.bind(this));
    }
}
