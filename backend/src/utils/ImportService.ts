import {createReader} from "../utils/csv-reader";
import { Student } from "../models/Student";
import { CsvScore } from "../models/CsvScore";

const BATCH_SIZE = 1000;

class ImportService {

    async import(file: string): Promise<void> {

        const reader = createReader(file);

        const batch: any[] = [];

        for await (const row of reader as AsyncIterable<CsvScore>) {

            batch.push({

                sbd: row.sbd,

                math: Number(row.toan) || null,

                literature: Number(row.ngu_van) || null,

                foreignScore: Number(row.ngoai_ngu) || null,

                foreignCode: row.ma_ngoai_ngu || null,

                physics: Number(row.vat_li) || null,

                chemistry: Number(row.hoa_hoc) || null,

                biology: Number(row.sinh_hoc) || null,

                history: Number(row.lich_su) || null,

                geography: Number(row.dia_li) || null,

                civic: Number(row.gdcd) || null

            });

            if (batch.length === BATCH_SIZE) {

                await Student.bulkCreate(batch);

                batch.length = 0;

            }

        }

        if (batch.length) {

            await Student.bulkCreate(batch);

        }

    }

}

export default new ImportService();