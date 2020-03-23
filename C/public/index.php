<?php
session_start();

/*
    상수선언
*/


// define(상수이름 , 값)
// dirname(파일경로) : 부모 디렉토리 가져오기 
define("ROOT", dirname(__DIR__));    //__DIR__ : 현재 이 파일의 경로
define("VIEW", ROOT."/src/View");


/*
    파일 가져오기
*/

include ROOT."/autoload.php";
include ROOT."/helper.php";
include ROOT."/web.php";