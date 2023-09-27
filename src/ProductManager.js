const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.productIdCounter = 1;
    this.loadProducts();
  }

  addProduct(product) {
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      console.log("Todos los campos son obligatorios");
      return;
    }

    if (this.products.some((existingProduct) => existingProduct.code === product.code)) {
      console.log("El código ya está en uso");
      return;
    }

    const newProduct = {
      id: this.productIdCounter++,
      ...product,
    };
    this.products.push(newProduct);
    this.saveProducts(this.products);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      return product;
    } else {
      console.log("Producto no encontrado");
      return null;
    }
  }

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedProduct, id };
      this.saveProducts(this.products);
      console.log("Producto actualizado exitosamente");
    } else {
      console.log("Producto no encontrado");
    }
  }

  deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProducts(this.products);
      console.log("Producto eliminado exitosamente");
    } else {
      console.log("Producto no encontrado");
    }
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      this.products = JSON.parse(data) || [];
    } catch (error) {
      console.error("Error al leer productos:", error);
      this.products = [];
    }
  }

  saveProducts(dataToSave) {
    try {
      fs.writeFileSync(this.path, JSON.stringify(dataToSave, null, 2));
    } catch (error) {
      console.error("Error al guardar productos:", error);
    }
  }
}

const productManager = new ProductManager('productos.json');
module.exports = ProductManager;

