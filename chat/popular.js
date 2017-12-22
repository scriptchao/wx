
var timer,
    content1 = [
        {
            seat : 1,
            icon : './image/icon5.jpg',
            url : './image/chat1.png'
        },
        {
            seat : 0,
            icon : './image/icon2.png',
            url : './image/chat2.png'
        },
        {
            seat : 0,
            icon : './image/icon3.png',
            url : './image/chat3.png'
        },
        {
            seat : 0,
            icon : './image/icon1.png',
            url : './image/chat4.png'
        },
        {
            seat : 1,
            icon : './image/icon5.jpg',
            url : './image/chat5.png'
        },
        {
            seat : 0,
            icon : './image/icon1.png',
            url : './image/chat6.png'
        },
        {
            seat : 1,
            icon : './image/icon5.jpg',
            url : './image/chat7.png'
        },
        {
            seat : 0,
            icon : './image/icon1.png',
            url : './image/chat8.png'
        },
    ],
    content2 = [
        {
            seat : 0,
            icon : './image/icon4.png',
            url : './image/chat9.png'
        },
        {
            seat : 1,
            icon : './image/icon5.jpg',
            url : './image/chat10.png'
        },
        {
            seat : 0,
            icon : './image/icon4.png',
            url : './image/chat9.png'
        },
        {
            seat : 0,
            icon : './image/icon4.png',
            url : './image/chat9.png'
        }
    ];
function id(tag) {
    return document.getElementById(tag)
}
function qs(tag) {
    return document.querySelector(tag)
}
function qsa(tag) {
    return document.querySelectorAll(tag)
}
qs('.answer').addEventListener('touchend',function () {
    var count = 0,
        min = 0,
        s = 0;
    $('.page1').removeClass('png1').addClass('png2');
    $('.answer').remove();
    $('.refuse').remove();
    $('#startSound')[0].pause();
    $('.move_refuse').fadeIn(50).animate({
        right : (150/20) + 'rem'
    });
    timer = setInterval(function () {
        $('.hodTime').text(hodTime(count++));
    },1000);
    var timer5 = setTimeout(function () {
        clearTimeout(timer5);
        $('#bossSound')[0].play();
    },150)
});
qs('.refuse').addEventListener('touchend',function () {
    $('.page1').slideUp(200);
    $('.bossChat').show();
    $('#startSound')[0].pause();
    bossChat1(content2,0)
});
qs('.move_refuse').addEventListener('touchend',function () {
    $('#bossSound')[0].pause();
    callEnd();
});
$('#bossSound').bind('ended',function () {
    callEnd();
});
function hodTime(t) {
    min = Math.floor(t / 60 % 60);
    min = min < 10 ? '0'+ min : min;
    s = t % 60;
    s = s < 10 ? '0'+ s : s;
    return min + ':' + s;
}
function groupChat1() {
    var timer4 = setTimeout(function () {
        clearTimeout(timer4);
        $('.typewriting').show().animate({
            height :  (307/20) + 'rem'
        });
        $('<i class="rect"></i>').addClass('showPilot').appendTo('.typewriting');
        $('<span class="myText size14"></span>').text('今年我们公司突然取消了年终奖......').appendTo('.typewriting');
        $('<a class="hideTypewriting"></a>').addClass('pilot showPilot placeBoss').appendTo('.typewriting').on('touchend',function () {
            $(this).remove();
            $('.typewriting').animate({
                height :  0
            });
            $('.myText').remove();
            $('.rect').remove();
            groupChat2(content1)
        });
    },1500);
}
function groupChat2(item) {
    var len = item.length,
        i = 0;
    var icon = $('<i></i>'),
        img = $('<img />');
    icon.addClass('icon').css({
        'background-image' : 'url(' + item[i].icon + ')'
    });
    img.addClass('text').attr({
        src : item[i].url
    });
    if(item[i].seat){
        icon.addClass('right');
        img.addClass('right');
        $('<div></div>').addClass('item').appendTo($('.groupChat')).append(icon).append(img).fadeIn(200)
    }else{
        icon.addClass('left');
        img.addClass('left');
        $('<div></div>').addClass('item').appendTo($('.groupChat')).append(icon).append(img).fadeIn(200)
    }
    i++;
    $('#chatSound')[0].play();
    var timer2 = setInterval(function () {
        var icon = $('<i></i>'),
            img = $('<img />');
        icon.addClass('icon').css({
            'background-image' : 'url(' + item[i].icon + ')'
        });
        img.addClass('text').attr({
            src : item[i].url
        });
        if(item[i].seat){
            icon.addClass('right');
            img.addClass('right');
            $('<div></div>').addClass('item').appendTo($('.groupChat')).append(icon).append(img).fadeIn(200)
        }else{
            icon.addClass('left');
            img.addClass('left');
            $('<div></div>').addClass('item').appendTo($('.groupChat')).append(icon).append(img).fadeIn(200)
        }
        i++;
        $('#chatSound')[0].play();
        if(i == len){
            clearInterval(timer2);
            pilotClick()
        }
    },1800)
}
function bossChat1(item,index) {
    var timer3 = setTimeout(function () {
        var icon = $('<i></i>'),
            img = $('<img />');
        icon.addClass('icon').css({
            'background-image' : 'url(' + item[index].icon + ')'
        });
        img.addClass('text').attr({
            src : item[index].url
        });
        if(item[index].seat){
            icon.addClass('right');
            img.addClass('right');
            $('<div></div>').addClass('item').appendTo($('.bossChat')).append(icon).append(img).fadeIn(200)
        }else{
            icon.addClass('left');
            img.addClass('left');
            $('<div></div>').addClass('item').appendTo($('.bossChat')).append(icon).append(img).fadeIn(200)
        }
        clearTimeout(timer3);
        $('#chatSound')[0].play();
        var timer4 = setTimeout(function () {
            clearTimeout(timer4);
            $('.typewriting').show().animate({
                height :  (307/20) + 'rem'
            });
            $('<i class="rect"></i>').addClass('showPilot').appendTo('.typewriting');
            $('<span class="myText size14"></span>').text('......').appendTo('.typewriting');
            $('<a class="hideTypewriting"></a>').addClass('pilot showPilot placeBoss').appendTo('.typewriting').on('touchend',function () {
                $(this).remove();
                $('.typewriting').animate({
                    height :  0
                });
                $('.myText').remove();
                $('.rect').remove();
                bossChat2(content2)
            });
        },500);
    },1500)
}
function bossChat2(item) {
    var len = item.length,
        i = 1;
    var icon = $('<i></i>'),
        img = $('<img />');
    icon.addClass('icon').css({
        'background-image' : 'url(' + item[i].icon + ')'
    });
    img.addClass('text').attr({
        src : item[i].url
    });
    if(item[i].seat){
        icon.addClass('right');
        img.addClass('right');
        $('<div></div>').addClass('item').appendTo($('.bossChat')).append(icon).append(img).fadeIn(200)
    }else{
        icon.addClass('left');
        img.addClass('left');
        $('<div></div>').addClass('item').appendTo($('.bossChat')).append(icon).append(img).fadeIn(200)
    }
    i++;
    $('#chatSound')[0].play();
    var timer2 = setInterval(function () {
        var icon = $('<i></i>'),
            img = $('<img />');
        icon.addClass('icon').css({
            'background-image' : 'url(' + item[i].icon + ')'
        });
        img.addClass('text').attr({
            src : item[i].url
        });
        if(item[i].seat){
            icon.addClass('right');
            img.addClass('right');
            $('<div></div>').addClass('item').appendTo($('.bossChat')).append(icon).append(img).fadeIn(200)
        }else{
            icon.addClass('left');
            img.addClass('left');
            $('<div></div>').addClass('item').appendTo($('.bossChat')).append(icon).append(img).fadeIn(200)
        }
        i++;
        $('#chatSound')[0].play();
        if(i == len){
            clearInterval(timer2);
            pilotClick()
        }
    },1500)
}
function pilotClick() {
    if($('.groupChat')){
        $('<a href="http://h5.welian.com/event/i/MjY3MTE"></a>').addClass('pilot showPilot placeGroup').appendTo('.groupChat .item:eq(7)')
    }
    if($('.bossChat')){
        $('<a href="http://h5.welian.com/event/i/MjY3MTE"></a>').addClass('pilot showPilot placeGroup').appendTo('.bossChat .item:eq(3)')
    }
}
function callEnd() {
    $('.page1').removeClass('png2').addClass('png3');
    clearInterval(timer);
    $('.move_refuse').remove();
    $('.hodTime').text('');
    var timer1 = setTimeout(function () {
        clearTimeout(timer1);
        $('.page1').slideUp(200);
    },500);
    $('.groupChat').show();
    groupChat1()
}
