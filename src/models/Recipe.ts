import { Model, DataTypes } from "sequelize";
import database from "../database/database";


class Recipe extends Model {
  public id!: number;
  public userId!: string; // email dari google, ganti opsional jika ada data public
  public imageUrl!: string;
  public name!: string;
  public ingridients!: string;
  public steps!: string;
}

Recipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false, // ganti true jika ada data public
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false, // atau false kalau wajib upload gambar
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingridients: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    steps: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize:database,
    tableName: "recipes",
  }
).sync()
.then(()=>console.log("Recipe model synced succesfully. "))
.catch((error:any)=>console.error(`Error syncing Recipe model: ${error.message}`));

export default Recipe;
