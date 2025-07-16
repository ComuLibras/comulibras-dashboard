import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { AuthRoute } from './auth-route';
import { AuthLayout } from '@/application/domain/auth/pages/layout';
import { SignInPage } from '@/application/domain/auth/pages/sign-in';
import { DashboardLayout } from '@/application/domain/dashboard/layout';
import { AccountsPage } from '@/application/domain/dashboard/accounts/pages';
import { CategoriesPage } from '@/application/domain/dashboard/categories/pages';
import { SentencesPage } from '@/application/domain/dashboard/sentences/pages';

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/sign-in" />} />

        <Route element={<AuthRoute />}>
          <Route 
            path='/auth' 
            element={
              <AuthLayout 
                title="Bem vindo(a)!" 
                description="Acesse sua conta para gerenciar frases e categorias" 
              />}
            >
            <Route path="sign-in" element={<SignInPage />} />
            <Route path="sign-up" element={<h1>Sign up</h1>} />
          </Route>
        </Route>
        
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="sentences" element={<SentencesPage />} />
          <Route path="accounts" element={<AccountsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
