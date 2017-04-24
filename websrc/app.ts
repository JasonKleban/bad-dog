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

    $("#tinderslide").jTinder({
        // dislike callback
        onDislike: function (item) {
            // set the status text
            $('#status').html('Dislike image ' + (item.index()+1));
        },
        // like callback
        onLike: function (item) {
            // set the status text
            $('#status').html('Like image ' + (item.index()+1));
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
    .done(data => {
        fileList = data;
    });

    var preparePane = () => {
        var paneClass = paneClasses.push(paneClasses.shift());

        var headFile = fileList.pop();

        $('#panes')
            .append($(`<li class="{paneClass}">
                <div class="img"></div>
                <div>{headFile}</div>
                <div class="like"></div>
                <div class="dislike"></div>
            </li>`)
            .data('fileName', headFile));
    };

    $('#panes').empty();

    [0,1,2,3,4].forEach(fileInList => {
        preparePane();
    });
});