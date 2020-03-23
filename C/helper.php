<?php
/*
    각종 편의 함수들의 집합
*/

function view($view_path, $data = []){
    extract($data); //배열의 키 값으로 변수를 선언
    //VIewindex.php
    //index

    $view_path = VIEW."/$view_path.php";

    include VIEW."/header.php";
    include $view_path;
    include VIEW."/footer.php";
}

function back($message = ""){
    echo "<script>";
    if($message) echo "alert('$message');";
    echo "history.back()";
    echo "</script>";
    exit;
}

function go($url, $message = ""){
    echo "<script>";
    if($message) echo "alert('$message');";
    echo "location.href='$url';";
    echo "</script>";
    exit;
}

function isEmpty($message = ""){
    foreach($_POST as $item){
        if($item === "") {
            $message !== "" ? back("모든 정보를 기입해 주십시오.") : back("모든 정보를 기입해 주십시오.");
            exit;
        }
    }
}

function movieName($mid){
    $movieList = ["기생충", "극한직업", "롱 리브 더 킹", "나랏말싸미", "봉오동 전투"];
    return $movieList[$mid-1];
}