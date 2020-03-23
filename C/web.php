<?php

/*                                      
    사용할 웹 페이지들의 집합
    Router와 controller를 연결하는 역할
*/

//해당 클래스를 이 파일에서 사용하겠다고 선언 => autoload.php로 연결됨

use App\Router;

//MAIN
Router::get("/", "MainController@indexPage");

//Entry
Router::get("/entry", "MovieController@entryPage");
Router::post("/entry", "MovieController@entryProcess");

//schedule
Router::get("/schedule", "scheduleController@schedulePage");
Router::get("/schedule-add", "scheduleController@scheduleAddPage");
Router::post("/schedule-add", "scheduleController@scheduleAddProcess");
Router::post("/schedule/get", "scheduleController@scheduleGetProcess");
Router::get("/schedule/detail", "scheduleController@detailPage");

//search
Router::get("/search", "MovieController@searchPage");

//event
Router::get("/participate", "EventController@participatePage");
Router::post("/participate", "EventController@participateProcess");
Router::get("/contest", "EventController@contestPage");
Router::get("/contest/info", "EventController@contestInfoPage");
Router::post("/contest/info", "EventController@contestInfoProcess");

//USER
Router::get("/join", "UserController@joinPage");
Router::post("/join", "UserController@joinProcess");

Router::get("/login", "UserController@loginPage");
Router::post("/login", "UserController@loginProcess");

Router::get("/logout", "UserController@logoutProcess");

Router::redirect();