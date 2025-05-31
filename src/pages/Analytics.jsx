import React, { useRef, useMemo } from 'react';
import { useTransactions } from '../context/TransactionContext';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Navbar from '../components/Navbar';
import dayjs from 'dayjs';

const COLORS = ['#4e73df', '#e74c3c']; // Income Blue, Expense Red

const Analytics = () => {
  const { transactions } = useTransactions();
  const reportRef = useRef();

  // 🟦 Pie chart data: Total Income vs Expense
  const pieData = useMemo(() => {
    const grouped = { income: 0, expense: 0 };
    transactions.forEach(t => {
      grouped[t.type] += Number(t.amount);
    });
    return [
      { name: 'Income', value: grouped.income },
      { name: 'Expense', value: grouped.expense }
    ];
  }, [transactions]);

  // 📅 Bar chart: Group income and expenses per month
  const barData = useMemo(() => {
    const grouped = {};

    transactions.forEach(({ date, amount, type }) => {
      const month = dayjs(date).format('MMM YYYY');
      if (!grouped[month]) {
        grouped[month] = { month, income: 0, expense: 0 };
      }
      if (type === 'income') {
        grouped[month].income += Number(amount);
      } else {
        grouped[month].expense += Number(amount);
      }
    });

    return Object.values(grouped).sort((a, b) => dayjs(a.month, 'MMM YYYY').unix() - dayjs(b.month, 'MMM YYYY').unix());
  }, [transactions]);

  // 📥 Export report as PDF
  const handleDownloadPDF = async () => {
    const canvas = await html2canvas(reportRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, 'PNG', 10, 10, width - 20, height);
    pdf.save('analytics-report.pdf');
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', background: '#f4f6f8', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ padding: '40px', maxWidth: '1100px', margin: 'auto' }}>
        <h1 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '30px' }}>📊 Analytics Dashboard</h1>

        <div
          ref={reportRef}
          style={{
            background: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          <h3 style={{ marginBottom: '20px', color: '#34495e' }}>📊 Monthly Income vs Expense</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#4e73df" radius={[6, 6, 0, 0]} />
              <Bar dataKey="expense" fill="#e74c3c" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <h3 style={{ margin: '40px 0 20px', color: '#34495e' }}>🧾 Income vs Expense Summary</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button
            onClick={handleDownloadPDF}
            style={{
              background: '#4e73df',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            📥 Download PDF Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
