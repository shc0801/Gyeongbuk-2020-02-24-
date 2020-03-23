<style>
    #schedule * { color: #000!important; }

    #calender {
        width: 100%;
        border: 1px solid #000;
        border-right: 0;
        border-bottom: 0;
        display: flex;
        flex-wrap: wrap;
        margin-top: 800px
    }

    #calender > .c-head {
        width: calc(100% / 7);
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-bottom: 1px solid #000;
    }

    #calender > .c-head:nth-child(7){
        border-right: 1px solid #000;
    }

    #calender > .c-day {
        width: calc(100% / 7);
        height: 150px;
        padding: 10px;
        border-right: 1px solid #000;
        border-bottom: 1px solid #000;
    }


</style>

<div id="schedule" class="container py-5">
    <div class="px-5 d-flex justify-content-between">
        <button class="prev-btn">&lt;</button>
        <h5 id="ym">2020년 1월</h5>
        <button class="next-btn">&gt;</button>
    </div>
    <div id="calender" class="mt-4"> 
        <div class="c-head">일</div>
        <div class="c-head">월</div>
        <div class="c-head">화</div>
        <div class="c-head">수</div>
        <div class="c-head">목</div>
        <div class="c-head">금</div>
        <div class="c-head">토</div>
      
    </div>
    <a href="/schedule-add" class="btn btn-primary mt-3">상영일정등록</a>
</div>

<script> 
    class Calender{
        constructor(){
            this.loadData().then(()=>{
                this.calender = document.querySelector("#calender");
                this.currentTime = new Date();
                this.ym = document.querySelector("#ym");
                console.log(this.data);
                this.render();
                this.buttonEvents();
            });

        }

        loadData(){
            return new Promise((resolve, reject)=>{
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "/schedule/get");
                xhr.send();
                xhr.onload = ()=>{
                    this.data = JSON.parse(xhr.responseText); 
                    this.data.forEach(item=>{
                        item.start_time = new Date(item.start_time);
                    })
                    resolve();
                }
            })

        }

        buttonEvents(){
            document.querySelector(".prev-btn").addEventListener("click", e=>{
                let currentTime = this.currentTime;
                currentTime.setMonth(currentTime.getMonth() - 1);
                this.render();
                
            });

            document.querySelector(".next-btn").addEventListener("click", e=>{
                let currentTime = this.currentTime;
                currentTime.setMonth(currentTime.getMonth() + 1);
                this.render();
            });
        }

        render(){
            this.calender.querySelectorAll(".c-day").forEach(item=>{item.remove()});
            let currentTime = this.currentTime;

            let firstDay = new Date(currentTime.getFullYear(), currentTime.getMonth(), 1);
            let endDay = new Date(currentTime.getFullYear(), currentTime.getMonth()+1, 0);
            
            this.ym.innerText = `${currentTime.getFullYear()}년 ${currentTime.getMonth()+1}월`;

            //캘린더 앞 빈칸
            for(let i = 0; i < firstDay.getDay(); i++){
                this.calender.append(this.dayTemplate());
            }
            
            //실제 날짜를 표시
            for(let i = 1; i <= endDay.getDate(); i++){
                let find = this.data.find(movie=>new Date(currentTime.getFullYear(), currentTime.getMonth(), i) <= movie.start_time
                                                          && movie.start_time < new Date(currentTime.getFullYear(), currentTime.getMonth(), i + 1));
                this.calender.append(this.dayTemplate(i, find));
            }
        }

        dayTemplate(i = "", schedule = null){
            let a = document.createElement("a");
            a.href = `/schedule/detail?date=${this.currentTime.getFullYear()}-${this.currentTime.getMonth() + 1}-${i}`;
            a.classList.add("c-day");
            a.innerText = i;

            if(schedule !== null){
                let item = document.createElement("span");
                item.innerText = schedule.movie_title;
                a.append(item);
            }

            return a;
        }
    }

    window.addEventListener("load", () => {
        let calender = new Calender();
    });
</script>