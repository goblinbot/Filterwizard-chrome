function wizardFilter(spell) {

  if(spell) {

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

  var currentBuff = "";

  chrome.tabs.query ({ currentWindow: true, active: true }, function(tabs) {
   var activeTab = tabs[0];
     chrome.tabs.executeScript(activeTab.id, {
       file: 'jquery.min.js'
     });
     chrome.tabs.executeScript(activeTab.id, {
       file: 'functions.js'
     });
  });

  function validateSpell(spell) {
    if(currentBuff == spell) {
      spell = 'none';
    }
    wizardFilter(spell);
    currentBuff = spell;
  }

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

    $('#clearSpell').click(function(){
      wizardFilter('none');
      currentBuff = 'none';
    });


});
