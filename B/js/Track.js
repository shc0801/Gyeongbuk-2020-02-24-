class Track {
    constructor(app, tool, clip) {
        this.app = app;
        this.tool = tool;
        this.clip = clip;

        this.$track = document.querySelector(`#track_${this.app.nowVideo.classList[0]}`);
        this.$tool_track = document.querySelector(`#track_${this.app.nowVideo.classList[0]}`);

        this.addTrack();
        this.addEvent();
    }

    addTrack() {
        this.track = document.createElement("div");
        this.track.classList.add('tool_track');  
        this.track.classList.add(`clip_${this.tool.trackNum+=1}`); 
        this.track.draggable = 'true';

        this.trackHtml = `<div class="trackHtml left"></div>
                          <div class="trackHtml center"></div>
                          <div class="trackHtml right"></div>
                          <div id="bg"></div>`;

        this.track.innerHTML = this.trackHtml;
        this.$track.prepend(this.track);
        this.$tool_track = document.querySelectorAll(`#track_${this.app.nowVideo.classList[0]} > *`);
    }

    addEvent() {
        this.$tool_track.forEach(track=>{
            track.addEventListener("mousedown", e=>{
                let clip = document.querySelector(`#${e.currentTarget.classList[1]}`);

                this.$tool_track.forEach(trackClip=>{
                    this.tool.clear(document.querySelector(`#${trackClip.classList[1]}`))
                    this.$tool_track.forEach(track=>{
                        track.style.backgroundColor = 'darkgray';
                    });
                })
                this.select(clip, track);
            });
        });
    }

    select(clip, track) {
        if(this.tool.nowTool !== 'select') return;
        if(clip.tagName === 'CANVAS') {
            this.canvas = clip;
            this.ctx = this.canvas.getContext('2d');
            this.lineSelect(clip);
            this.tool.select.selectClip = clip;
        } else if(clip.tagName === 'DIV') {
            this.rect = clip;
            this.rect.style.borderColor = borderColor;
            this.tool.select.selectClip = clip;
        } else if(clip.tagName === 'SPAN') {
            this.span = clip;
            this.span.style.borderColor = this.span.style.backgroundColor;
            this.tool.select.selectClip = clip;
        }
        track.style.backgroundColor = borderColor;
    }

    lineSelect(clip) {
        let selectPath = this.tool.selectPath[clip.classList[0] - 1];

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