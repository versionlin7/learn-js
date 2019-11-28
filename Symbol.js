(function() {
  var age = Symbol()
  window.People = class People {
    constructor(name , gender, theAge) {
      this.name = name
      this.gender = gender
      this[age] = theAge
    }
    getAge() {
      if(this.gender == 'f') {
        return 18
      }else {
        return this[age]
      }
    }
  }
}())