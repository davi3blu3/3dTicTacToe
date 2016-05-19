$(document).ready(function() {
    
    $('.cascade-1').afterTime(2000, function () {
        $('.cascade-1').addClass("clearBlock");
        alert($('.cascade-1'));
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