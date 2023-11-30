<div class="row">
    <div class="col-md-12 order-md-6 mb-12">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">Комментарии</span>

        </h4>
        <h4 class="d-flex justify-content-between align-items-center mb-3">
            <p class="badge badge-secondary badge-pill">
                По ID:
                <a href="" class="order-by" data-order="asc">▲</a>
                <a href="" class="order-by" data-order="desc">▼</a>
            </p>
            <p class="badge badge-secondary badge-pill">
                По дате:
                <a href="" class="order-date" data-date="asc">▲</a>
                <a href="" class="order-date" data-date="desc">▼</a>
            </p>
            <span class="badge badge-secondary badge-pill" id="comment-count">0</span>
        </h4>
        <ul class="list-group mb-3" id="comments">
        </ul>

        <?= view('include/components/comments/pagination') ?>

        <?= view('include/components/comments/add_form') ?>
    </div>
</div>
