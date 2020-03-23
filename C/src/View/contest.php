<div class="container">
    <h1>영화티저 콘테스트</h1>
    <div class="row mt-5">
    <?php foreach($teaser as $item): ?>
        <div class="card m-2" style="width: 18rem;">
            <img src="/images/movie<?=$item->movie_id?>-cover.jpg" class="card-img-top" alt="Cover Image.">
            <div class="card-body">
                <h5 class="card-title"><?=movieName($item->movie_id)?></h5>
                    <p class="card-text">
                    제작자: <?=$item->user_name?><br>
                    평점: <?=number_format($item->score, 1)?>
                    </p>
                <a href="/contest/info?id=<?=$item->id?>" class="btn btn-primary">상세보기</a>
            </div>
        </div>
    <?php endforeach;?>
    </div>
</div>