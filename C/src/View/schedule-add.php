<!-- 상영 일정 [년/월/일 시:분], 출품작 선택[출품작제목(러닝타임)] -->
<div class="container py-5">
    <form method="post">
        <div class="form-group">
            <label for="schedule">상영 일정</label>
            <input type="text" id="schedule" name="schedule" class="form-control" placeholder="[년/월/일/시/분]">
        </div>
        <div class="form-group">
            <label for="entry">출품작 선택</label>
            <select name="entry" id="entry">
                <option value="">출품작을 선택하세요….</option>
                <?php foreach($entry as $item): ?>
                <option value="<?=$item->id?>"><?=$item->movie_title?>(<?=$item->running_time?>)</option>
                <?php endforeach; ?>
            </select>
        </div>
        <button type="submit" class="btn btn-success">등록하기</button>
    </form>
</div>