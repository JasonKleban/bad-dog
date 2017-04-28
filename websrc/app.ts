
var fileList : string[] = [ 'https://ashleyfurniture.scene7.com/is/image/AshleyFurniture/68902-38-10x8-CROP?$AFHS-Grid-1X$' ];
var headFile : string;

var nextImage = () => {
    headFile = fileList.pop();

    $('#capture')
        .attr('src', `capturedData/${headFile}`);
};

$('#good-dog').on('click', () => {
    $.get('/good/' + headFile)
    .done((data : string[]) => {
        nextImage();
    });
});

$('#bad-dog').on('click', () => {
    $.get('/bad/' + headFile)
    .done((data : string[]) => {
        nextImage();
    });
});

$(() => {
    $.get('/list/')
    .done((data : string[]) => {
        fileList = data;
        nextImage();
    });
});

//     $("#tinderslide").jTinder({
//         // dislike callback
//         onDislike: function (item) {
//             console.log(item);
//             $.post(`/bad/${$(item).prop('fileName')}`)
//             .done(() => {
//                 $('#status').text('Ok');
//                 preparePane();
//             })
//             .fail(err => {
//                 $('#status').text(err);
//             });
//         },
//         // like callback
//         onLike: function (item) {
//             console.log(item);
//             $.post(`/good/${$(item).prop('fileName')}`)
//             .done(() => {
//                 $('#status').text('Ok');
//                 preparePane();
//             })
//             .fail(err => {
//                 $('#status').text(err);
//             });
//         },
//         animationRevertSpeed: 200,
//         animationSpeed: 400,
//         threshold: 1,
//         likeSelector: '.like',
//         dislikeSelector: '.dislike'
//     });

//     /**
//      * Set button action to trigger jTinder like & dislike.
//      */
//     $('.actions .like, .actions .dislike').click(function(e){
//         e.preventDefault();
//         $("#tinderslide").jTinder($(this).attr('class'));
//     });


// });
