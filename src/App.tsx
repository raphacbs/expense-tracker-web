import HomePage from './pages/home/HomePage';
import { isAuthenticated } from './actions/auth';
import LoginPage from './pages/login/LoginPage';
import React from 'react';
import { ConfigProvider } from "antd"
import ptBr from 'antd/locale/pt_BR';
import {
  Routes,
  Route,
  useLocation,
  Navigate
} from 'react-router-dom';
import theme from './utils/theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './i18n';
import LanguageSelector from 'components/LanguageSelectorComponent';

const queryClient = new QueryClient()
const App: React.FC = () => {

  return (
    <ConfigProvider theme={theme} locale={ptBr}>
      <QueryClientProvider client={queryClient}>
        <LanguageSelector /> {/* Adicionar o componente de seleção de idioma */}
        <Routes>
          <Route>
            <Route path="/" element={<RequireAuth><HomePage /></RequireAuth>} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/home"
              element={
                <RequireAuth>
                  <HomePage />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </QueryClientProvider>
    </ConfigProvider>
  );
};

function RequireAuth({ children }: { children: JSX.Element }) {
  let location = useLocation();
  if (!isAuthenticated()) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}






export default App;
