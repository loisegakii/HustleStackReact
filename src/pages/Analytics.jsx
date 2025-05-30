// src/pages/Analytics.jsx
import React, { useRef } from 'react';
import { useTransactions } from '../context/TransactionContext';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Navbar from '../components/Navbar';

const Analytics = () => {
  const { transactions } = useTransactions();
  const reportRef = useRef();

  const handleDownloadPDF = async () => {
    const canvas = await html2canvas(reportRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10, 190, 100);
    pdf.save('analytics-report.pdf');
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', background: '#f4f6f8', minHeight: '100vh' }}>
      <Navbar />

      <div style={{ padding: '40px', maxWidth: '1000px', margin: 'auto' }}>
        <h1 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '30px' }}>📊 Analytics Overview</h1>

        <div
          ref={reportRef}
          style={{
            background: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={transactions}>
              <CartesianGrid stroke="#e0e0e0" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#4e73df" strokeWidth={2} />
            </LineChart>
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
