'use client'

import { ThemeProvider } from '../../contexts/ThemeContext';
import { LanguageProvider } from '../../contexts/LanguageContext';
import AdminDashboard from '../../components/admin/AdminDashboard';

export default function Admin() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AdminDashboard />
      </LanguageProvider>
    </ThemeProvider>
  )
}