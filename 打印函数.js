function print(e) {
  var iframe = e.target.parentNode.lastChild
  let table = `
    <table style='border:1px solid'>
      <thead>
        <tr>
          <th>名称</th>
          <th>数量</th>
          <th>价格</th>
        </tr>
      </thead>
      <tbody>
        ${orderInfo.details.map(val => {
          return (`<tr>
            <td>${val.food.name}</td>
            <td>${val.amount}</td>
            <td>${val.food.price}</td>
          </tr>`)
        })}
      </tbody>
    </table>`
  let content = `
    <h2>${orderInfo.deskname}</h2>
    <h3>总人数：${orderInfo.customCount}</h3>
    <p>时间：${Date(orderInfo.timestamp).slice(11,24)}</p>
    ${table}
    <p>总价格：${orderInfo.totalPrice}</p>
    <p>订单状态：${orderInfo.status}</p>
  `
  console.log(content)
  // iframe.innerHTML =content
  iframe.contentWindow.document.body.innerHTML=content
  // iframe.contentDocument.close();
  iframe.contentWindow.print();
  iframe.contentWindow.document.body.innerHTML=''
}