import { Model, DataTypes, Sequelize } from "sequelize";

export class Student extends Model {
  public sbd!: string;

  public toan!: number | null;
  public ngu_van!: number | null;
  public ngoai_ngu!: number | null;

  public vat_li!: number | null;
  public hoa_hoc!: number | null;
  public sinh_hoc!: number | null;

  public lich_su!: number | null;
  public dia_li!: number | null;
  public gdcd!: number | null;

  public ma_ngoai_ngu!: string | null;

  public get groupAScore(): number | null {
    if (
      this.toan !== null &&
      this.vat_li !== null &&
      this.hoa_hoc !== null
    ) {
      return Number((this.toan + this.vat_li + this.hoa_hoc).toFixed(2));
    }

    return null;
  }

  static initialize(sequelize: Sequelize) {
    Student.init(
      {
        sbd: {
          type: DataTypes.STRING,
          primaryKey: true,
        },

        toan: DataTypes.FLOAT,
        ngu_van: DataTypes.FLOAT,
        ngoai_ngu: DataTypes.FLOAT,

        vat_li: DataTypes.FLOAT,
        hoa_hoc: DataTypes.FLOAT,
        sinh_hoc: DataTypes.FLOAT,

        lich_su: DataTypes.FLOAT,
        dia_li: DataTypes.FLOAT,
        gdcd: DataTypes.FLOAT,

        ma_ngoai_ngu: DataTypes.STRING,
      },
      {
        sequelize
      }
    );
  }
}

export interface StudentIDParams
{
  sbd: string
}