class LineTool {
    constructor(app, tool) {
        this.app = app;
        this.tool = tool;
    }

    mousedown(e) {
        this.tool.path = new Array;
        this.addCanvas();
        
    }

    mousemove(e) {

    }

    mouseup(e) {

    }

    addCanvas() {
        let canvas = document.querySelector("canvas");
        canvas.width = 850;
        canvas.height = 480;
    }
}