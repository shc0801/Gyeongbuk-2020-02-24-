<?php
namespace Controller;

use App\DB;

class UserController {
    function joinPage(){
        view("join");
    }
    function joinProcess(){
        extract($_POST);

    /*
        정규 표현식
        . : 모든 글자
        ^ : 문장의 시작
        $ : 문장의 끝
        * : 0개 이상
        + : 1개 이상
        (): 그룹지정
        []: (ex: [ㄱ-ㅎㅏ-ㅣ가-힣]) A~Z 모든 문자열을 매칭한다.
        [^A] - A가 아닌 문자

        이메일
        /[^@]+@[a-z]+\.[a-z]{2, 4}/
        // if(preg_match("/[^@]+@[a-z]+\.[a-z]{2, 4}/", $user_id))
        //     return back("아이디는 이메일 형식이여야합니다."); 

        아이디
        영문 or 영문 숫자 조합
        /^[a-z]+[0-9]+$/

        비밀번호 8자리 이상

        이름 
        한글 4글자 이하

        비교하는 함수
        preg_match(정규표현식, 비교할 문자열)
    */
    
        if(!preg_match("/^[a-zA-Z0-9]+$/", $user_id) || !preg_match("/^[0-9]+$/", $user_id)||!preg_match("/[^@]+@[a-z]+\.[a-z]{2,4}/", $user_id)) ///^?=.*[a-zA-z])(
            return back("아이디는 영문 숫자조합이어야 합니다.");
        if(!preg_match("/^.{8,}$/", $password)) // mb_strlen() 굳이 preg_match 안 써도 됨 if(mb_strlen($user_id) < 8) 
            return back("비밀번호 8자리여야합니다.");
        if(!preg_match("/^[ㄱ-ㅎㅏ-ㅣ가-힣]{1,4}$/", $user_name))
            return back("이름이 4글자 이하여야 합니다.");
        if($password !== $passconf) 
            return back("비밀번호가 일치하지 않습니다");

        $password = hash("sha256", $password);

        DB::query("INSERT INTO users(user_id, user_name, password) VALUES (?, ?, ?)", [$user_id, $user_name, $password]);

        return go("/login", "회원가입 되었습니다.");
    }

    function loginPage(){
        view("login");
    }

    function loginProcess(){
        extract($_POST);

        $find = DB::fetch("SELECT * FROM users WHERE user_id = ?", [$user_id]);
        if(!$find) return back("정보와 일치하는 아이디를 찾을 수 없습니다."); 
        if($find->password !== hash("sha256", $password)) return back("비밀번호가 일치하지 않습니다.");
        $_SESSION['user'] = $find;
        go("/", "로그인 되었습니다.");
    }

    function logoutProcess(){
        unset($_SESSION['user']);
        go("/", "로그아웃 되었습니다.");
    }
}