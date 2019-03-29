var selectorType = 'class'
var idOrclass = 'article'
var lineBreak = 4
var iframe = document.createElement('iframe')
iframe.width = '720px'
iframe.height = '550px'
iframe.src = '../desktop770x550.html'
var element = selectorType == 'class' ? document.getElementsByClassName('article')[0] : document.getElementsById('article')
var nodeToInsertBefore = element.querySelectorAll('p')[lineBreak]
nodeToInsertBefore.parentNode.insertBefore(iframe, nodeToInsertBefore)