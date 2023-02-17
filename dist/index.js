"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const data_source_1 = require("./src/data-source");
const Product_1 = require("./src/entity/Product");
data_source_1.AppDataSource
    .initialize()
    .then(() => {
    console.log('data source has been initialize !');
})
    .catch(err => {
    console.log('err');
});
const app = (0, express_1.default)();
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/upload');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
app.use(express_1.default.static('./src/public'));
app.get('/products/create', (req, res) => {
    res.render('create');
});
app.post("/products/create", upload.single('image'), async (req, res) => {
    try {
        let product = new Product_1.Product();
        product.price = req.body.price;
        product.name = req.body.name;
        product.image = req.file.originalname;
        product.author = req.body.author;
        const productRepository = data_source_1.AppDataSource.getRepository(Product_1.Product);
        await productRepository.save(product);
        console.log(product);
        res.redirect("/products");
    }
    catch (e) {
        console.log(1, e);
    }
});
app.get('/products', async (req, res) => {
    let products = await data_source_1.AppDataSource.getRepository(Product_1.Product).find();
    res.render('list', { products: products });
});
app.listen(3000, () => {
    console.log("App running with port: http://localhost:3000/products/create ");
});
//# sourceMappingURL=index.js.map