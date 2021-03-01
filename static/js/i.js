//User start
var userisOpen = false;
function userShow() {
    document.getElementById("entor").className = "entor entoron";
    setTimeout(function() {
        $('.entorevolution').animate({
            top: '0px',
        },
        150);
    },
    300);
}
function userHide() {
    document.getElementById("entor").className = "entor";
    $('.entorevolution').animate({
        top: '-220px',
    },
    150);
}

$('.avatar').on('click',function(ue) {
    var UidOfCookie = "uid";
    var ifsign = document.cookie.indexOf(UidOfCookie + "=");
    if (ifsign != -1) {
        ue.stopPropagation();
        if (userisOpen) {
            userHide();
            userisOpen = false;
            return;
        } else {
            userisOpen = true;
            userShow();
        }
    } else {
        location.href = "http://bbs.cilicili.cc/member.php?mod=logging&action=login&referer=";
    }
});

$("#entoroff").click(function() {
    if (userisOpen) {
        userHide();
        userisOpen = false;
        return;
    }
});
//User end

/** Google Analytics **/
// (function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,"script","https://cdn.bootcss.com/analytics.js/2.9.1/analytics.js","ga");ga("create","UA-76379924-1","auto");ga("send","pageview");