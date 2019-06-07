/*jshint esversion:6*/


    function deactivate() {
        activeIMG.style.display='none';
        $(".delBut").remove();
        $(".likeBut").remove();
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
      let lbtn = document.createElement("LIKEBUTTON");
      
      $('img').click(function(){
        let currentPic = $('img.active');
        $(this).addClass('active');
        currentPic.removeClass('active');
        selectedPic = $(this).parent().find('.active').attr('src');


        $('li.list-element').html('<img src="' + selectedPic + '">').hide().fadeIn(2000);
        $('ul img').css({'width': '50%', 'height':'100%', 'margin-left':'18%'});

        let activeIMG = document.getElementById('activeIMG');
        let btn = document.createElement("BUTTON");
        let lbtn = document.createElement("LIKEBUTTON");
        btn.innerHTML = "Kustuta pilt galeriist";
        lbtn.innerHTML = "Lisa enda lemmikutesse";
        

          document.body.appendChild(btn);
          $("BUTTON").addClass("delBut");
          $('.delBut').click(function(){
            $(".active").remove();
            deactivate();
            alert("Pilt kustutatud!");
      });

     });
  });


    function forceHttps() {
      if (window.location.href.indexOf("greeny.cs.tlu.ee") != -1) {
        if (location.protocol == 'http:') {
          location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
        }
      }
    }

    forceHttps();



let deferredPrompt;
const pwaAddButton = document.querySelector("#addButton");

if ('serviceWorker' in navigator) {
window.addEventListener('load', function () {
  navigator.serviceWorker.register('serviceworker.js', {
    scope: '.'
  }).then(function (registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }, function (err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  });
});
}

window.addEventListener('beforeinstallprompt', (e) => {
// Prevent Chrome 67 and earlier from automatically showing the prompt
e.preventDefault();
// Stash the event so it can be triggered later.
deferredPrompt = e;
// Update UI notify the user they can add to home screen
pwaAddButton.style.display = 'flex';

console.log("PWA is ready to install");
});

pwaAddButton.addEventListener('click', (e) => {
// hide our user interface that shows our PWA add button
pwaAddButton.style.display = 'none';
// Show the prompt
deferredPrompt.prompt();
// Wait for the user to respond to the prompt
deferredPrompt.userChoice
  .then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User added the PWA');
    } else {
      console.log('User dismissed the PWA prompt');
    }
    deferredPrompt = null;
  });
});
