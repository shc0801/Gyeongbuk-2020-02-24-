<?php
namespace Controller;

use App\DB;
class EventController{
    function participatePage(){
        view("participate");
    }
    
    function participateProcess(){
        extract($_POST);

        if(!isset($_SESSION['user'])) return go("/login", "로그인 후 이용하실 수 있습니다.");

        DB::query("INSERT INTO teaser(movie_id, html, u_id) VALUES (?, ?, ?)", [$movie_id, $html, $_SESSION['user']->id]);
        return go("/contest", "참가가 완료되었습니다.");
    }

    function contestPage(){
        $scoreSQL = "SELECT t_id, SUM(score) / COUNT(score) AS score FROM good_list GROUP BY t_id";

        $data = DB::fetchAll("SELECT T.*, U.user_name, G.score
                              FROM teaser AS T 
                              LEFT JOIN ($scoreSQL) AS G ON G.t_id = T.id, users AS U 
                              WHERE T.u_id = U.id");

        view("contest", ["teaser"=>$data]);
    }

    function contestInfoPage(){
        $id = isset($_GET['id']) ? $_GET['id'] : "";
        
        $scoreSQL = "SELECT t_id, SUM(score) / COUNT(score) AS score FROM good_list GROUP BY t_id";

        $data = DB::fetch("SELECT T.*, U.user_name, G.score 
                           FROM teaser AS T 
                           LEFT JOIN ($scoreSQL) AS G ON G.t_id = T.id, users AS U  
                           WHERE T.u_id = U.id AND T.id = ?", [$id]);
        if(!$data) return back("해당 영상이 존재하지 않습니다.");

        view("contest-info", ["teaser"=>$data]);
    }

    function contestInfoProcess(){
        $id = isset($_GET['id']) ? $_GET['id'] : "";

        $scoreSQL = "SELECT t_id, SUM(score) / COUNT(score) AS score FROM good_list GROUP BY t_id";
        
        $data = DB::fetch("SELECT T.*, U.user_name FROM teaser AS T, users AS U WHERE T.u_id = U.id");
        if(!$data) return back("해당 영상이 존재하지 않습니다.");
        if(!isset($_SESSION['user'])) return go("/login", "로그인 후 이용하실 수 있습니다.");
        extract($_POST);

        // 현재 로그인한 유저가 goodList에 티저 영상의 id 와 일치하는 기록을 남긴게 있는지 검사
        // SELECT 가져오고 싶은 컬럼 FROM 컬럼의 테이블 WHERE 조건
        $d = DB::fetch("SELECT * FROM good_list WHERE u_id = ? AND t_id = ?", [$_SESSION['user']->id, $id]);
        if($d) {
            DB::query("UPDATE good_list SET score = ? WHERE t_id = ?", [$score , $id]);
            return go("/contest/info?id=$id");
        }

        DB::query("INSERT INTO good_list(t_id, u_id, score) VALUES (?, ?, ?)", [$id, $_SESSION['user']->id, $score]);

        return go("/contest/info?id=$id");
    }
}

