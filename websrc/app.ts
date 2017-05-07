
var fileList : string[] = [];
var headFile : string;

var refresh = () =>
    $.get('/list/')
    .done((data : string[]) => {
        fileList = data;
    });

var nextImage = () => {
    var op = () => {
        headFile = fileList.pop();

        $('#no-images').toggle(!!!headFile);

        $('#capture')
            .attr('src', `capturedData/${headFile}`)
            .toggle(!!headFile);
    }

    if (!fileList.length) {
        refresh().then(op);
    } else {
        op();
    }
};

$('#good-dog').on('click', () => {
    $.post('/good/' + headFile)
    .done(() => {
        nextImage();
    });
});

$('#bad-dog').on('click', () => {
    $.post('/bad/' + headFile)
    .done(() => {
        nextImage();
    });
});

$(() => {
    refresh().then(nextImage)
});