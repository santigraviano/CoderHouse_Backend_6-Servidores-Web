/**
 * Nombre: Santiago Graviano
 * Desafio: Manejo de Archivos en Javascript
 */

const fs = require('fs')
const path = require('path')

class Contenedor {

  static id = 0

  constructor(filename) {
    this.filename = filename
    this.path = path.join(__dirname, this.filename)

    // If file exists read it and assign its value to this.items
    if (fs.existsSync(this.path)) {
      this.items = JSON.parse(fs.readFileSync(this.path))

      // If there are items assign Contenedor.id to be equal to the last item's id
      if (this.items.length > 0) {
        Contenedor.id = this.items[this.items.length - 1].id
      }

    }
    // If file does not exists create the file with an empty array
    else {
      fs.writeFileSync(this.path, JSON.stringify([]))
      this.items = []
    }
  }

  async save(obj) {
    // Increase by 1 the id and assign it to obj
    obj.id = ++Contenedor.id
    this.items.push(obj)

    try {
      await this.saveAll()
    }
    catch (err) {
      throw err
    }

    return obj.id
  }

  async saveAll() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.items))
    }
    catch (err) {
      throw err
    }
  }

  getById(id) {
    const item = this.items.find(e => e.id === id)
    if (item != undefined) return item
    else return null
  }

  getAll() {
    return this.items
  }

  async deleteById(id) {
    const index = this.items.findIndex(e => e.id === id)
    
    if (index != -1) {
      this.items.splice(index, 1)

      try {
        await this.saveAll()
      }
      catch (err) {
        throw err
      }
    }
    else {
      console.log('Item not found')
    }
  }

  async deleteAll() {
    this.items = []
    try {
      await this.saveAll()
    }
    catch (err) {
      throw err
    }
  }
}

module.exports = Contenedor