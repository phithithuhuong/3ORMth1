import multer from 'multer';
// const upload = multer();
 import express from 'express';
import bodyParser from 'body-parser';
import {AppDataSource} from "./src/data-source";
import {Product} from "./src/entity/Product";
// thiết lập kết nối với cơ sở dữ liệu
AppDataSource
.initialize()
.then(()=>{
    console.log('data source has been initialize !')
})
.catch(err=>{
    console.log('err')
});
const app = express();
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(bodyParser.json());
app.use(express.json());
//cấu hình thư viện multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })
app.use(express.static( './src/public'));
app.get('/products/create', (req, res) => {
    res.render('create')
})
app.post("/products/create", upload.single('image'), async (req: any, res: any) => {
    try {
        let product = new Product();
        product.price = req.body.price;
        product.name = req.body.name;
        product.image = req.file.originalname;
        product.author = req.body.author;
        const productRepository = AppDataSource.getRepository(Product)
        await productRepository.save(product);
        console.log(product)
        res.redirect("/products")
    }catch (e) {
        console.log(1,e);
    }
});
app.get('/products', async (req , res) => {

    let products = await AppDataSource.getRepository(Product).find();

    res.render('list', {products: products});
});

app.listen(3000, () => {
    console.log("App running with port: http://localhost:3000/products/create ")
})