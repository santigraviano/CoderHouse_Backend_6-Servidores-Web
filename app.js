const express = require('express')
const Contenedor = require('./Contenedor.js')

const contenedor = new Contenedor('productos.txt')

const app = express()

app.get('/productos', (req, res) => {
  res.json(contenedor.getAll())
})

app.get('/productoRandom', (req, res) => {
  const min = 1, max = contenedor.items.length
  const random_id = Math.round(Math.random() * (max - min)) + min

  res.json(contenedor.getById(random_id))
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})