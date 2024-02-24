import { Connection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import Database from "./Database";

export interface DoseInterface {
  id: number;
  quantity: number;
  expiry_date: number;
  user_id: number;
  ingredient_id: number;
}

class Dose extends Database {
  static connection: Connection;

  static async createDose(newDose: DoseInterface): Promise<ResultSetHeader> {
    await Database.checkDatabaseConnection();
    const query = `INSERT INTO doses (quantity, expiry_date, user_id, ingredient_id) VALUES (?, ?, ?, ?)`;
    const [result] = await Dose.connection.execute<ResultSetHeader>(query, [
      newDose.quantity,
      newDose.expiry_date,
      newDose.user_id,
      newDose.ingredient_id,
    ]);

    return result;
  }

  static async getDoses(): Promise<Dose[]> {
    await Database.checkDatabaseConnection();
    const query = "SELECT * FROM doses";
    const [rows] = await this.connection.execute<RowDataPacket[]>(query);

    return Array.isArray(rows)
      ? rows.map((row) => ({
          id: row.id,
          quantity: row.quantity,
          expiry_date: row.expiry_date,
          user_id: row.user_id,
          ingredient_id: row.ingredient_id,
        }))
      : [];
  }

  static async getDoseById(doseId: number): Promise<Dose | null> {
    await Database.checkDatabaseConnection();
    const query = "SELECT * FROM doses WHERE id = ?";
    const [rows] = await this.connection.execute(query, [doseId]);
    if (Array.isArray(rows) && rows.length > 0) {
      const doseData = rows[0] as RowDataPacket;
      const dose: Dose = {
        id: doseData.id,
        quantity: doseData.quantity,
        expiry_date: doseData.expiry_date,
        user_id: doseData.user_id,
        ingredient_id: doseData.ingredient_id,
      };

      return dose;
    } else {
      return null;
    }
  }

  static async updateDose(
    updatedDose: DoseInterface,
    doseId: number
  ): Promise<Dose | null> {
    await Database.checkDatabaseConnection();
    const query =
      "UPDATE doses SET quantity = ?, expiry_date = ?, user_id = ?, ingredient_id = ? WHERE id = ?";
    const [result] = await Dose.connection.execute<ResultSetHeader>(query, [
      updatedDose.quantity,
      updatedDose.expiry_date,
      updatedDose.user_id,
      updatedDose.ingredient_id,
      doseId,
    ]);

    return result;
  }

  static async deleteDose(doseId: number): Promise<Dose | null> {
    await Database.checkDatabaseConnection();
    const query = "DELETE FROM doses WHERE id = ?";
    const result = await Dose.connection.execute(query, [doseId]);

    return result;
  }
}

export default Dose;
