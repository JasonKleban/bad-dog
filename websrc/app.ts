
var fileList : string[] = [];
var headFile : string;

var nextImage = () => {
    headFile = fileList.pop();

    $('#capture')
        .attr('src', `capturedData/${headFile}`);
};

$('#good-dog').on('click', () => {
    $.post('/good/' + headFile)
    .done((data : string[]) => {
        nextImage();
    });
});

$('#bad-dog').on('click', () => {
    $.post('/bad/' + headFile)
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