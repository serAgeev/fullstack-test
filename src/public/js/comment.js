$(document).ready(function() {

    let page = 1;
    let orderBy = 'asc';
    let column = 'id';
    let limit = 0;
    let commentsCount = 0;
    let comments = {};

    commentGetAll();

    $('#submit_comment').on('click', (event) => {
        event.preventDefault();
        let email = $('#new_comment_email').val();
        let text = $('#new_comment_text').val();

        if (email === '' || text === '') {
            alert('Все полядолжны быть заполнены!');
            return;
        }

        if (!isEmailValid(email)) {
            alert('Почта не корректна');
            return;
        }

        commentStore({'name' : email, 'text' : text});
    });

    $('.order-by').on('click', (event) => {
        event.preventDefault();
        column = 'id';
        orderBy = $(event.target).data('order');

        commentGetAll();
    });

    $('.order-date').on('click', (event) => {
        event.preventDefault();
        column = 'date';
        orderBy = $(event.target).data('date');

        commentGetAll();
    });

    function commentGetAll() {
        $.ajax({
            url: '/comment/filter',
            method: 'post',
            dataType:'json',
            data : {
                'page' : page,
                'orderBy' : orderBy,
                'column' : column,
            },
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            complete: (data) => {
                data = data.responseJSON;

                this.page = data.page;
                this.orderBy = data.orderByType;
                this.column = data.column;
                this.limit = data.limit;
                this.commentsCount = data.count;
                this.comments = data.comments;
                commentsRender();
                commentsPaginationRender();
                commentsCountRender();
            }
        });
    }

    function commentDelete(id) {
        $.ajax({
            url: '/comment/' + id,
            method: 'delete',
            dataType:'json',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            complete: (data) => {
                commentGetAll();
            }
        });
    }

    function commentStore(data) {
        $.ajax({
            url: '/comment',
            method: 'post',
            dataType:'json',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            data: data,
            complete: (data) => {
                data = data.responseJSON;

                if (data.error) {
                    alert('Почта указана не корректно');
                } else {
                    alert('Комментарий добавлен');
                    $('#new_comment_email').val('');
                    $('#new_comment_text').val('');
                }

                commentGetAll();
            }
        });
    }

    function commentsRender() {
        let commentsBlock = $('#comments');
        let template = '';
        commentsBlock.html('');

        this.comments.forEach((comment) => {
            template += '<li class="list-group-item d-flex justify-content-between lh-condensed">\n' +
                '    <div>\n' +
                '        <p>\n' +
                '            <small># ' + comment.id + ' <?= $comment[\'id\'] ?></small>\n' +
                '            <h3 class="my-0"> ' + comment.name + ' </h3>\n' +
                '        </p>\n' +
                '        <p class="p-4"> ' + comment.text + ' </p>\n' +
                '        <small>\n' +
                '            Дата: <b> ' + comment.date + ' </b>\n' +
                '        </small>\n' +
                '    </div>\n' +
                '    <span class="text-muted">\n' +
                '        <a href="" class="comment-delete" data-id="' + comment.id + '">\n' +
                '            Удалить ' +
                '        </a>\n' +
                '    </span>\n' +
                '</li>'
        })

        commentsBlock.html(template);

        $('.comment-delete').on('click', (event) => {
            event.preventDefault();

            if (confirm('Вы точно хотите удалить?')) {
                let commentId = $(event.target).data('id');
                commentDelete(commentId);
            }
        });
    }

    function commentsCountRender() {
        $('#comment-count').text(this.commentsCount);
    }

    function commentsPaginationRender() {
        let commentsPagination = $('#pagination');
        let template = '';
        commentsPagination.html('');
        let pages = Math.ceil((this.commentsCount / this.limit));

        for (let i = 1; i <= pages; i++)
            template += '<li class="page-item ' + ((this.page == i) ? 'active' : '') + '">\n' +
                '            <a class="page-link" href="#" data-page="'+ i +'">' + i + '</a>\n' +
                '        </li>\n';

        commentsPagination.html(template);

        $('.page-link').on('click', (event) => {
            event.preventDefault();
            page = $(event.target).data('page');

            commentGetAll();
        });
    }

    function isEmailValid(email) {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }
});
