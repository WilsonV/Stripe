require('dotenv').config()
const express = require('express');
const app = express()

const stripe = require("stripe")(process.env.STRIPE_API_KEY)

//console.log("Stripe is", stripe.checkout.sessions)

const Products = {
  1:{name: "JS Cheat Sheet", price: 1000},
  2:{name: "GTX 3090", price: 200000},
  3:{name: "GTA V Re-Mastered", price: 9000},
  4:{name: "Microphone", price: 3000},
}

app.use(express.json())
app.use(express.static("public"))

app.get('/products', (req, res)=>{
  const productValues = Object.values(Products)
  const productNames = [];
  for(let item of productValues){
    productNames.push(item.name)
  }
  res.json(productNames)
})

app.post('/checkout', async (req, res)=>{

  try {
    console.log("Name is",req.body)
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode:'payment',
    line_items: function(){
      const values = Object.values(Products)
      for(let item of values){
        console.log("looking at", item)
        if(item.name == req.body.name){
        console.log("making array for", item.name)
          return [{
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name
              },
              unit_amount: item.price
            },
            quantity: 1
          }]
        }
      }

      return []
    }.call(),
    success_url: 'http://localhost:3000/success.html',
    cancel_url: 'http://localhost:3000/fail.html'
  })

  res.json({url: session.url})
  } catch (error) {
    console.log(error.message)
  }

})

app.listen(3000,()=> {console.log("Server is listening on port 3000")})
