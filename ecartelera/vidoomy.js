var getAttribute = function(attr){
    return document.currentScript.getAttribute(attr)
}
var selectorType = 'class'
var idOrclass = 'article'
var lineBreak = 5
var iframe = document.createElement('iframe')
iframe.width = '720px'
iframe.height = iframe.width.replace('px', '') * 0.5625 + 'px';
iframe.src = '../desktop.html?playerWidth='+ getAttribute('playerWidth') + '&shortPlayerWidth='+ getAttribute('shortPlayerWidth') +'&fontSize='+ getAttribute('fontSize')
var element = selectorType == 'class' ? document.getElementsByClassName('article')[0] : document.getElementsById('article')
var nodeToInsertBefore = element.querySelectorAll('p')[lineBreak]
nodeToInsertBefore.parentNode.insertBefore(iframe, nodeToInsertBefore)
