<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="./css/parti.css">
    <title>B과제!</title>
</head>
<body>
   <div id="wrap">
        <div class="edit">
            <button id="free_curve" data-tool="line">자유곡선</button>
            <button id="rect" data-tool="rect">사각형</button>
            <button id="text" data-tool="text">텍스트</button>
            <button id="select" data-tool="select">선택</button>
            <button id="play">재생</button>
            <button id="pause">정지</button>
            <button id="delete_all">전부삭제</button>
            <button id="deletion">선택삭제</button>
            <button id="download">다운로드</button>
            <button id="merge">병합하기</button>
            <button id="part-btn">참여하기</button>
        </div>
        <div class="screen" id="screen">
            <p id="screen_text">동영상을 선택해주세요.</p>
            <div class="video">
                <video src="/videos/movie1.mp4" id="movie1" class="movie_1"></video>
                <video src="/videos/movie2.mp4" id="movie2" class="movie_2"></video>
                <video src="/videos/movie3.mp4" id="movie3" class="movie_3"></video>
                <video src="/videos/movie4.mp4" id="movie4" class="movie_4"></video>
                <video src="/videos/movie5.mp4" id="movie5" class="movie_5"></video>
            </div>
            <div id="canvas">
            </div>
        </div>
        <div class="opction">
            <p>색상</p>
            <select name="opction" id="color">
                <option value="gray">gray</option>
                <option value="blue">blue</option>
                <option value="green">green</option>
                <option value="red">red</option>
                <option value="yellow">yellow</option>
            </select>
            <p>선 두께</p>
            <select name="opction" id="strokeWidth">
                <option value="3">3px</option>
                <option value="5">5px</option>
                <option value="10">10px</option>
            </select>
            <p>글자 크기</p>
            <select name="opction" id="fontSize">
                <option value="16">16px</option>
                <option value="18">18px</option>
                <option value="24">24px</option>
                <option value="32">32px</option>
            </select>
        </div>
        <div class="time">
            <div class="video_time">
                <p id="nowTime">00:00:00:00</p>
            </div>
            <p>/</p>
            <div class="video_time">
                <p id="allTime">00:00:00:00</p>
            </div>
            <p id="edit_start">시작시간</p>
            <div class="edit_start_time">
                <p id="start_time">00:00:00:00</p>
            </div>
            <p>유지시간</p>
            <div class="edit_time">
                <p id="mainTain_time">00:00:00:00</p>
            </div>
        </div>
        <div id="track">
            <div class="timeEl" draggable="true">
                
            </div>
            <div id="time_view">
                <div class="time_track"></div>
            </div>
        </div>
        <div class="cover_images">
            <img src="/images/movie1-cover.jpg" id="movie_1" alt="">
            <img src="/images/movie2-cover.jpg" id="movie_2" alt="">
            <img src="/images/movie3-cover.jpg" id="movie_3" alt="">
            <img src="/images/movie4-cover.jpg" id="movie_4" alt="">
            <img src="/images/movie5-cover.jpg" id="movie_5" alt="">
        </div>
   </div>
   <form id="part-form" method="post">
        <input type="hidden" id="movie_id" name="movie_id">
        <input type="hidden" id="html" name="html">
   </form>
	<script src="/js/jquery-3.3.1.min.js"></script>
    <script src="/js/App.js"></script>
    <script src="/js/MoviePlayer.js"></script>
    <script src="/js/Track.js"></script>
    <script src="/js/Tool.js"></script>
    <script src="/js/LineTool.js"></script>
    <script src="/js/RectTool.js"></script>
    <script src="/js/TextTool.js"></script>
    <script src="/js/Select.js"></script>
</body>
</html>

<script>
    window.addEventListener("load", ()=> {
        document.querySelector("#part-btn").addEventListener("click", ()=>{
            document.querySelector("#html").value = this.tool.outputHTML();
            document.querySelector("#movie_id").value = app.nowVideo.id.substr(-1);
            document.querySelector("#part-form").submit();
        });
        
    });
</script>
