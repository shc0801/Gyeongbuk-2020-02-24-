<div class="container">
    <h2><?=date("Y년 m월 d일", strtotime($date))?></h2>
    <table class="table">
        <thead>
            <tr>
                <th>상영시간</th>
                <th>출품자</th>
                <th>영화제목</th>
                <th>러닝타임</th>
                <th>제작년도</th>
                <th>분류</th>
            </tr>
        </thead>
        <tbody>
        <?php foreach($movies as $movie): ?>
            <tr>
                <td><?=$movie->start_time?> ~ <?=$movie->end_time?></td>
                <td><?=$movie->user_name?>(<?=$movie->user_id?>)</td>
                <td><?=$movie->movie_title?></td>
                <td><?=$movie->running_time?></td>
                <td><?=$movie->created_at?></td>
                <td><?=$movie->type?></td>
            </tr>
        </tbody>
        <?php endforeach; ?>
    </table>
</div>