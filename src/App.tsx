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
import LayoutPage from 'pages/LayoutPage';
import CategoryPage from 'pages/category/CategoryPage';

const queryClient = new QueryClient()
const App: React.FC = () => {

  const buildElement = (element : JSX.Element, isLoginPage = false) =>{
    if(isLoginPage){
      return element
    }else{
      return (
        <RequireAuth>
          <LayoutPage>{element}</LayoutPage>
        </RequireAuth>
      )
    }
  }


  return (
    <ConfigProvider theme={theme} locale={ptBr}>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route>
            <Route path="/" element={buildElement(<HomePage />)} />
            <Route path="/login" element={buildElement(<LoginPage/>, true)} />
            <Route
              path="/home"
              element={buildElement(<HomePage />)}
            />
            <Route
              path="/category"
              element={buildElement(<CategoryPage />)}
            />
          </Route>
        </Routes>
      </QueryClientProvider>
    </ConfigProvider>
  );
};

function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
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
