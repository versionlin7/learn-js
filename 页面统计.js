copy(_(document.querySelectorAll('li>a'))
  .map(it => it.href)
  .countBy(it => it)
  .toPairs()
  .sortBy([1])
  .reverse()
  .map((item, idx) => `<tr><td>${idx}</td><td>${item[0]}</td><td>${item[1]}</td>`)
  .join(''))
  