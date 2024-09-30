const express = require("express");
const upload  = require ("../middleware/multer");
const {getAllProduct , createProduct, updateProduct, deleteProduct , updateProductWithImage} = require("../controller/product");
const router = express.Router();


router.get("/product",getAllProduct);
router.post("/product",upload.single("productImage"),createProduct);
router.put("/product/:id",upload.none(),updateProduct);
router.put("/productWithImage/:id",upload.none(),updateProductWithImage);
router.delete("/productdelete/:id",deleteProduct);


module.exports = router;