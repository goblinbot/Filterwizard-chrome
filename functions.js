var currentBuff = "";

function wizardFilter(spell) {

  if(spell) {

    chrome.tabs.query (
     { currentWindow: true, active: true },
         function(tabs) {
             var activeTab = tabs[0];
             var title = activeTab.title;
             console.log(JSON.stringify(title));
      });

    $('body').css('filter','none');

    if (spell == 'clear' || spell == currentBuff) {

      currentBuff = "";

    } else {

      currentBuff = spell;

      if (spell == 'invert') {

        $('body').css('filter','invert(100%)');
        $(activeTab.body).css('filter','invert(100%)');

      } else if (spell == 'blur1px') {

        $('body').css('filter','blur(1px)');

      } else {
        currentBuff = "";
        console.log('wizardfilter: spell failed!')
      }

    }




    // document.getElementsByTagName("body")[0].style = "filter: "+spell+"("+level+")";
    // $('body').css('filter',spell+': '+spell+'('+level+')');

    // console.log('filter',spell+': '+spell+'('+level+');');
  }

}

$(document).ready(function(){
  // document.getElementById('invertSpell').addEventListener('click',wizardFilter('invert','100%'),false);
  $('#invertSpell').click(function(){
    wizardFilter('invert');
  });
  $('#clearSpell').click(function(){
    wizardFilter('clear');
  });
  $('#satanBlurSpell').click(function(){
    wizardFilter('blur1px');
  });

  // chrome.tabs.getCurrent(function(tab) {
  //   alert(tab.title);
  // });
});
