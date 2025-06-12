//@ts-nocheck
import express from 'express'
import upload from '../middleware/upload';
import RecipeController from '../controller/recipe_controller';

const router = express.Router()


router.get("/recipes", RecipeController.index)
router.get("/recipe/:id", RecipeController.show)
router.post("/recipe", upload.single("image"), RecipeController.store);
router.put("/recipe/:id", upload.single("image"), RecipeController.update)
router.delete("/recipe/:id", RecipeController.destory);

export default router