class MoviePlayer {
    constructor(app) {
        this.app = app;

        // dom

        this.$playBtn = document.querySelector("#play");
        this.$pauseBtn = document.querySelector("#pause");

        this.$Before = document.querySelector(".timeEl");
        // 

        // variable
        this.movieList = new Array; 
        this.cursor = false;
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

        this.$Before.addEventListener("mousedown", e=>{
            e.preventDefault();
            this.cursor = true;
        })

        window.addEventListener("mouseup", e=>{
            this.cursor = false;
        })

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

        console.log(this.movieList.indexOf(movieId));
        if(this.movieList.indexOf(movieId) == -1) {
            this.movieList.push(movieId);

            this.addTool(movieId); 
            this.addTrackClip(movieId); 

            this.timeTrack = document.querySelector("#time_view");
            this.timeTrack.style.visibility = "visible";
        }
        this.app.$track.style.visibility = 'visible';

        this.movieList.forEach(movie=>{
            document.querySelector(`#tool_${movie}`).style.visibility = 'hidden';
            document.querySelector(`#track_${movie}`).style.visibility = 'hidden';
        })
        
        document.querySelector(`#tool_${movieId}`).style.visibility = 'visible';
        document.querySelector(`#track_${movieId}`).style.visibility = 'visible';
    }
    
    moviePlay(){
        this.app.nowVideo.play();
        console.log(document.querySelector(`#tool_${this.app.movieId}`))
    }

    moviePause(){
        this.app.nowVideo.pause();
    }
    
    addTool(movieId){
        this.tool = document.createElement("div");
        this.tool.id = `tool_${movieId}`; 
        this.tool.classList.add('tool');  
        this.app.$canvas.appendChild(this.tool);  
    }

    addTrackClip(movieId){
        this.track = document.createElement("div");
        this.track.id = `track_${movieId}`;   
        this.track.classList.add('track');   
        this.app.$track.prepend(this.track);   
    }

    videoTime(){
        this.allTime = document.querySelector('#allTime');
        this.allTime.innerHTML = this.app.nowVideo.duration.time();
    }

    frame() {
        requestAnimationFrame(()=>{ this.frame() });
        if(this.app.nowVideo) {
            const {currentTime, duration} = this.app.nowVideo;
            let x = currentTime * this.track.width / duration;

            this.nowTime = document.querySelector("#nowTime");
            this.nowTime.innerHTML = this.app.nowVideo.currentTime.time();
        }
    }
}