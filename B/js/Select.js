class Select {
    constructor(app, tool) {
        this.app = app;
        this.tool = tool;

        this.moveClip = null;
        this.selectClip = null;

        this.select = true;
    }

    mousedown(e) {
        const {x, y} = this.tool.mousePoint(e);
        this.startX = x;
        this.startY = y;

        this.tool.clear(this.selectClip);
        this.clearTrack();
        this.cheak(e, this.tool.clipList);

        this.select = true;
        
        if(this.moveClip == null) return;
        this.moveClipLeft = this.moveClip.offsetLeft;
        this.moveClipTop = this.moveClip.offsetTop;
    }

    mousemove(e) {
        if(this.moveClip == null) return;
        const { x, y } = this.tool.mousePoint(e);
        this.moveClip.style.left = this.moveClipLeft + x - this.startX + 'px';
        this.moveClip.style.top = this.moveClipTop + y - this.startY + 'px';
    }

    mouseup(e) {
        this.moveClip = null;
    }

    cheak(e, clipList) {
        const {x, y} = this.tool.mousePoint(e);
        clipList = clipList.reverse()
        clipList.forEach(clip=>{
            if(this.select) {
                if(clip.tagName === 'CANVAS') {
                    this.canvas = clip;
                    this.ctx = this.canvas.getContext('2d');
                    this.color = this.ctx.getImageData(x - this.canvas.offsetLeft, y - this.canvas.offsetTop, 100, 100).data[3];
                    if(this.color != 0) {
                        this.moveClip = this.canvas;
                        this.lineSelect();
                        this.select = false;
                        this.trackSelect(clip);
                    }
                } else if(clip.tagName === 'DIV') {
                    if((clip.offsetLeft <= x && clip.offsetLeft + clip.offsetWidth >= x) &&
                       (clip.offsetTop <= y && clip.offsetTop + clip.offsetHeight >= y)) {
                        this.rect = clip;
                        this.rect.style.borderColor = borderColor;
                        this.moveClip = this.rect;
                        this.select = false;
                        this.trackSelect(clip);
                    }
                } else if(clip.tagName === 'SPAN') {
                    if((clip.offsetLeft <= x && clip.offsetLeft + clip.offsetWidth >= x) &&
                       (clip.offsetTop <= y && clip.offsetTop + clip.offsetHeight >= y)) {
                        this.span = clip;
                        this.span.style.borderColor = borderColor;
                        this.moveClip = this.span;
                        this.select = false;
                        this.trackSelect(clip);
                    }
                }
            }
        })
        this.selectClip = this.moveClip;
        clipList = clipList.reverse()
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

    trackSelect(clip) {
        let trackClip = document.querySelector(`.${clip.id}`);
        trackClip.style.backgroundColor = borderColor;
    }

    clearTrack() {
        let track = document.querySelectorAll(`#track_${this.app.nowVideo.classList[0]} > div`);
        track.forEach(trackClip=>{
            trackClip.style.backgroundColor = 'darkgray';
        })
    }
}