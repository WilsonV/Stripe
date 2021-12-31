require('dotenv').config()
const express = require('express');
const app = express()

const stripe = require('stripe')(process.env.STRIPE_API_KEY)

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


app.listen(3000,()=> {console.log("Server is listening on port 3000")})
