var currentBuff = "";

function wizardFilter(spell) {

  if(spell) {

    if (spell == currentBuff) {
      currentBuff = "none";
    } else {
      currentBuff = spell;
    }

    chrome.tabs.query ({ currentWindow: true, active: true }, function(tabs) {
      var activeTab = tabs[0];

      chrome.tabs.executeScript(activeTab.id, {
        code: "$('body').css('filter','"+spell+"')"
      }, function (results) {
        console.log('filterspell '+spell+' ... cast!')
        currentBuff = spell;
      });

    });

  } else {
    return false;
  }

}

$(document).ready(function(){

  chrome.tabs.query ({ currentWindow: true, active: true }, function(tabs) {
   var activeTab = tabs[0];
     chrome.tabs.executeScript(activeTab.id, {
       file: 'jquery.min.js'
     });
     chrome.tabs.executeScript(activeTab.id, {
       file: 'functions.js'
     });
  });

  $('#invertSpell').click(function(){
    wizardFilter('invert(100%)');
  });

  $('#clearSpell').click(function(){
    wizardFilter('none');
  });
  $('#blur1Spell').click(function(){
    wizardFilter('blur(1px)');
  });
  $('#saturateSpell').click(function(){
    wizardFilter('saturate(1000%)');
  });
  $('#blur4Spell').click(function(){
    wizardFilter('blur(4px)');
  });
});
