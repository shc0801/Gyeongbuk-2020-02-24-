class Select {
    constructor(app, tool) {
        this.app = app;
        this.tool = tool;

        this.moveClip = null;
    }

    mousedown(e) {
        this.tool.clear();
        this.cheak(e);
    }

    mousemove(e) {

    }

    mouseup(e) {

    }

    cheak(e) {
        const {x, y} = this.tool.mousePoint(e);

        if(e.target.tagName === 'CANVAS') {
            this.canvas = e.target;
            this.ctx = this.canvas.getContext('2d');
            this.color = this.ctx.getImageData(x - this.canvas.offsetLeft, y - this.canvas.offsetTop, 100, 100).data[3];
            if(this.color != 0) {
                this.moveClip = this.canvas;
                this.lineSelect();
            }
        } else if(e.target.tagName === 'DIV') {
            this.rect = e.target;
            this.rect.style.borderColor = borderColor;
            this.moveClip = this.rect;
        } else if(e.target.tagName === 'SPAN') {
            this.span = e.target;
            this.span.style.borderColor = borderColor;
            this.moveClip = this.span;
        }
        this.tool.selectClip = e.target;
        console.log(this.tool.selectClip)
    }

    lineSelect() {
        let selectPath = this.tool.selectPath[this.moveClip.classList[0] - 1];

        this.ctx.beginPath();
        selectPath.forEach((path, i)=>{
            this.ctx.lineCap = 'round';
            this.ctx.strokeStyle = borderColor;
            this.ctx.lineWidth = borderWidth + Number(path.w);
            
            if(i != 0)
                this.ctx.moveTo(selectPath[i-1].x, selectPath[i-1].y);
            else
                this.ctx.moveTo(path.x, path.y);
            this.ctx.lineTo(path.x, path.y);
        });
        this.ctx.stroke();
        
        this.ctx.beginPath();
        selectPath.forEach((path, i)=>{
            this.ctx.lineCap = 'round';
            this.ctx.strokeStyle = path.color;
            this.ctx.lineWidth = path.w;
            
            if(i != 0)
                this.ctx.moveTo(selectPath[i-1].x, selectPath[i-1].y);
            else
                this.ctx.moveTo(path.x, path.y);
            this.ctx.lineTo(path.x, path.y);
        });
        this.ctx.stroke();
    }
}