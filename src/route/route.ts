//@ts-nocheck
import express from 'express'
import RecipeController from '../controller/recipe_controller';

const router = express.Router()
router.get(".recipes", )

router.get("/recipes", RecipeController.index)
router.get("/recipes/:id", RecipeController.show)
router.post("/recipes", upload.single("image"), RecipeController.store);
router.put("/recipes/:id", upload.single("image"), RecipeController.update)
router.delete("/recipes/:id", RecipeController.destory);

export default router