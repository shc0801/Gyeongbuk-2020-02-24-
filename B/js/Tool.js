class Tool {
    constructor(app) {
    this.app = app;

    this.path = new Array;

    this.move = {
        line: false,
        rect: false,
        text: false
    }
     
    // class   
    let line = new LineTool(this.app, this);
    let rect = new RectTool(this.app, this);
    let text = new TextTool(this.app, this);
    let select = new Select(this.app, this);

    // dom
    this.$toolBtn = document.querySelectorAll(".edit > button");
    this.addEvent();
    }

    get color() { return document.querySelector("#color").value; }
    get fontSize() { return document.querySelector("#fontSize").value; }
    get strokeWidth() { return document.querySelector("strokeWidth").value; }

    addEvent() {
        this.$toolBtn.forEach(btn=>{
            btn.addEventListener("click", e=>{
                if(!this.app.nowVideo) { alert("먼저 영화를 선택해주세요!"); return; }
                this.nowTool = btn.dataset.tool;
                this.setTool = this[this.nowTool];
            })
        })

        this.app.$canvas.addEventListener("mousedown", e=>{
            if(!this.nowTool || e.which !== 1) return; 
            this.setTool.mousedown(e);
        })

        window.addEventListener("mousemove", e=>{
            if(!this.nowTool || e.which !== 1) return; 
            if(!this.nowTool || this.nowTool == 'text') return;
            this.setTool.mousemove(e);
        })

        window.addEventListener("mouseup", e=>{
            if(!this.nowTool || e.which !== 1) return; 
            if(!this.nowTool) return;
            e.path.forEach(el=>{
                if(el.id === 'screen'){
                    this.setTool.mouseup(e);
                }
            });
        })
    }

    mousePoint(e) {
        const { clientX, clientY } = e;
        let x = clientX - this.app.$screen.offsetLeft;
        x = x < 0 ? 0 : this.app.$canvas.width < x ? this.app.$canvas : x;
        let y = clientY - this.app.$screen.offsetTop;
        y = y < 0 ? 0 : this.app.$canvas.which < y ? this.app.$canvas : y;
        return { x: x, y: y };
    }
}