<?php
namespace App;

class Router {
    static $get = [];
    static $post = [];
    
    static function get($url, $controller){
        // array_push(요소를 추가할 배열, 추가할 요소...)

        // 형 강제변형  (string) (number) (object) ....

        // ["key1" => value]
        // static function { self::?? }
        array_push(self::$get, (object)["url" => $url, "controller" => $controller]);
    }

    static function post($url, $controller){
        array_push(self::$post, (object)["url" => $url, "controller" => $controller]);
    }

    /*
        현재 URL과 GET, POST 배열 내에 요소를 비교해서
        페이지를 찾는다 => 컨트롤러의 메소드를 실행시킨다.
    */

    static function redirect(){
        $url = isset($_GET['url']) ? "/" .$_GET['url'] : "/";
        $method = strtolower($_SERVER['REQUEST_METHOD']);

        foreach(self::${$method} as $page){
            if($page->url === $url){
                //0:컨트롤러, 1:메소드
                $split = explode("@", $page->controller);   // @ 기준으로 자름
                $conName = "Controller\\".$split[0];        // 컨트롤러 이름을 만들고
                $controller = new $conName();               // 새롭게 생성
                $controller->{$split[1]}(); 
                exit;                // 메소드를 실행
            }
        }
        echo "이 페이지는 존재하지 않는 패이지 입니다.";
    }
}