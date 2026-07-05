import express from 'express';
import cors from 'cors';
//import { createServer as createViteServer } from 'vite';
import { initializeDatabase, Student, Op } from './src/config/database';
import { SubjectManager } from './src/models/Subject.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Use JSON middleware
  app.use(express.json());
  app.use(cors());

  // Initialize DB & Seeders
  try {
    await initializeDatabase();
  } catch (err) {
    console.error('Failed to initialize database on server startup:', err);
  }

  // --- API ROUTE: Get Student Scores by Registration Number (SBD) ---
  app.get('/api/students/:sbd', async (req, res) => {
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
  });

  // --- API ROUTE: Add or Update Student Score (With strict form validation) ---
  // app.post('/api/students', async (req, res) => {
  //   try {
  //     const {
  //       sbd,
  //       toan,
  //       ngu_van,
  //       ngoai_ngu,
  //       vat_li,
  //       hoa_hoc,
  //       sinh_hoc,
  //       lich_su,
  //       dia_li,
  //       gdcd,
  //       ma_ngoai_ngu
  //     } = req.body;

  //     // 1. Validation for SBD
  //     if (!sbd || !/^\d{8}$/.test(sbd)) {
  //       res.status(400).json({
  //         success: false,
  //         error: 'Số báo danh phải bao gồm đúng 8 chữ số.'
  //       });
  //       return;
  //     }

  //     // 2. Validation for scores (Must be null or floating numbers between 0.0 and 10.0)
  //     const subjectsToCheck = {
  //       toan, ngu_van, ngoai_ngu, vat_li, hoa_hoc, sinh_hoc, lich_su, dia_li, gdcd
  //     };

  //     const invalidFields: string[] = [];
  //     const parsedScores: any = { sbd, ma_ngoai_ngu: ma_ngoai_ngu || null };

  //     Object.entries(subjectsToCheck).forEach(([key, val]) => {
  //       if (val === undefined || val === null || val === '') {
  //         parsedScores[key] = null;
  //       } else {
  //         const num = parseFloat(val as string);
  //         if (isNaN(num) || num < 0 || num > 10) {
  //           invalidFields.push(key);
  //         } else {
  //           parsedScores[key] = num;
  //         }
  //       }
  //     });

  //     if (invalidFields.length > 0) {
  //       const subjectManager = SubjectManager.getInstance();
  //       const displayNames = invalidFields.map(code => subjectManager.getSubject(code)?.name || code);
  //       res.status(400).json({
  //         success: false,
  //         error: `Điểm môn ${displayNames.join(', ')} không hợp lệ. Điểm số phải nằm trong khoảng từ 0 đến 10.`
  //       });
  //       return;
  //     }

  //     // 3. Save or update using ORM
  //     const [student, created] = await Student.upsert(parsedScores);

  //     res.json({
  //       success: true,
  //       message: created ? 'Thêm mới thí sinh thành công!' : 'Cập nhật điểm thi thành công!',
  //       data: student
  //     });
  //   } catch (error: any) {
  //     console.error('Error saving student scores:', error);
  //     res.status(500).json({
  //       success: false,
  //       error: 'Lỗi hệ thống khi lưu thông tin điểm thi.'
  //     });
  //   }
  // });

  // --- API ROUTE: Report Statistics of 4 Levels (Using OOP Subject structures) ---
  app.get('/api/report', async (req, res) => {
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
  });

  // --- API ROUTE: Top 10 Group A Students ---
  app.get('/api/top10-group-a', async (req, res) => {
    try {
      // Find students who have all 3 compulsory Group A subjects (Toán, Lý, Hóa)
      const students = await Student.findAll({
        where: {
          toan: { [Op.ne]: null },
          vat_li: { [Op.ne]: null },
          hoa_hoc: { [Op.ne]: null }
        }
      });

      // Calculate total Group A score and sort descending
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
  });

  // --- API ROUTE: Reset & Re-seed Database ---
  app.post('/api/db/re-seed', async (req, res) => {
    try {
      console.log('Force resetting and re-seeding database...');
      // Drop and sync
      await Student.sequelize!.sync({ force: true });
      await initializeDatabase();
      res.json({
        message: 'Khôi phục và nạp dữ liệu thi gốc thành công!'
      });
    } catch (error) {
      console.error('Error resetting database:', error);
      res.status(500).json({
        error: 'Lỗi hệ thống khi khôi phục cơ sở dữ liệu.'
      });
    }
  });

//   // --- VITE MIDDLEWARE SETUP ---
//   if (process.env.NODE_ENV !== 'production') {
//     const vite = await createViteServer({
//       server: { middlewareMode: true },
//       appType: 'spa',
//     });
//     app.use(vite.middlewares);
//   } else {
//     const distPath = path.join(process.cwd(), 'dist');
//     app.use(express.static(distPath));
//     app.get('*', (req, res) => {
//       res.sendFile(path.join(distPath, 'index.html'));
//     });
//   }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Running on http://localhost:${PORT}`);
  });
}

startServer();
