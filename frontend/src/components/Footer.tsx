import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-400 py-6 text-xs mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 font-mono">
          <span className="font-bold text-emerald-600">THPT 2024 NodeJS/React App</span>
          <span>|</span>
          <span>Thiết kế hướng đối tượng OOP</span>
        </div>

        <div className="font-medium text-slate-500">
          Học phần thi: Toán, Văn, Anh, Lý, Hóa, Sinh, Sử, Địa, GDCD
        </div>
      </div>
    </footer>
  );
}
