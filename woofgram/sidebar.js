/*jshint esversion:6*/
let navPos = 0;

function toggleNav(){

    if(navPos == 0){
        document.getElementById("mySidenav").style.width = "200px";
        document.getElementById("mySidenav").style.borderRightWidth = "4px";
        document.getElementById("main").style.marginLeft = "200px";
        navPos = 1;
    }else{
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("mySidenav").style.borderRightWidth = "0px";
        document.getElementById("main").style.marginLeft = "0px";
        navPos = 0;
    }
}
