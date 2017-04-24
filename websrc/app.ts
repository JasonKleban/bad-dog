/// <reference path="../node_modules/@types/jquery/index" />

$(() => {
    var paneClasses = [
        'pane1',
        'pane2',
        'pane3',
        'pane4',
        'pane5'
    ];

    var fileList : string[];

    var preparePane = () => {
        var paneClass = paneClasses.push(paneClasses.shift());

        var headFile = fileList.pop();

        $('#panes')
            .append($(`<li class="${paneClass}">
                <div class="img"></div>
                <div>${headFile}</div>
                <div class="like"></div>
                <div class="dislike"></div>
            </li>`)
            .css('background', `url('capturedData/${headFile}') no-repeat scroll center center`)
            .data('fileName', headFile));
    };

    $("#tinderslide").jTinder({
        // dislike callback
        onDislike: function (item) {
            $.post(`/bad/${item}`)
            .done(() => {
                $('#status').text('Ok');
                preparePane();
            })
            .fail(err => {
                $('#status').text(err);
            });
        },
        // like callback
        onLike: function (item) {
            $.post(`/good/${item}`)
            .done(() => {
                $('#status').text('Ok');
                preparePane();
            })
            .fail(err => {
                $('#status').text(err);
            });
        },
        animationRevertSpeed: 200,
        animationSpeed: 400,
        threshold: 1,
        likeSelector: '.like',
        dislikeSelector: '.dislike'
    });

    /**
     * Set button action to trigger jTinder like & dislike.
     */
    $('.actions .like, .actions .dislike').click(function(e){
        e.preventDefault();
        $("#tinderslide").jTinder($(this).attr('class'));
    });

    $.get('/list/')
    .done((data : string[]) => {
        fileList = data;

        $('#panes').empty();

        [0,1,2,3,4].forEach(fileInList => {
            preparePane();
        });
    });
});
