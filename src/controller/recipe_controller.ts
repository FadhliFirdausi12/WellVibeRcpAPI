import { Request, Response } from "express";
import Recipe from "../models/Recipe";

const RecipeController = {
  index: async (req: Request, res: Response) => {
    try {
      // ✅ KOMENTAR URL KONSISTEN
      // "https://blablaba.com/recipes?userId=example@example.com";
      const userId = req.query.userId;

      const recipes = await Recipe.findAll({
        where: {
          userId: userId
        }
      });

      return res.status(200).json({
        status: 200,
        message: "Recipes sent successfully.",
        recipes: recipes
      });
    } catch (error: any) {
      // ✅ STATUS CODE DIPERBAIKI (200 ❌ → 500 ✅)
      return res.status(500).json({
        status: 500,
        message: `Error fetching recipes: ${error.message}` // ✅ SPASI DI TEMPLATE LITERAL
      });
    }
  },

  show: async (req: Request, res: Response) => {
    try {
      // ✅ KOMENTAR URL KONSISTEN
      // "https://blablaba.com/recipes/1";
      const recipeId = req.params.id;
      const recipe = await Recipe.findByPk(recipeId);

      if (recipe == null) {
        return res.status(404).json({
          status: 404,
          message: "Recipe not found"
        });
      }

      return res.status(200).json({
        status: 200,
        message: "Recipe sent successfully.",
        recipe: recipe
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: `Error fetching recipe: ${error.message}` // ✅ SPASI
      });
    }
  },

  store: async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          status: 400,
          message: "Please upload an image"
        });
      }

      // ✅ KOMENTAR URL KONSISTEN
      // "https://blablaba.com/public/images/dfdrgebntrewsazxs.jpg";
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const imageUrl = `${baseUrl}/public/images/${req.file.filename}`;

      const recipe = await Recipe.create({
        ...req.body,
        imageUrl: imageUrl
      });

      // ✅ STATUS CODE DIPERBAIKI (200 ❌ → 201 ✅)
      return res.status(201).json({
        status: 201,
        message: "Recipe created successfully",
        recipe: recipe
      });

    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: `Error creating recipe: ${error.message}` // ✅ SPASI
      });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      // "https://blablaba.com/recipes/1";
      const recipeId = req.params.id;
      const recipe = await Recipe.findByPk(recipeId);

      if (recipe == null) {
        return res.status(404).json({
          status: 404,
          message: "Recipe not found"
        });
      }

      if (req.file) {
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        const imageUrl = `${baseUrl}/public/images/${req.file.filename}`;
        req.body.imageUrl = imageUrl;
      }

      await recipe.update(req.body);

      return res.status(200).json({
        status: 200,
        message: "Recipe updated successfully",
        recipe: recipe
      });

    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: `Error updating recipe: ${error.message}` // ✅ SPASI
      });
    }
  },

  destroy: async (req: Request, res: Response) => {
    try {
      // "https://blablaba.com/recipes/1";
      const recipeId = req.params.id;
      const recipe = await Recipe.findByPk(recipeId);

      if (recipe == null) {
        return res.status(404).json({
          status: 404,
          message: "Recipe not found"
        });
      }

      await recipe.destroy();

      return res.status(200).json({
        status: 200,
        message: "Recipe deleted successfully"
      });

    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: `Error deleting recipe: ${error.message}` // ✅ SPASI
      });
    }
  }
};

export default RecipeController;
