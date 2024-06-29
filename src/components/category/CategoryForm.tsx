import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Col, Row, ColorPicker, ColorPickerProps, GetProp, Flex } from 'antd'; // Ant Design Color Picker
import { useAppSelector } from 'hooks'; // Exemplo de hook para dispatch, substitua pelo seu contexto
import { Category, CategoryResponseBody, QUERY_CATEGORIES } from 'types';
import { isLoading, selectedCategory } from 'features/category/categorySlice';
import { usePostCategories, usePutCategories } from 'features/category/categoryAPI';
import { AxiosError } from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

interface CategoryFormProps {
    onSubmit?: (values: Category) => void;
    onErrorPost?: (error: AxiosError, variables: any, context: any) => void;
    onSucessPost?: (data: CategoryResponseBody) => void;
    onErrorPut?: (error: AxiosError, variables: any, context: any) => void;
    onSucessPut?: (data: CategoryResponseBody) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onSubmit, onSucessPost, onErrorPost, onSucessPut, onErrorPut }) => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();
    const category = useAppSelector(selectedCategory)
    const loading = useAppSelector(isLoading);
    type Color = GetProp<ColorPickerProps, 'value'>;
    type Format = GetProp<ColorPickerProps, 'format'>;
    const [colorHex, setColorHex] = useState<Color>(category.color);
    const [formatHex, setFormatHex] = useState<Format | undefined>('hex');
    const hexString = React.useMemo<string>(
        () => (typeof colorHex === 'string' ? colorHex : colorHex?.toHexString()),
        [colorHex],
    );
    const [form] = Form.useForm();

    const invalidateQueryCategory = ()=>{
        queryClient.invalidateQueries({ queryKey: [QUERY_CATEGORIES]})
    }

    const handleSuccessPut = (data: CategoryResponseBody) => {
        invalidateQueryCategory();
        onSucessPut && onSucessPut(data);
    }

    const handleSuccessPost = (data: CategoryResponseBody) => {
        invalidateQueryCategory();
        onSucessPost && onSucessPost(data);
    }

    const handleErrorPost = (error: AxiosError, variables: any, context: any)=>{
      
        onErrorPost && onErrorPost(error, variables, context)
    }
    const handleErrorPut = (error: AxiosError, variables: any, context: any)=>{
       
        onErrorPut && onErrorPut(error, variables, context)
    }

    useEffect(()=>{
        form.setFieldsValue(category)
    },[category])

    const { mutate: post } = usePostCategories(handleSuccessPost, handleErrorPost);
    const { mutate: put } = usePutCategories(handleSuccessPut, handleErrorPut);

    const onFinish = async (values: any) => {
        const { id } = category;
        const _category: Category = { ...values, color: hexString, id };
        if (id) {
            await put(_category)
        } else {
            await post(_category)
        }
        onSubmit && onSubmit(category);
    };
    return (
        <Form form={form}  layout="vertical" onFinish={onFinish} disabled={loading} initialValues={category}>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="name"
                        label={t('categoryForm.nameField')}
                        rules={[{ required: true, message: t('categoryForm.validationMessage.nameFieldError') }]}
                    >
                        <Input placeholder={t('categoryForm.nameFieldPlaceholder')} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="description"
                        label={t('categoryForm.descriptionField')}
                        rules={[{ required: true, message: t('categoryForm.validationMessage.descriptionFieldError') }]}
                    >
                        <Input.TextArea rows={2} placeholder={t('categoryForm.descriptionFieldPlaceholder')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="color"
                        label={t('categoryForm.colorField')}
                        rules={[{ required: true, message: t('categoryForm.validationMessage.colorFieldError') }]}
                    >
                        <ColorPicker
                            showText
                            placement="topLeft"
                            format={formatHex}
                            value={colorHex}
                            onChange={setColorHex}
                            onFormatChange={setFormatHex}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="type"
                        label={t('categoryForm.typeField')}
                        rules={[{ required: true, message: t('categoryForm.validationMessage.typeFieldError') }]}
                    >
                        <Select placeholder={t('categoryForm.typeFieldPlaceholder')}>
                            <Option value="E">{t('categoryForm.expenseOption')}</Option>
                            <Option value="R">{t('categoryForm.revenueOption')}</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Flex justify='center'>
                    <Button disabled={loading} type="primary" htmlType="submit">
                        {t('categoryForm.submitButton')}
                    </Button>
                </Flex>

            </Form.Item>
        </Form>
    );
};

export default CategoryForm;
