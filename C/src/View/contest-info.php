<div class="container py-5">
    <?=$teaser->html?>
    <div class="mt-5" style="height: 200px; padding: 20px 40px; box-shadow: 0 0 10px 3px #00000020; background: #fff;">
        <h5 class="font-weight-bold"><?=movieName($teaser->movie_id)?></h5>
        <form method="post" class="pl-3 row align-items-center">
            <span class="text-muted">평점: <?=number_format($teaser->score, 1)?></span>
            <span class="ml-3 text-muted">나의 평점</span>
            <input type="number" id="score" name="score" class="ml-2 form-control" style="width: 70px;" min="1" max="10">
            <button type="submit" class="ml-2 btn btn-primary">확인</button>
        </form>
    </div>
</div>