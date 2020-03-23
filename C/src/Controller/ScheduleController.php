<?php
namespace Controller;

use App\DB;
class scheduleController{
    function schedulePage(){
        view("schedule");
    }
    
    function scheduleAddPage(){
        $data = [
            "entry" => DB::fetchAll("SELECT E.*, S.id AS s_id FROM entry AS E LEFT JOIN schedule AS S ON E.id = S.e_id WHERE S.id IS NULL"),
        ];
        view("schedule-add", $data);
    }

    function scheduleAddProcess(){
        isEmpty();

        extract($_POST); //$_POST['schedule] => $schedule

        // 년/월/일/시/분
        /*
            년 : 2019년, 19년
            월 : 05월, 5월
            일 : 05일, 5일
        */
        // if(!preg_match("/^(20[0-9]{2}|[0-9]{2})\\/[0-9]{1,2}\\/[0-9]{1,2}\\/[0-9]{1,2}\\/[0-9]{1,2}$", $schedule));
        if(!preg_match("/^(?<year>20[0-9]{2}|[0-9]{2})\\/(?<month>[0-9]{1,2})\\/(?<date>[0-9]{1,2})\\/(?<hour>[0-9]{1,2})\\/(?<min>[0-9]{1,2})$/", $schedule, $arr))
            return  back("올바른 양식으로 작성해 주세요."); ;
        extract($arr);

        $schedule = "$year-$month-$date $hour:$min";
            
        $entry = DB::fetch("SELECT * FROM entry WHERE id = ?", [$entry]);

        $endtime = strtotime($schedule) + $entry->running_time * 60;

        $overlap = DB::fetch("SELECT * FROM schedule
                              WHERE (start_time <= TIMESTAMP(?)  AND TIMESTAMP(?) <= end_time)
                              OR  (start_time <= TIMESTAMP(?)  AND TIMESTAMP(?) <= end_time)
                              OR (TIMESTAMP(?) <= start_time AND start_time <= TIMESTAMP(?))
                              OR (TIMESTAMP(?) <= start_time AND start_time <= TIMESTAMP(?))", [$schedule, $schedule, $endtime, $endtime, $schedule, $endtime, $schedule, $endtime]);
        
        if($overlap) return back("중복된 일정이 있습니다.");

        DB::query("INSERT INTO schedule(e_id, start_time, end_time) VALUES (?, ?, ?)", [$entry->id, $schedule, date("Y-m-d H:i", $endtime)]);

        return go("/schedule", "일정 등록이 완료되었습니다.");
    }

    function scheduleGetProcess(){
        $data = DB::fetchAll("SELECT E.movie_title, S.* FROM entry AS e, schedule AS S WHERE e.id = S.e_id");
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }

    function detailPage(){
        extract($_GET);
        if(!isset($_GET['date'])) return back("이 페이지는 없는 페이지 입니다");
        if($date !== date("Y-m-d", strtotime($date)) && $date !== date("Y-n-j", strtotime($date))) return back("이 페이지는 없는 페이지 잆니다.");
        $tommorrow = date("Y-m-d", strtotime($date) + 3600 * 24);

        $entry_user = "SELECT E.*, U.user_id, U.user_name FROM entry AS E, users AS U WHERE E.u_id = U.id";
        $sql = "SELECT E.*, S.start_time, S.end_time FROM ($entry_user) AS E LEFT JOIN schedule AS S ON S.e_id = E.id WHERE TIMESTAMP(?) <= start_time AND start_time < TIMESTAMP(?)";
        $data = DB::fetchAll($sql, [$date, $tommorrow]);

        view("detail", ["movies" => $data, "date" => $date]);
    }
}