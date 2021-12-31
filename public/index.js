

async function getProducts(){

  try {
    const response = await fetch('/products')
    const data = await response.json()
    const select = document.createElement('select')
    select.id = 'product-select'
    for(let i = 0; i < data.length; i++){
      let opt = document.createElement('option')
      opt.text = data[i]
      select.add(opt)
    }
    document.body.appendChild(select)
  } catch (error) {
    console.log("Could not get products list")
    console.log(error)
  }


}


function addCheckOutButton() {

  try {
    const button = document.createElement('button')
    button.innerHTML = "Checkout"

    button.addEventListener('click',async ()=>{
      const product = document.getElementById('product-select').value
      console.log("Selected",product)


      const response = await fetch('/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: product})
      })

      const data = await response.json()
      window.location = data.url
    })

    document.body.appendChild(button)
  } catch (error) {
    console.log(error)
  }

}

getProducts()
addCheckOutButton()



