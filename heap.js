class minheap{
  constructor (initial = []) {
    this._elements = initial.slice()
    this._heapify(this._elements)
  }
  push(val) {
    this._elements.push(val)
    this._heapup(this._elements)
    return this._elements
  }
  _heapify(ary) {
    let lastparentNode = (ary.length - 2) >> 1
    for(let i = lastparentNode; i >= 0; i--) {
      this._heapdown(ary, i)
    }
    return ary
  }
  _heapup(ary) {
    let curNode = ary.length - 1
    let parentNode = (ary.length - 2) >> 1
    while(parentNode >= 0) {
      if(ary[curNode] < ary[parentNode]) {
        this._swap(ary, curNode, parentNode)
        curNode = parentNode
        parentNode = (curNode - 1) >> 1
      }else {
        return ary
      }
    }
    return ary
  }
  _heapdown(ary, Node = 0, len = ary.length - 1) {
    let curr = Node
    let min = curr
    let lcNode = curr * 2 + 1
    let rcNode = curr * 2 + 2
    if(lcNode <= len && ary[min] > ary[lcNode]) {
      min = lcNode
    }
    if(rcNode <= len && ary[min] > ary[rcNode]) {
      min = rcNode
    }
    if(curr != min) {
      this._swap(ary, min, curr)
      this._heapdown(ary, min)
    }
    return ary
  }
  get size() {
    return this._elements.length
  }
  pop() {
    this._swap(this._elements, 0, this._elements.length - 1)
    let min = this._elements.pop()
    this._heapdown(this._elements, 0)
    return min
  }
  get peek() {
    return this._elements[0]
  }
  _swap(ary, i, j){
    let tmp = ary[i]
    ary[i] = ary[j]
    ary[j] = tmp
  }
}