import { Connection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import Database from "./Database";

export interface UnitInterface {
  name: string;
}

class Unit extends Database {
  static connection: Connection;

  static async createUnit(newUnit: UnitInterface): Promise<ResultSetHeader> {
    if (!Unit.connection) {
      Unit.connection = await Database.getDbInstance();
      if (!Unit.connection) {
        throw new Error("connection not initialised");
      }
    }

    const query = `INSERT INTO units (name) VALUES (?)`;
    const [result] = await Unit.connection.execute<ResultSetHeader>(query, [
      newUnit.name,
    ]);

    return result;
  }

  static async getUnits(): Promise<Unit[]> {
    if (!Unit.connection) {
      Unit.connection = await Database.getDbInstance();
      if (!Unit.connection) {
        throw new Error("connection not initialised");
      }
    }
    const query = "SELECT * FROM units";
    const [rows] = await this.connection.execute<RowDataPacket[]>(query);

    return Array.isArray(rows)
      ? rows.map((row) => ({
          id: row.id,
          name: row.name,
        }))
      : [];
  }

  static async getUnitById(unitId: number): Promise<Unit | null> {
    if (!Unit.connection) {
      Unit.connection = await Database.getDbInstance();
      if (!Unit.connection) {
        throw new Error("connection not initialised");
      }
    }
    const query = "SELECT * FROM units WHERE id = ?";
    const [rows] = await this.connection.execute(query, [unitId]);
    if (Array.isArray(rows) && rows.length > 0) {
      const unitData = rows[0] as RowDataPacket;
      const unit: Unit = {
        id: unitData.id,
        Unitname: unitData.name,
      };
      return unit;
    } else {
      return null;
    }
  }

  static async updateUnit(
    updatedUnit: UnitInterface,
    unitId: number
  ): Promise<Unit | null> {
    if (!Unit.connection) {
      Unit.connection = await Database.getDbInstance();
      if (!Unit.connection) {
        throw new Error("connection not initialised");
      }
    }
    const query = "UPDATE units SET name = ? WHERE id = ?";
    const [result] = await Unit.connection.execute<ResultSetHeader>(query, [
      updatedUnit.name,
      unitId,
    ]);

    return result;
  }

  static async deleteUnit(unitId: number): Promise<Unit | null> {
    if (!Unit.connection) {
      Unit.connection = await Database.getDbInstance();
      if (!Unit.connection) {
        throw new Error("connection not initialised");
      }
    }

    const query = "DELETE FROM units WHERE id = ?";
    const result = await Unit.connection.execute(query, [unitId]);
    return result;
  }
}

export default Unit;
