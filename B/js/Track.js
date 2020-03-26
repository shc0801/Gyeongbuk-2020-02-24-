class Track {
    constructor(app, tool, clip) {
        this.app = app;
        this.tool = tool;
        this.clip = clip;

        this.dragProperty = '';

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

        this.trackHtml = `<div class="trackPos left"></div>
                          <div class="trackPos center"></div>
                          <div class="trackPos right"></div>
                          <div id="bg"></div>`;

        this.track.innerHTML = this.trackHtml;
        this.$track.prepend(this.track);
        this.$trackHtml = document.querySelectorAll(".trackPos");
        this.$tool_track = document.querySelectorAll(`#track_${this.app.nowVideo.classList[0]} > *`);
    }

    addEvent() {
        this.$tool_track.forEach(track=>{
            track.addEventListener("mousedown", e=>{
                if(this.tool.nowTool !== 'select') return;
                let clip = document.querySelector(`#${e.currentTarget.classList[1]}`);

                this.$tool_track.forEach(trackClip=>{
                    this.tool.clear(document.querySelector(`#${trackClip.classList[1]}`))
                    this.$tool_track.forEach(track=>{
                        track.style.backgroundColor = 'darkgray';
                    });
                })
                this.$nowTrack = track;
                this.select(clip, track);
            });
        });

        this.$trackHtml.forEach(pos=>{
            pos.addEventListener("mousedown", e=>{
                if(this.tool.nowTool !== 'select') return;
                const {x} = this.tool.mousePoint(e);

                this.dragProperty = e.target.classList[1];
                this.$bg = pos.parentElement.lastChild;
                this.startX = x;
                
                this.trackWidth = this.$nowTrack.offsetWidth; 
                this.trackLeft = this.$nowTrack.offsetLeft; 
            })

            window.addEventListener  

            window.addEventListener("mouseup", e=>{
                this.dragProperty = '';
            })
        })
    }

    select(clip, track) {
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