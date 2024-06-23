import React from 'react';
import { Select } from 'antd';
import Flag from 'react-world-flags';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <div style={{ position: 'fixed', top: 10, left: 10, zIndex: 1000 }}>
      <Select
        defaultValue={i18n.language}
        style={{ width: 150 }}
        onChange={handleChange}
      >
        <Option value="en-US">
          <Flag code="USA" height="16" style={{ marginRight: 8 }} />
          English
        </Option>
        <Option value="pt-BR">
          <Flag code="BR" height="16" style={{ marginRight: 8 }} />
          Português
        </Option>
      </Select>
    </div>
  );
};

export default LanguageSelector;
