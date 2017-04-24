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
        var headFile = fileList.pop();

        var slide = $(`<li class="${paneClasses[0]}">
                <div class="img"></div>
                <div>${headFile}</div>
                <div class="like"></div>
                <div class="dislike"></div>
            </li>`)
            .data('fileName', headFile);
        
        $('.img', slide)
        .css('background', `url('capturedData/${headFile}') no-repeat scroll center center`);

        $('#panes').append(slide);
        
        var paneClass = paneClasses.push(paneClasses.shift());
    };

    $("#tinderslide").jTinder({
        // dislike callback
        onDislike: function (item) {
            console.log(item);
            $.post(`/bad/${$(item).data('fileName')}`)
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
            console.log(item);
            $.post(`/good/${$(item).data('fileName')}`)
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
