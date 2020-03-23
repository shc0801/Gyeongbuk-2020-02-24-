class MoviePlayer {
    constructor(app) {
        this.app = app;

        // dom

        this.$playBtn = document.querySelector("#play");
        this.$pauseBtn = document.querySelector("#pause");

        // 

        // variable
        this.movieList = new Array; 
        // 
        
        this.addEvent();
        this.frame();
    }

    addEvent() {

        this.$playBtn.addEventListener("click", ()=>{ 
            if(this.app.nowVideo)
                this.moviePlay();
        });
        this.$pauseBtn.addEventListener("click", ()=>{ 
            if(this.app.nowVideo)
                this.moviePause();
        });

        document.querySelectorAll(".cover_images > img").forEach(img=>{
            img.addEventListener("click", e=>{
                this.videoUpdate(e.target.id);
            })
        })
    }

    videoUpdate(movieId) {
        if(this.app.nowVideo) {
            this.app.nowVideo.pause();
            this.app.nowVideo.style.visibility = 'hidden';
        }

        this.app.nowVideo = document.querySelector(`.${movieId}`);
        this.app.nowVideo.style.visibility = 'visible';

        this.videoTime();

        if(!this.movieList.indexOf(movieId)) {
            this.movieList.push(this.app.movieId);
            // this.addTool(); 
            // this.addTrackClip(); 
            
            this.timeTrack = document.querySelector("#time_view");
            this.timeTrack.style.visibility = "visible";
        }
    }
    
    moviePlay(){
        //재생, 재생시 프래임 반복
        this.app.nowVideo.play();
        console.log(document.querySelector(`#tool_${this.app.movieId}`))
    }

    moviePause(){
        //일시정지
        this.app.nowVideo.pause();
    }
    
    addTool(){
        //무비별 툴 생성
        this.tool = document.createElement("div");
        this.tool.id = `tool_${this.app.movieId}`; 
        this.tool.classList.add('tool');  
        parCanvas.appendChild(this.tool);  
    }

    addTrackClip(){
        this.track = document.createElement("div");
        this.track.id = `track_${this.app.movieId}`;   
        this.track.classList.add('track');   
        parTrack.prepend(this.track);   
    }

    videoTime(){
        this.allTime = document.querySelector('#allTime');
        this.allTime.innerHTML = this.app.nowVideo.duration.time();
    }

    frame() {
        requestAnimationFrame(()=>{ this.frame() });
        if(this.app.nowVideo) {

        }
    }
}