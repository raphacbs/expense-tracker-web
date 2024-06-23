import React from 'react';
import { useTranslation } from 'react-i18next';

const HomePage: React.FC = () => {
  const {t} = useTranslation();
  return (
    
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>{t("homePage.content")}</h1>
    </div>
  );
};

export default HomePage;
