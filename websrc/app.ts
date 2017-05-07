
var availableWork = {
    goodCount: 0,
    badCount: 0,
    images: <string[]>[]
};

var refresh = () =>
    $.get('/list/')
    .done((data : typeof availableWork) => {
        availableWork = data;
    });

var nextImage = () => {
    var op = () => {
        $('#no-images').toggle(!!!availableWork.images[0]);

        $('#capture')
            .attr('src', `capturedData/${availableWork.images[0]}`)
            .toggle(!!availableWork.images[0]);

        $('#next-up')
            .attr('src', `capturedData/${availableWork.images[1]}`);

        $('#good-dog').text(`Good Dog (${availableWork.goodCount})`);
        $('#bad-dog').text(`Bad Dog (${availableWork.badCount})`);
    }

    if (!availableWork.images.length) {
        refresh().then(op);
    } else {
        op();
    }
};

$('#good-dog').on('click', () => {
    $.post('/good/' + availableWork.images[0])
    .done(() => {
        availableWork.goodCount++;
        nextImage();
    });
});

$('#bad-dog').on('click', () => {
    $.post('/bad/' + availableWork.images[0])
    .done(() => {
        availableWork.badCount++;
        nextImage();
    });
});

$(() => {
    refresh().then(nextImage)
});