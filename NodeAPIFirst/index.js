const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const app = express();
const port = process.env.PORT || 2000;

const productsRouter = require('./routes/product');
const productcategoriesRouter = require('./routes/productcategory');
const customersRouter = require('./routes/customer');
const imagesRouter = require('./routes/image');
const brandRouter = require('./routes/brand');


app.use(cors({
    origin: '*'
}));
app.use(fileUpload());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.use('/product', productsRouter);
app.use('/productcategory', productcategoriesRouter);
app.use('/customer', customersRouter);
app.use('/image', imagesRouter);
app.use('/brand', brandRouter);

app.use(express.static('public'));


/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});


  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});