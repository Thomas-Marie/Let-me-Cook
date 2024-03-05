import { Connection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import Database from "./Database";

export interface QuantityInterface {
  id: number;
  dose: number;
  recipe_id: number;
  ingredient_id: number;
}

class Quantity extends Database {
  static connection: Connection;

  static async createQuantity(
    newQuantity: QuantityInterface
  ): Promise<ResultSetHeader> {
    await Database.checkDatabaseConnection();
    const query = `INSERT INTO quantities (dose, recipe_id, ingredient_id) VALUES (?, ?, ?)`;
    const [result] = await Quantity.connection.execute<ResultSetHeader>(query, [
      newQuantity.dose,
      newQuantity.recipe_id,
      newQuantity.ingredient_id,
    ]);

    return result;
  }

  static async getQuantities(): Promise<Quantity[]> {
    await Database.checkDatabaseConnection();
    const query = "SELECT * FROM quantities";
    const [rows] = await this.connection.execute<RowDataPacket[]>(query);

    return Array.isArray(rows)
      ? rows.map((row) => ({
          id: row.id,
          dose: row.dose,
          recipe_id: row.recipe_id,
          ingredient_id: row.ingredient_id,
        }))
      : [];
  }

  static async getQuantitiesByRecipeId(recipeId: number): Promise<Quantity[]> {
    await Database.checkDatabaseConnection();
    const query = "SELECT * FROM quantities WHERE recipe_id = ?";
    const [rows] = await this.connection.execute<RowDataPacket[]>(query, [
      recipeId,
    ]);

    return Array.isArray(rows)
      ? rows.map((row) => ({
          id: row.id,
          recipe_id: row.recipe_id,
          ingredient_id: row.ingredient_id,
          quantity: row.quantity,
        }))
      : [];
  }

  static async getQuantityById(quantityId: number): Promise<Quantity | null> {
    await Database.checkDatabaseConnection();
    const query = "SELECT * FROM quantities WHERE id = ?";
    const [rows] = await this.connection.execute(query, [quantityId]);
    if (Array.isArray(rows) && rows.length > 0) {
      const quantityData = rows[0] as RowDataPacket;
      const quantity: Quantity = {
        id: quantityData.id,
        dose: quantityData.dose,
        recipe_id: quantityData.recipe_id,
        ingredient_id: quantityData.ingredient_id,
      };

      return quantity;
    } else {
      return null;
    }
  }

  static async updateQuantity(
    updatedQuantity: QuantityInterface,
    quantityId: number
  ): Promise<Quantity | null> {
    await Database.checkDatabaseConnection();
    const query =
      "UPDATE quantities SET dose = ?, recipe_id = ?, ingredient_id = ? WHERE id = ?";
    const [result] = await Quantity.connection.execute<ResultSetHeader>(query, [
      updatedQuantity.dose,
      updatedQuantity.recipe_id,
      updatedQuantity.ingredient_id,
      quantityId,
    ]);

    return result;
  }

  static async deleteQuantity(quantityId: number): Promise<Quantity> {
    await Database.checkDatabaseConnection();
    const query = "DELETE FROM quantities WHERE id = ?";
    const result = await Quantity.connection.execute(query, [quantityId]);

    return result;
  }
}

export default Quantity;
