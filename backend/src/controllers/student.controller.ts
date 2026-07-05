import { Request, Response } from "express";
import { Op } from "../config/database";
import { Student, StudentIDParams } from "../models/Student";

export async function getStudentBySBD(
    req: Request<StudentIDParams>,
    res: Response
) {
    try {
        const { sbd } = req.params;

        // Tight validation: SBD must be a string containing exactly 8 digits
        if (!/^\d{8}$/.test(sbd)) {
            res.status(400).json({
                error: 'Số báo danh không hợp lệ. Số báo danh phải gồm đúng 8 chữ số.'
            });
            return;
        }

        const student = await Student.findByPk(sbd);
        if (!student) {
            res.status(404).json({
                error: `Không tìm thấy thí sinh với Số báo danh ${sbd}.`
            });
            return;
        }

        res.json({
            data: student
        });
    } catch (error: any) {
            console.error('Error fetching student scores:', error);
            res.status(500).json({
            error: 'Lỗi hệ thống khi tìm kiếm thông tin thí sinh.'
        });
    }
}

export async function getTop10GroupA(
    req: Request,
    res: Response
) {
    try {
      const students = await Student.findAll({
        where: {
          toan: { [Op.ne]: null },
          vat_li: { [Op.ne]: null },
          hoa_hoc: { [Op.ne]: null }
        }
      });

      const top10 = students
        .map((s) => {
          const toan = s.dataValues.toan || 0;
          const vat_li = s.dataValues.vat_li || 0;
          const hoa_hoc = s.dataValues.hoa_hoc || 0;
          const total = Number((toan + vat_li + hoa_hoc).toFixed(2));
          return {
            sbd: s.dataValues.sbd,
            toan,
            vat_li,
            hoa_hoc,
            total
          };
        })
        .sort((a, b) => b.total - a.total)
        .slice(0, 10);

      res.json({
        data: top10
      });
    } catch (error) {
      console.error('Error fetching top 10 group A:', error);
      res.status(500).json({
        error: 'Lỗi hệ thống khi tải danh sách top 10 khối A.'
      });
    }
}