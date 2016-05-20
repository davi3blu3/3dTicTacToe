$(document).ready(function() {
    var turn = true, // alternates between click animation
        i;
    
    $('.cascade-1').afterTime(2000, function () {
        $('.cascade-1').addClass("clearBlock");
    });
    $('.cascade-2').afterTime(2250, function () {
        $('.cascade-2').addClass("clearBlock");
    });
    $('.cascade-3').afterTime(2500, function () {
        $('.cascade-3').addClass("clearBlock");
    });
    $('.cascade-4').afterTime(2750, function () {
        $('.cascade-4').addClass("clearBlock");
    });
    $('.cascade-5').afterTime(3000, function () {
        $('.cascade-5').addClass("clearBlock");
    });
    $('.cascade-6').afterTime(3250, function () {
        $('.cascade-6').addClass("clearBlock");
    });

    
    
    $('.box').click(function() {
        $(this).removeClass('clearBlock');
        if(turn) {
            $(this).addClass('showRight');
            turn = false;
        } else {
            $(this).addClass('showLeft');
            turn = true;
        }
    });

});

jQuery.fn.extend({
    afterTime: function (sec, callback) {
        that = $(this);
        setTimeout(function () {
            callback.call(that);
        }, sec);
        return this;
    }
});