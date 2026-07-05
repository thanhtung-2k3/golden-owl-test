import fs from "fs";
import csv from "csv-parser";

export function createReader(path) {

    return fs
        .createReadStream(path)
        .pipe(csv());

}

