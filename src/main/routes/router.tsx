import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { AuthRoute } from './auth-route';
import { AuthLayout } from '@/application/domain/auth/pages/layout';
import { SignInPage } from '@/application/domain/auth/pages/sign-in';

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
        <Route>
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
