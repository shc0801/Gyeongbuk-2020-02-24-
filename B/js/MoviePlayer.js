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

        if(this.movieList.indexOf(movieId) == -1) {
            this.movieList.push(movieId);

            this.addClip(movieId); 
            this.addTrack(movieId); 

            this.timeTrack = document.querySelector("#time_view");
            this.timeTrack.style.visibility = "visible";
        }
        this.app.$track.style.visibility = 'visible';

        this.movieList.forEach(movie=>{
            document.querySelector(`#clip_${movie}`).style.visibility = 'hidden';
            document.querySelector(`#track_${movie}`).style.visibility = 'hidden';
        })
        
        document.querySelector(`#clip_${movieId}`).style.visibility = 'visible';
        document.querySelector(`#track_${movieId}`).style.visibility = 'visible';
    }
    
    moviePlay(){
        this.app.nowVideo.play();
        console.log(document.querySelector(`#clip_${this.app.movieId}`))
    }

    moviePause(){
        this.app.nowVideo.pause();
    }
    
    addClip(movieId){
        this.clip = document.createElement("div");
        this.clip.id = `clip_${movieId}`; 
        this.clip.classList.add('clip');  
        this.app.$canvas.appendChild(this.clip);  
    }

    addTrack(movieId){
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
            
            this.app.time.forEach(time=>{
                if(time.start <= this.app.nowVideo.currentTime && this.app.nowVideo.currentTime <= time.start + time.main){
                    let viewDom = document.querySelector(`#${time.id}`);
                    if(viewDom !== null)
                        viewDom.style.display = 'block';
                }
                else{
                    let hideDom = document.querySelector(`#${time.id}`);
                    if(hideDom !== null)
                        hideDom.style.display = 'none';
                }
            })
        }
    }
}