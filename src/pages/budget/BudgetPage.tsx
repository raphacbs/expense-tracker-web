import { Button, Flex, Input, notification, Pagination, Table, DatePicker, Radio, Select, Space, FloatButton, TimeRangePickerProps  } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { fetchBudget, getBudgetIsLoading, getBudgetParams, setBudgetParams } from "features/budget/budgetSlice";
import { useAppDispatch, useAppSelector } from "hooks";
import { useDrawer } from "hooks/DrawerContext";
import { use } from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BudgetParam, NotificationType } from "types";
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;
const formatsDate = {en: 'MM-DD-YYYY', pt: 'DD-MM-YYYY'};

const BudgetPage: React.FC = () => {
    const param = useAppSelector(getBudgetParams);
    const loading = useAppSelector(getBudgetIsLoading);
    const [isSearcheable, setIsSearcheable] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string>("month");
    const { Search } = Input;
    const [api, contextHolder] = notification.useNotification();
    const { t, i18n } = useTranslation();
    const dispatch = useAppDispatch();
    const { openDrawer } = useDrawer();

    const rangePresets: TimeRangePickerProps['presets'] = [
        { label: t('budgetPage.last7Days'), value: [dayjs().add(-7, 'd'), dayjs()] },
        { label: t('budgetPage.last14Days'), value: [dayjs().add(-14, 'd'), dayjs()] },
        { label: t('budgetPage.last30Days'), value: [dayjs().add(-30, 'd'), dayjs()] },
        { label: t('budgetPage.last60Days'), value: [dayjs().add(-60, 'd'), dayjs()] },
        { label: t('budgetPage.last90Days'), value: [dayjs().add(-90, 'd'), dayjs()] },
      ];

    const openNotificationWithIcon = (type: NotificationType, message: string, description: string, duration: number) => {
        api[type]({
            message,
            description,
            duration
        });
    };

    const handleOpenDrawerRegister = () => {
        //openDrawer(); // Assuming this function opens a drawer.
    };

    const onChangePeriod = (date: any, dateString: [string, string]) => {
        const currentLanguage = i18n.language;
        let formattedStartDate = '';
        let formattedEndDate = '';
        if(currentLanguage === 'pt-BR') {
            formattedStartDate = dayjs(dateString[0],formatsDate.pt).format('YYYY-MM-DD');
            formattedEndDate = dayjs(dateString[1], formatsDate.pt).format('YYYY-MM-DD');
        }else{
            formattedStartDate = dayjs(dateString[0],formatsDate.en).format('YYYY-MM-DD');
            formattedEndDate = dayjs(dateString[1], formatsDate.en).format('YYYY-MM-DD');
        }
        dispatch(setBudgetParams({ ...param, startDate: formattedStartDate, endDate: formattedEndDate }));
    };

    const handleSearch = () => {
        dispatch(fetchBudget(param));
    };

    const handleOptionChange = (e: any) => {
        setSelectedOption(e.target.value);
        setIsSearcheable(false)
        dispatch(setBudgetParams({ ...param, startDate: null, endDate: null }));
        // if (e.target.value === "month") {
        //     setIsSearcheable(false)
        //     dispatch(setBudgetParams({ ...param, startDate: null, endDate: null }));
        // }
    };

    const handleMonthChange = (value: string) => {
        const [startDate, endDate] = getMonthStartEnd(value);
        dispatch(setBudgetParams({ ...param, startDate, endDate }));
    };

    const getMonthStartEnd = (month: string) => {
        const year = new Date().getFullYear();
        const startDate = `${year}-${month}-01`;
        const endDate = new Date(year, parseInt(month), 0).toISOString().split('T')[0];
        return [startDate, endDate];
    };

    useEffect(() => {
        if (param.startDate && param.endDate) {
            setIsSearcheable(true);
        } else {
            setIsSearcheable(false);
        }
    }, [param, selectedOption]);

    return (
        <Flex vertical gap={20}>
            {contextHolder}
            <Flex gap={50} justify='space-between'>
            <FloatButton
                icon={<PlusOutlined />}
                shape="circle"
                style={{ right: 50, bottom: 80 }}
                type="primary"
                onClick={handleOpenDrawerRegister}
            />
                {/* <Button
                    onClick={handleOpenDrawerRegister}
                    type="primary"
                    style={{ marginBottom: 16 }}>
                    {t("budgetPage.addButton")}
                </Button> */}
                <Flex gap={10}>
                    <Radio.Group disabled={loading} onChange={handleOptionChange} value={selectedOption}>
                        <Space  direction="vertical">
                            <Radio disabled={loading}  value="month">{t("budgetPage.month")}</Radio>
                            <Radio disabled={loading}  value="custom">{t("budgetPage.custom")}</Radio>
                        </Space>
                    </Radio.Group>
                    {selectedOption === "month" ? (
                        <Select
                            style={{ width: 280 }}
                            onChange={handleMonthChange}
                            size="large"
                            placeholder={t("budgetPage.selectMonth")}
                            disabled={loading} 
                        >
                            {Array.from({ length: 12 }, (_, i) => (
                                <Option key={i + 1} label={t(`budgetPage.month${i + 1}`)} value={(i + 1).toString().padStart(2, "0")}>
                                    {t(`budgetPage.month${i + 1}`)}
                                </Option>
                            ))}
                        </Select>
                    ) : (
                        <RangePicker
                            disabled={loading}
                            presets={rangePresets} 
                            size="small"
                            onChange={onChangePeriod}
                            format={{
                                format: i18n.language === 'pt-BR' ? formatsDate.pt : formatsDate.en,
                                type: 'mask',
                              }}
                        />
                    )}
                    <Button loading={loading} size="large" disabled={!isSearcheable} type="primary" onClick={handleSearch}>
                        {t("budgetPage.search")}
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default BudgetPage;
