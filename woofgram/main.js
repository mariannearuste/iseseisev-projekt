/*jshint esversion:6*/
function deactivate() {
    activeIMG.style.display='none';
  
    $(".delBut").remove();
  }

  $(".delBut").on('tap', deletePic);
  function deletePic(){

  }

$(document).ready(function(){
  $('#list').css({ 'width':'100%','height':'100%','padding-top': '20px', 'padding-bottom': '20px'});
  $('.list-element').css({'list-style-type':'none'});
  $('img').css({'width':'20vw'});
  let activeIMG = document.getElementById('activeIMG');
  let btn = document.createElement("BUTTON");
  let lke = document.createElement("BUTTON");

  $('img').click(function(){
    let currentPic = $('img.active');
    $(this).addClass('active');
    currentPic.removeClass('active');
    selectedPic = $(this).parent().find('.active').attr('src');


    $('li.list-element').html('<img src="' + selectedPic + '">').hide().fadeIn(2000);
    $('ul img').css({'width': '50%', 'height':'70%', 'margin-left':'18%'});

    let activeIMG = document.getElementById('activeIMG');
    let btn = document.createElement("BUTTON");
    btn.innerHTML = "Kustuta";
    let lke = document.createElement("BUTTON");
    lke.innerHTML = "Like";




    document.body.appendChild(btn);
    $("BUTTON").addClass("delBut");
    $('.delBut').click(function(){
      

      $(".active").remove();
      deactivate();
      alert("Pilt kustutatud!");
    });


  });
});
