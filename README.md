### **Hướng Dẫn Khởi Chạy Project**


**Môi trường:** NodeJS v20, PostgreSQL

---


### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Windows: copy .env.example .env
# Cần thiết lập DATABASE_URL trong .env, có thể thay đổi PORT (mặc định port 3000)
npm build
npm start
# npm run dev
# để chạy development
```

### Frontend Setup
```bash
cd frontend
cp .env.example .env
# Windows: copy .env.example .env
# Cần thiết lập VITE_BACKEND_ENDPOINT (API backend) trong .env
npm install
npm run dev

