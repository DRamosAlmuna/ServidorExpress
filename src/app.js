import express from 'express';
import productManager from './ProductManager.js';

const app = express();
const port = 8080;

app.use(express.json());

app.get('/products', (req, res) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit)) {
    const limitedProducts = productManager.getProducts().slice(0, limit);
    res.json(limitedProducts);
  } else {
    res.json(productManager.getProducts());
  }
});

app.get('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = productManager.getProductById(productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});