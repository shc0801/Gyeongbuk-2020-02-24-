class TextTool {
    constructor(app, tool) {
        this.app = app;
        this.tool = tool;

        this.active = false;

        this.addEvent();
    }
    addEvent() {
        window.addEventListener("click", (e)=>{
            if(this.active) {
                console.log(this.active)
                if(this.input.value === '')
                    this.input.remove();
                else {
                    this.input.remove();
                    this.addSpan();
                }
                this.active = false;
            }
        })
    }

    mousedown(e) {
        if(!this.active) {
            this.addInput(e);
            this.active = true;
        }
    }

    mousemove(e) {

    }

    mouseup(e) {
        
    }

    addInput(e) {
        const {x, y} = this.tool.mousePoint(e);

        this.input = document.createElement("input");
        this.input.classList.add('tool_input');  
        this.input.type = 'text';

        let style = this.input.style;
        style.top = y + 'px';
        style.left = x + 'px';
        style.color = this.tool.color;
        style.fontSize = this.tool.fontSize + 'px';
        style.zIndex = this.tool.clipNum;

        this.nowClip = document.querySelector(`#clip_${this.app.nowVideo.classList[0]}`);
        this.nowClip.appendChild(this.input);
    }

    addSpan(e) {
        this.span = document.createElement("span");
        this.span.id = `tool_${this.tool.clipNum += 1}`; 
        this.span.innerText = this.input.value
        this.span.style = this.input.style.cssText;

        this.nowClip = document.querySelector(`#clip_${this.app.nowVideo.classList[0]}`);
        this.nowClip.appendChild(this.span);
    }
}