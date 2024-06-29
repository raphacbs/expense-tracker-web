import React, { useEffect } from 'react';
import { Table, Button, Pagination, PaginationProps, Flex, Input, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'hooks';
import { getCategories, getCategoryParams, setParams, isLoading, setCategories, setLoading, setSelectedCategory } from 'features/category/categorySlice';
import type { SearchProps } from 'antd/es/input/Search';
import { useDrawer } from 'hooks/DrawerContext';
import { useFetchCategories } from 'features/category/categoryAPI';
import { Category, emptyCategory, NotificationType, QUERY_CATEGORIES } from 'types';
import CategoryForm from 'components/category/CategoryForm';
import { setIsOpenDrawer } from 'features/global/globalSlice';
import { useQueryClient } from '@tanstack/react-query';
import { EditOutlined } from '@ant-design/icons';


const CategoryPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(getCategories);
    const params = useAppSelector(getCategoryParams)
    const loadind = useAppSelector(isLoading)
    const [api, contextHolder] = notification.useNotification();
    const { t } = useTranslation();
    const { Search } = Input;
    const { openDrawer } = useDrawer();   
    const queryClient = useQueryClient();

    const openNotificationWithIcon = (type: NotificationType, message: string, description: string, duration: number) => {
        api[type]({
          message,
          description,
          duration
        });
      };

    const onChangePage: PaginationProps['onChange'] = (page, pageSize) => {
        dispatch(setParams({ ...params, pageSize: pageSize, pageNo: page }))
        
    };

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        dispatch(setParams({ ...params, name: value }));
    }
    const columns = [
        {
            title: t("categoryPage.nameColumn"),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: t("categoryPage.descriptionColumn"),
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: t("categoryPage.colorColumn"),
            dataIndex: 'color',
            key: 'color',
            render: (color: string) => <div style={{ width: 30, height: 30, backgroundColor: color }}></div>,
        },
        {
            title: t("categoryPage.typeColumn"),
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: t("categoryPage.actionColumn"),
            key: 'action',
            render: (text: any, record: any) => (
                <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
            ),
        },
    ];

    const handleEdit = (category: Category) => {
        dispatch(setSelectedCategory(category))
        handleOpenDrawer(t("categoryForm.editTitle"));
    };
    
    
    const handleOpenDrawerRegister = () => {
        dispatch(setSelectedCategory(emptyCategory))
        handleOpenDrawer(
            t("categoryForm.addtTitle")
        );
    };

    const handleSaveCategory = ()=>{
        dispatch(setIsOpenDrawer(false))
        openNotificationWithIcon("success",t('categoryPage.validationMessage.saved'), t('categoryPage.validationMessage.operationSuccess'),3)
    }

    const handleOpenDrawer = (title: string) => {
        openDrawer(
            title,
            <CategoryForm 
                onSucessPost={handleSaveCategory} 
                onSucessPut={handleSaveCategory}/>
        );
    };

    const { data, error, isError, isFetched, isSuccess, isLoading: isLoadingC } = useFetchCategories(params);
    dispatch(setLoading(isLoadingC))

    if (isSuccess) {
        dispatch(setCategories(data));

    }
    if(isError){
        openNotificationWithIcon('error',t('categoryPage.validationMessage.operationError'), error.message,0)
    }

    useEffect(()=>{
        queryClient.invalidateQueries({ queryKey: [QUERY_CATEGORIES]})
    }, [params])

    return (
        <Flex vertical gap={20}>
            {contextHolder}
            <Flex gap={50} justify='space-between'>
                <Button
                    onClick={handleOpenDrawerRegister}
                    disabled={loadind}
                    type="primary"
                    style={{ marginBottom: 16 }}>
                    {t("categoryPage.addButton")}
                </Button>
                <Search
                    placeholder={t('categoryPage.placeholderSearchField')}
                    allowClear
                    enterButton={t('categoryPage.searchButton')}
                    size="middle"
                    onSearch={onSearch}
                    disabled={loadind}
                />
            </Flex>
            <Table pagination={false} loading={loadind} dataSource={categories} columns={columns} rowKey="id" />
            <Flex align='flex-end'>
                <Pagination
                    showQuickJumper
                    defaultCurrent={1}
                    total={params.totalElements}
                    pageSizeOptions={[5, 10, 50, 100]}
                    showSizeChanger
                    disabled={loadind}
                    onChange={onChangePage} />
            </Flex>
        </Flex>
    );
};

export default CategoryPage;
