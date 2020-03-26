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
                this.$nowTrack = track;
                let clip = document.querySelector(`#${e.currentTarget.classList[1]}`);

                this.$tool_track.forEach(trackClip=>{
                    this.tool.clear(document.querySelector(`#${trackClip.classList[1]}`))
                    this.$tool_track.forEach(track=>{
                        track.style.backgroundColor = 'darkgray';
                    });
                })
                this.$nowTrack = track;
                this.trackNum = track.classList[1].slice(5, 6);
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
                
                setTimeout(()=>{
                    this.trackWidth = this.$nowTrack.offsetWidth; 
                    this.trackLeft = this.$nowTrack.offsetLeft; 
                }, 100)
            })
        })

        window.addEventListener("mousemove", e=>{
            if(this.dragProperty === '') return;
            e.preventDefault();
            const {x} = this.tool.mousePoint(e);

            let max;
            let left = x;
            let width = this.app.$track.offsetWidth;
            let style = this.$nowTrack.style;

            if(this.dragProperty === 'left') {
                left = x; 
                max = this.$nowTrack.offsetWidth + this.$nowTrack.offsetLeft;
                left = left < 0 ? 0 : left > max ? max : left;

                style.left = left + 'px';
                this.$bg.style.left = -(left) + 'px';
                style.width = this.trackLeft + this.trackWidth - left + 'px';
            } else if(this.dragProperty === 'center') {
                left = this.trackLeft + x - this.startX; 
                max = this.$bg.offsetWidth - this.$nowTrack.offsetWidth;
                left = left < 0 ? 0 : left > max ? max : left;

                style.left = left + 'px';
                this.$bg.style.left = -left + 'px';
            } else if(this.dragProperty === 'right') {
                width = this.trackWidth + x - this.startX;
                max = this.$bg.offsetWidth - this.$nowTrack.offsetLeft;
                width = width < 0 ? 0 : width > max ? max : width;
                style.width = width + 'px';
            }
            
            let toolId = this.$nowTrack.classList[1];
            let startTime = this.$nowTrack.offsetLeft * this.app.nowVideo.duration / this.app.$track.offsetWidth;
            let mainTainTime = this.$nowTrack.offsetWidth * this.app.nowVideo.duration / this.app.$track.offsetWidth;
            this.app.time[this.trackNum] = {start: startTime, main: mainTainTime ,id: toolId}

            this.app.startTimeDom.innerHTML = this.app.time[this.trackNum].start.time();
            this.app.mainTainDom.innerHTML = this.app.time[this.trackNum].main.time();
        });

        window.addEventListener("mouseup", e=>{
            this.dragProperty = '';
        })

        this.$tool_track.forEach(track=>{
            track.addEventListener
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