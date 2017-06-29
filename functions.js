
function wizardFilter(spell) {

  if(spell) {

    /* haalt/target de DOM van actieve tablat */
    chrome.tabs.query ({ currentWindow: true, active: true }, function(tabs) {
      var activeTab = tabs[0];

      chrome.tabs.executeScript(activeTab.id, {
        code: "$('body').css('filter','"+spell+"')"
      }, function (results) {
        console.log('filterspell '+spell+' ... cast!')
      });

    });

  } else {
    return false;
  }

}

$(document).ready(function(){

  /* var voor validatie van spell toggle */
  var currentBuff = "";

  chrome.tabs.query ({ currentWindow: true, active: true }, function(tabs) {
   var activeTab = tabs[0];

    /* geeft aan de front/DOM de 2 javascripts */
    chrome.tabs.executeScript(activeTab.id, {
      file: 'jquery.min.js'
    });
      chrome.tabs.executeScript(activeTab.id, {
    file: 'functions.js'
    });
  });

  /* checkt of spell al actief is */
  function validateSpell(spell) {
    if(currentBuff == spell) {
      spell = 'none';
    }
    /* call de echte functie */
    wizardFilter(spell);
    currentBuff = spell;
  }

  /* event on clicks: moet helaas via event ipv gewoon onclick want security. */
  $('#invertSpell').click(function(){
    validateSpell('invert(100%)');
  });

  $('#blur1Spell').click(function(){
    validateSpell('blur(1px)');
  });

  $('#saturateSpell').click(function(){
    validateSpell('saturate(1000%)');
  });

  $('#blur4Spell').click(function(){
    validateSpell('blur(4px)');
  });

  /* reset knop */
  $('#clearSpell').click(function(){
    wizardFilter('none');
    currentBuff = 'none';
  });


});
