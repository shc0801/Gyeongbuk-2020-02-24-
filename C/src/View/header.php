<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>부산국제영화제</title>
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" media="screen and (max-width: 480px)" href="/css/main(480px).css"/>
    <link rel="stylesheet" href="/bootstrap/css/bootstrap.css">
</head>
<body>
    <!--header-->
    <header>
        <div class="top-nav container-fluid">
            <div class="top-nav-left float-left">
                <a href="#">BIFF</a>
                <a href="#">Asian Film Market</a>
                <a href="#">APM</a>
                <a href="#">AFA</a>
                <a href="#">ACF</a>
                <a href="#">Forum BIFF</a>
                <a href="#">Community</a>
                <a href="#">PRESS Service</a>
            </div>
            <div class="top-nav-right float-right pr-5">
                <a href="#">1대1문의</a>
                <?php if(isset($_SESSION['user'])): ?>
                    <a href="/logout">로그아웃</a>
                <?php else: ?>
                <a href="/join">회원가입</a>
                
                <a href="/login">로그인</a>
            
                <?php endif; ?>
            </div>
            <nav class="w-100 float-left">
                <a href="/"><img id="logo" class="mt-4 ml-3" src="./images/logo.png"></img></a>
                <div class="item">
                    <a href="/participate">이벤트</a>
                    <div class="sub-item w-100 mt-2">
                        <a href="#">영화티저 콘테스트</a>
                        <a href="#">콘테스트 참여하기</a>
                    </div>
                </div>
                <div class="item"><a href="/entry">상영작검색</a></div>
                <div class="item"><a href="/schedule">상영일정</a></div>
                <div class="item"><a href="/search">출품신청</a></div>
                <div class="item">
                    <a href="participate">부산국제영화제</a>
                    <div class="sub-item w-100 mt-2">
                        <a href="/html/sub_1.html">개최개요</a>
                        <a href="/html/sub_2.html">행사안내</a>
                    </div>
                </div>
            </nav>
        </div>
        <div class="media-logo media">
            <a href="./index.html"><img id="logo" class="mt-3 ml-3" src="./images/logo.png"></img></a>
        </div>
        <div class="hamburger media">
            <input type="checkbox" id="menuicon">
            <label for="menuicon">
                <span></span>
                <span></span>
                <span></span>
            </label>
            <div class="dark_wrap" id="menuicon"></div>
            <div class="media-nav media sideMenu">
                <div class="nav d-flex flex-column px-4">
                    <div class="item">
                        <a class="color" href="./index.html">
                            부산국제영화제
                        </a>
                        <div class="sub-nav ml-3 mt-2">
                            <div class="item mt-3"><a class="color" style="font-weight: 400;" href="./sub1.html">개최개요</a></div>
                            <div class="item mt-3"><a class="color" style="font-weight: 400;" href="./sub2.html">행사안내</a></div>
                        </div>
                    </div>
                    <div class="item mt-3"><a class="color" href="#">출품신청</a></div>
                    <div class="item mt-3"><a class="color" href="#">상영일정</a></div>
                    <div class="item mt-3"><a class="color" href="#">상영작검색</a></div>
                    <div class="item mt-3">
                        <a class="color" href="#">
                            이벤트
                        </a>
                        <div class="sub-nav ml-3 mt-2">
                            <div class="item mt-3"><a class="color" style="font-weight: 400;" href="#">영화티저 콘테스트</a></div>
                            <div class="item mt-3"><a class="color" style="font-weight: 400;" href="#">콘테스트 참여하기</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
         
    </header>
    <!--//header-->
    
    <!--visual-->
    <div class="slide-left-text">
        <p class="h-100"><span>Busan</span> International <br>
            Film Festival</p>
    </div>
    <div id="visual">
        <div class="slide">
            <div class="slide-background">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="slide-text">
                <p><span>Busan</span> International <br>
                    Film Festival</p>
                <p>2019년 10월 7일, 아시아 최대의 영화 축제 부산국제영화제 개막!</p>
            </div>
        </div>
    </div>
    <!--//visual-->