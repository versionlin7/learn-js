function cloneNode(node, deep = false) {
  if(node.nodeType == document.TEXT_NODE){
    return document.createTextNode(node.nodeValue)
  }else if(node.nodeType == document.ELEMENT_NODE){
    var newNode = document.createElement(node.tagName) 
    var attrNames = node.getAttributeNames()
    for(let attrName of attrNames) {
      newNode.setAttribute(attrName, node.getAttribute(attrName))
    }
    for(let i = 0; i < node.childNodes.length; i++) {
      newNode.appendChild(cloneNode(node.childNodes[i]))
    }
    return newNode
  }
}



//获取文本节点里的内容
function getText(node) {
  if(node.nodeType == document.TEXT_NODE) {
    return node.nodeValue
  }else if(node.nodeType == document.ELEMENT_NODE) {
    var result = ''
    for(let i = 0; i < node.childNode.length; i++) {
      result += getText(node.childNode[i])
    }
    return  result
  }
  throw new Error('not a valid node')
}
//$0.childNodes 会获得文本子节点和标签子节点
//$0.children  只会获得标签子节点
//document.getElementById('bar')
//document.getElementsByName
//$0.getElementsByTagName('p')返回类数组对象
//$0.getElementsByCetElementsByClassName('row')
//$0.getElementsByTagName('section')[0]获得整个标签及其所有子节点
//$0.cloneNode(node, deep =true)true为深度复制




function getOuterHTML(node) {
  if(node.nodeType == document.TEXT_NODE) {
    return node.nodeValue
  }else if (node.nodeType == document.ELEMENT_NODE) {
    var result = '<' + node.tagName
    var attrNames = node.getAttributeNames()
    for(var attrName of attrNames) {
      result += `${attrName}="${node.getAttribute(attrName)}"`
    }
    result += '>'
    for(var i = 0; i < node.childNodes.length; i++) {
      result += getOuterHTML(node.childNodes[i])
    }
    result += '</' + node.tagName + '>'
    return result
  }
}


