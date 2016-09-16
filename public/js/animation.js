$(document).ready(function() {
    var stopClick = true; // disables click during reset
    
    cascade();
    
    // START OF GAME CASCADING ANIMATION
    function cascade() {
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
            stopClick = false;
        });       
    }


    $('#reset-btn').click(function() {
        $('.box').removeClass('showRight');
        $('.box').removeClass('showLeft');
        $('.box').removeClass('clearBlock');
        $('#banner').html("TIC-TAC-TOE!");
        board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        stopClick = true;
        turn = true;
        cascade();
    })
    
    $('.box').on("click", function() {
        //disabled click during reset animation
        if (!stopClick) {
            $(this).removeClass('clearBlock');
            var location = ( $(this).attr('id') );
            $(this).addClass('showRight');
            xMove(location, "X");
            stopClick = true;
            var oLoc = oMove();
            $('#' + oLoc).afterTime(1000, function() {
                $('#' + oLoc).addClass('showLeft');
                return (stopClick = false);
            });
            

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