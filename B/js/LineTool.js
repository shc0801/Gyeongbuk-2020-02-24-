class LineTool {
    constructor(app, tool) {
        this.app = app;
        this.tool = tool;
    }

    mousedown(e) {
        this.tool.path = new Array;
        this.addCanvas();
        this.canvas = document.querySelector(`#clip_${this.tool.clipNum}`);
        this.ctx = this.canvas.getContext('2d');

        this.tool.savePoint(e);
        this.draw();

        // let track = new Track(this.app, this.tool, this);
    }

    mousemove(e) {
        this.tool.savePoint(e);
        this.draw();
    }

    mouseup(e) {
        if(this.tool.mouse)
        this.tool.selectPath.push(this.tool.path);
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.lineCap = "round";

        this.tool.path.forEach((path, i)=>{
            this.ctx.strokeStyle = path.color;
            this.ctx.lineWidth = path.w;
            if(i != 0)
                this.ctx.moveTo(this.tool.path[i-1].x, this.tool.path[i-1].y)
            else 
                this.ctx.moveTo(path.x, path.y);
            this.ctx.lineTo(path.x, path.y);
        });
        this.ctx.stroke();
    }

    addCanvas() {
        this.canvas = document.createElement("canvas");
        this.canvas.id = `clip_${this.tool.clipNum+=1}`;
        this.canvas.classList.add(`${this.tool.canvasNum+=1}`);
        this.canvas.width = 850;
        this.canvas.height = 480;
        this.canvas.style.zIndex = this.tool.clipNum;

        this.nowClip = document.querySelector(`#clip_${this.app.nowVideo.classList[0]}`);
        this.nowClip.appendChild(this.canvas);
    }
}