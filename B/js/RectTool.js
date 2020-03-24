class RectTool {
    constructor(app, tool) {
        this.app = app;
        this.tool = tool;
    }

    mousedown(e) {
        this.addRect(e);
    }

    mousemove(e) {
        console.log(this.rect)
        let style = this.rect.style;
        const {x, y} = this.tool.mousePoint(e);

        if(x < this.startX && y < this.startY) {
            style.left = x + "px"
            style.top = y + "px";
            style.width = this.startX - x + "px";
            style.height = this.startY - y + "px";
        }
        else if(x > this.startX && y > this.startY){
            style.left = this.startX + "px";
            style.top = this.startY + "px";
            style.width = x - this.startX + "px";
            style.height = y - this.startY + "px";
        }
        else if(x < this.startX && y > this.startY){
            style.left = x + "px";
            style.top = this.startY + "px";
            style.width = this.startX - x + "px";
            style.height = y - this.startY + "px";
        }
        else if(x > this.startX && y < this.startY){
            style.left = this.startX + "px";
            style.top = y + "px";
            style.width = x - this.startX + "px";
            style.height = this.startY - y + "px";
        }
    }

    mouseup(e) {
        let style = this.rect.style;
        style.backgroundColor = this.tool.color;
    }

    addRect(e) {
        const {x, y} = this.tool.mousePoint(e);
        this.startX = x; this.startY = y;
        this.rect = document.createElement('div'); 
        this.rect.id = `tool_${this.tool.clipNum += 1}`; 
        this.rect.classList.add('tool_rect');  

        let style = this.rect.style;
        style.left = this.startX + 'px';
        style.top = this.startY + 'px';
        style.zIndex = this.tool.clipNum;

        this.nowClip = document.querySelector(`#clip_${this.app.nowVideo.classList[0]}`);
        this.nowClip.appendChild(this.rect);
    }
}