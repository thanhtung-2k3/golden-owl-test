import { Request, Response } from "express";

import { Student } from "../config/database";
import { SubjectManager } from "../models/Subject";

export async function getReport(
    req: Request,
    res: Response
) {
    try {
      const subjectManager = SubjectManager.getInstance();
      const subjects = subjectManager.getAllSubjects();
      const students = await Student.findAll();

      // Dynamically calculate levels using OOP Subject classes
      const reports = subjects.map((sub) => {
        const counts = {
          level1: 0, // >= 8.0
          level2: 0, // 6.0 <= score < 8.0
          level3: 0, // 4.0 <= score < 6.0
          level4: 0, // < 4.0
          total: 0
        };

        students.forEach((student) => {
          const val = student.getDataValue(sub.code) as number | null;
          if (val !== null && val !== undefined) {
            const level = sub.classifyScore(val);
            if (level === 'Level 1') counts.level1++;
            else if (level === 'Level 2') counts.level2++;
            else if (level === 'Level 3') counts.level3++;
            else if (level === 'Level 4') counts.level4++;
            counts.total++;
          }
        });

        return {
          code: sub.code,
          name: sub.name,
          stats: counts
        };
      });

      res.json({
        data: reports,
        totalStudents: students.length
      });
    } catch (error) {
      console.error('Error generating reports:', error);
      res.status(500).json({
        success: false,
        error: 'Lỗi hệ thống khi tải báo cáo thống kê.'
      });
    }
}