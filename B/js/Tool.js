class Tool {
    constructor(app) {
    this.app = app;

    this.path = new Array;
    this.selectPath = new Array;

    this.move = {
        line: false,
        rect: false,
        text: false
    }
    this.mouse = false;

    this.clipNum = 0;
    this.canvasNum = 0;
     
    // class   
    this.line = new LineTool(this.app, this);
    this.rect = new RectTool(this.app, this);
    this.text = new TextTool(this.app, this);
    this.select = new Select(this.app, this);

    // dom
    this.$toolBtn = document.querySelectorAll(".edit > button");
    this.addEvent();
    }

    get color() { return document.querySelector("#color").value; }
    get fontSize() { return document.querySelector("#fontSize").value; }
    get strokeWidth() { return document.querySelector("#strokeWidth").value; }

    addEvent() {
        this.$toolBtn.forEach(btn=>{
            btn.addEventListener("click", e=>{
                if(!this.app.nowVideo) { alert("먼저 영화를 선택해주세요!"); return; }
                this.nowTool = btn.dataset.tool;
                this.setTool = this[this.nowTool];
            })
        })

        this.app.$screen.addEventListener("mousedown", e=>{
            if(!this.nowTool || e.which !== 1 || this.nowTool == 'text') return; 
            this.mouse = true;
            this.setTool.mousedown(e);
        })

        window.addEventListener("mousemove", e=>{
            if(!this.nowTool || e.which !== 1) return; 
            if(!this.nowTool || this.nowTool == 'text') return;
            if(!this.mouse) return;
            this.setTool.mousemove(e);
        })

        window.addEventListener("mouseup", e=>{
            if(!this.nowTool || e.which !== 1) return; 
            if(!this.nowTool) return;
            this.setTool.mouseup(e);
            this.mouse = false;
        })
    }

    mousePoint(e) {
        const { pageX, pageY } = e;
        let x = pageX - this.app.$screen.offsetLeft;
        x = x < 0 ? 0 : this.app.$screen.width < x ? this.app.$screen.width : x;
        let y = pageY - this.app.$screen.offsetTop;
        y = y < 0 ? 0 : this.app.$screen.height < y ? this.app.$screen.height : y;
        return { x: x, y: y };
    }

    savePoint(e) {
        let { x, y } = this.mousePoint(e);
        let canvasWidth = this.app.$canvas.offsetWidth;
        let canvasHeight = this.app.$canvas.offsetHeight;
        x = x < 0 ? 0 : x > canvasWidth ? canvasWidth : x;
        y = y < 0 ? 0 : y > canvasHeight ? canvasHeight : y;
        this.path.push({ x: x, y: y, num: this.canvasNum, w: this.strokeWidth, color: this.color })
    }
}