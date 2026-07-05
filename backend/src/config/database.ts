import { Sequelize, Op } from 'sequelize';
import path from 'path';
import csv from "csv-parser";
import fs from 'fs';
import { Student } from '../models/Student';
import dotenv from 'dotenv'
dotenv.config()

let sequelize: Sequelize;
const BATCH_SIZE = 1000;

if (process.env.DATABASE_URL) {
  console.log('Connecting to PostgreSQL database...');
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    define: {
    freezeTableName: true,
    },
    dialect: 'postgres'
  });
  Student.initialize(sequelize);
} else {
  throw new Error("Missing required environment variable: DATABASE_URL");
}


/**
 * Parses a CSV file and inserts the records into the database
 */
export async function initializeDatabase() {
  try {
    console.log('Running database migrations (syncing schema)...');
    await sequelize.sync();
    console.log('Database synced successfully!');

    // Read students from CSV file at project root
    const count = await Student.count();
    if (count === 0) {
      console.log('Database is empty. Reading diem_thi_thpt_2024.csv file to seed raw THPT 2024 data...');
      
      const csvPath = path.join(process.cwd(), 'diem_thi_thpt_2024.csv');
      
      if (!fs.existsSync(csvPath)) {
        throw new Error(`CSV file not found at path: ${csvPath}`);
      }

      const results: any[] = [];

      await new Promise<void>((resolve, reject) => {
        const stream = fs
          .createReadStream(csvPath)
          .pipe(csv());

        stream.on("data", async (row) => {
          stream.pause();

          results.push({
            sbd: row.sbd,

            toan: row.toan ? Number(row.toan) : null,
            ngu_van: row.ngu_van ? Number(row.ngu_van) : null,
            ngoai_ngu: row.ngoai_ngu ? Number(row.ngoai_ngu) : null,

            vat_li: row.vat_li ? Number(row.vat_li) : null,
            hoa_hoc: row.hoa_hoc ? Number(row.hoa_hoc) : null,
            sinh_hoc: row.sinh_hoc ? Number(row.sinh_hoc) : null,

            lich_su: row.lich_su ? Number(row.lich_su) : null,
            dia_li: row.dia_li ? Number(row.dia_li) : null,
            gdcd: row.gdcd ? Number(row.gdcd) : null,

            ma_ngoai_ngu: row.ma_ngoai_ngu || null,
          });

          if (results.length >= BATCH_SIZE) {
            await Student.bulkCreate(results, {hooks:false, logging: false});

            console.log(`Imported ${results.length} records`);

            results.length = 0;
          }

          stream.resume();
        });

        stream.on("end", async () => {
          if (results.length > 0) {
            await Student.bulkCreate(results, {hooks:false, logging: false});

            console.log(`Imported last ${results.length} records`);
          }

          resolve();
        });

        stream.on("error", reject);
      });
    } else {
      console.log(`Database already has ${count} students. Skipping seeding.`);
    }
  } catch (error) {
    console.error('Lỗi khởi tạo database', error);
    throw error;
  }
}

export { sequelize, Op, Student };
