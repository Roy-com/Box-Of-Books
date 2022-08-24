const express = require("express");
const router = express.Router();
const bookControllers = require("../controllers/book-controller");
 const protectedroute= require("../middleware/CheckAuth")

router.get("/getallbooks", bookControllers.getAllBooks);
router.post("/addBook", bookControllers.addBook);
router.get("/:id", bookControllers.getById);
router.put("/:id", bookControllers.updateBook);
router.delete("/deleteBook/:id", bookControllers.deleteBook);
router.post("/protected",protectedroute,bookControllers.ProtectedRoute)
module.exports = router;
