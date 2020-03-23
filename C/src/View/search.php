<div class="container py-5" style="margin-top: 800px">
    <form class="d-flex align-items-end">
        <div class="form-group">
            <label for="keyword">검색어</label>
            <input type="text" id="keyword" name="keyword" class="form-control" value="<?=$keyword?>">
        </div>
        <div class="form-group ml-3">
            <label for="type">분류</label>
            <select name="type" id="type" class="form-control">
                <option value="극영화" <?=$type === "극영화" ? " selected" : ""?>>극영화</option>
                <option value="다큐멘터리" <?=$type === "다큐멘터리" ? " selected" : ""?>>다큐멘터리</option>
                <option value="애니메이션" <?=$type === "애니메이션" ? " selected" : ""?>>애니메이션</option>
                <option value="기타" <?=$type === "기타" ? " selected" : ""?>>기타</option>
            </select>
        </div>
        <div class="form-group ml-3">
            <button type="submit" class="btn btn-primary">검색</button>
        </div>
    </form>
    <table class="table">
        <thead>
            <th>출품자</th>
            <th>영화제목</th>
            <th>러닝타임</th>
            <th>제작년도</th>
            <th>분류</th>
        </thead>
        <tbody>
            <?php foreach($movies as $movie):?>
            <tr>
                <td><?=$movie->user_name?>(<?=$movie->user_id?>)</td>
                <td><?=$movie->movie_title?></td>
                <td><?=$movie->running_time?></td>
                <td><?=$movie->created_at?></td>
                <td><?=$movie->type?></td>
            </tr>
            <?php endforeach;?>
        </tbody>
    </table>
</div>
