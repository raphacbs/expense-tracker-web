import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const CategoryPage: React.FC = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const {t} = useTranslation();

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Descrição',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Cor',
            dataIndex: 'color',
            key: 'color',
            render: (color: string) => <div style={{ width: 30, height: 30, backgroundColor: color }}></div>,
        },
        {
            title: 'Tipo',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Ações',
            key: 'action',
            render: (text: any, record: any) => (
                <Button type="link" onClick={() => handleEdit(record)}>Editar</Button>
            ),
        },
    ];

    const handleEdit = (category: any) => {
        // Implemente a lógica para editar a categoria
        console.log('Editar categoria:', category);
    };

    return (
        <div>
            <Button type="primary" style={{ marginBottom: 16 }}>{t("categoryPage.addButton")}</Button>
            <Table dataSource={categories} columns={columns} rowKey="id" />
        </div>
    );
};

export default CategoryPage;
