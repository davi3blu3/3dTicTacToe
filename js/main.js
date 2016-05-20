$(document).ready(function() {
    
    $('.cascade-1').afterTime(2000, function () {
        $('.cascade-1').addClass("clearBlock");
    });
    $('.cascade-2').afterTime(2200, function () {
        $('.cascade-2').addClass("clearBlock");
    });
    $('.cascade-3').afterTime(2400, function () {
        $('.cascade-3').addClass("clearBlock");
    });
    $('.cascade-4').afterTime(2600, function () {
        $('.cascade-4').addClass("clearBlock");
    });
    $('.cascade-5').afterTime(2800, function () {
        $('.cascade-5').addClass("clearBlock");
    });
    $('.cascade-6').afterTime(3000, function () {
        $('.cascade-6').addClass("clearBlock");
    });

    
    $('.box').click(function() {
        $(this).removeClass('clearBlock');
        // $(this).addClass('showRight');
        $(this).addClass('showLeft');
       
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