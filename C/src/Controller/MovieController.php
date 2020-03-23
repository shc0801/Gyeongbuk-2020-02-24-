<?php
namespace Controller;
use App\DB;
class MovieController{
    function entryPage(){
        if(!isset($_SESSION['user'])) return back("비회원은 접근할 수 없습니다.");
        
        view("entry");
    }

    function entryProcess(){
        extract($_POST);

        $data = [$_SESSION['user']->id, $movie_title, $running_time, $created_at, $type];
        DB::query("INSERT INTO entry(u_id, movie_title, running_time, created_at, type) VALUES (?, ?, ?, ?, ?)", $data);
        go("/", "등록이 완료되었습니다.");
    }

    function searchPage(){
        extract($_GET);
        $keyword = isset($keyword) ? $keyword : "";
        $type = isset($type) ? $type : "";

        $where = "";
        $matches = [];
        if(isset($keyword) && $keyword !== ""){
            $where .= "E.movie_title LIKE ?";
            $matches[] = "%$keyword%";
        }

        if(isset($type) && $type !== ""){
            if($keyword !== "")
                $where .= " AND ";
            $where .= " E.type LIKE ? ";
            $matches[] = "%$type%";
        }
    
        $sql = "SELECT E.*, U.user_name, U.user_id FROM entry E, users U WHERE e.u_id = u.id";
        $sql .= $where !== "" ? " AND ".$where : "";
        $data = DB::fetchAll($sql, $matches);
        view("search", ["movies" => $data, "keyword" => $keyword, "type" => $type]);
    }
}