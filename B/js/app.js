Number.prototype.time = function(){
    let int = parseInt(this);
    let msec = (this - int).toFixed(2).substr(2);

    let hour = parseInt(int / 3600);
    let min = parseInt((int % 3600) / 60);
    let sec = int % 60;

    if(hour < 10) hour = "0" + hour;
    if(min < 10) min = "0" + min;
    if(sec < 10) sec = "0" + sec;

    return `${hour}:${min}:${sec}:${msec}`;
}

const borderWidth = 10;
const borderColor = '#77cdff';

class App {
    constructor() {
        // dom
        this.$screen = document.querySelector("#screen")
        this.$canvas = document.querySelector("#canvas");
        this.$track = document.querySelector("#track");
        // 
        // variable
        this.nowVideo;
        // 
        // class
        let tool = new Tool(this);
        let moviePlayer = new MoviePlayer(this);
        // 
    }
}

window.addEventListener("load", e=>{
    let app = new App();
})