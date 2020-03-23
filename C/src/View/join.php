<div class="container py-5">
    <form method="post">
        <div class="form-group">
            <label for="user_id">아이디</label>
            <input type="email" name="user_id" class="form-control" id="user_id" aria-describedby="emailHelp">
        </div>
        <div class="form-group">
            <label for="user_name">이름</label>
            <input type="text" name="user_name" class="form-control" id="user_name" aria-describedby="emailHelp">
        </div>
        <div class="form-group">
            <label for="password">비밀번호</label>
            <input type="password" name="password" class="form-control" id="password">
        </div>
        <div class="form-group">
            <label for="passconf">비밀번호 재확인</label>
            <input type="password" name="passconf" class="form-control" id="passconf">
        </div>
        <button type="submit" class="btn btn-primary">회원가입</button>
    </form>
</div>