import { Button, Flex, Input, notification, Pagination, Table, DatePicker, Radio, Select, Space, FloatButton, TimeRangePickerProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { fetchBudget, getBudgetIsLoading, getBudgetParams, getBudgets, setBudgetParams } from "features/budget/budgetSlice";
import { useAppDispatch, useAppSelector } from "hooks";
import { useDrawer } from "hooks/DrawerContext";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NotificationType } from "types";
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;
const { Option } = Select;
const formatsDate = { 'en-US': 'MM-DD-YYYY', 'pt-BR': 'DD-MM-YYYY' };

const BudgetPage: React.FC = () => {
    const param = useAppSelector(getBudgetParams);
    const loading = useAppSelector(getBudgetIsLoading);
    const budgets = useAppSelector(getBudgets);
    const [isSearcheable, setIsSearcheable] = useState<boolean>(false);

    const { Search } = Input;
    const [api, contextHolder] = notification.useNotification();
    const { t, i18n } = useTranslation();
    const dispatch = useAppDispatch();
    const { openDrawer } = useDrawer();
    const navigate = useNavigate();
    const location = useLocation();

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

    const getFormattedStardAndEndDate = (startDate: string, endStart: string) => {
        const currentLanguage = i18n.language;
        let formattedStartDate = '';
        let formattedEndDate = '';
        if (currentLanguage === 'pt-BR') {
            formattedStartDate = dayjs(startDate, formatsDate['pt-BR']).format('YYYY-MM-DD');
            formattedEndDate = dayjs(endStart, formatsDate['pt-BR']).format('YYYY-MM-DD');
        } else {
            formattedStartDate = dayjs(startDate, formatsDate['en-US']).format('YYYY-MM-DD');
            formattedEndDate = dayjs(endStart, formatsDate['en-US']).format('YYYY-MM-DD');
        }

        return { formattedStartDate, formattedEndDate };
    };

    const onChangePeriod = (date: any, dateString: [string, string]) => {
        const { formattedStartDate, formattedEndDate } = getFormattedStardAndEndDate(dateString[0], dateString[1]);
        dispatch(setBudgetParams({ ...param, startDate: formattedStartDate, endDate: formattedEndDate }));
    };

    const getPeriod = (): dayjs.Dayjs[] | null[] => {
        if (param.startDate && param.endDate) {
            const { formattedStartDate, formattedEndDate } = getFormattedStardAndEndDate(param.startDate, param.endDate);
            return [dayjs(formattedStartDate), dayjs(formattedEndDate)]
        } else {
            return [null, null]
        }

    }

    const handleSearch = () => {
        const queryParams = queryString.stringify(param);
        navigate(`?${queryParams}`);
        dispatch(fetchBudget(param));
    };

    const handleOptionChange = (e: any) => {

        setIsSearcheable(false)
        dispatch(setBudgetParams({ ...param, searchType: e.target.value }));
        // dispatch(setBudgetParams({ ...param, startDate: null, endDate: null }));
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

    const getSelectedMonth = (): string => {
        if (param.startDate) {
            const startDate = dayjs(param.startDate);
            return (startDate.month() + 1).toString().padStart(2, "0");
        }
        return "";
    };

    const convertValueToString = (value: number): string => {
        const { language } = i18n;
        const currency = language === 'pt-BR' ? 'BRL' : 'USD';
        const formatter = new Intl.NumberFormat(language, { style: 'currency', currency});
        return formatter.format(value);
    };

    useEffect(() => {
        if (param.startDate && param.endDate) {
            setIsSearcheable(true);
            //dispatch(fetchBudget(param));
        } else {
            setIsSearcheable(false);
        }
        const queryParams = queryString.stringify(param);
        navigate(`?${queryParams}`);
    }, [param]);



    useEffect(() => {
        const params = queryString.parse(location.search);
        if (params.startDate && params.endDate) {
            dispatch(setBudgetParams({
                ...param,
                startDate: params.startDate as string,
                endDate: params.endDate as string
            }));
            dispatch(fetchBudget({
                ...param,
                startDate: params.startDate as string,
                endDate: params.endDate as string
            }));
        }
    }, [location.search]);
//TODO - Implementar a função de abrir o drawer e cadastrar um novo orçamento
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
                    <Radio.Group disabled={loading} onChange={handleOptionChange} value={param.searchType}>
                        <Space direction="vertical">
                            <Radio disabled={loading} value="month">{t("budgetPage.month")}</Radio>
                            <Radio disabled={loading} value="custom">{t("budgetPage.custom")}</Radio>
                        </Space>
                    </Radio.Group>
                    {param.searchType === "month" ? (
                        <Select
                            style={{ width: 280 }}
                            onChange={handleMonthChange}
                            value={getSelectedMonth()}
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
                            value={[param.startDate ? dayjs(param.startDate) : null, param.endDate ? dayjs(param.endDate) : null]}
                            format={formatsDate[i18n.language as 'en-US' | 'pt-BR']}
                        />
                    )}
                    <Button loading={loading} size="large" disabled={!isSearcheable} type="primary" onClick={handleSearch}>
                        {t("budgetPage.search")}
                    </Button>
                </Flex>
            </Flex>

            <Table dataSource={budgets} loading={loading} rowKey="id">
                <Table.Column title={t("budgetPage.columnTable.name")} dataIndex="name" key="name" />
                <Table.Column title={t("budgetPage.columnTable.startDate")} dataIndex="startDate" key="startDate" render={(text: string) => dayjs(text).format(formatsDate[i18n.language as 'en-US' | 'pt-BR'])} />
                <Table.Column title={t("budgetPage.columnTable.endDate")} dataIndex="endDate" key="endDate" render={(text: string) => dayjs(text).format(formatsDate[i18n.language as 'en-US' | 'pt-BR'])} />
                <Table.Column title={t("budgetPage.columnTable.notes")} dataIndex="notes" key="notes" />
                <Table.Column title={t("budgetPage.columnTable.amount")} dataIndex="amount" key="amount" render={convertValueToString} />
                <Table.Column title={t("budgetPage.columnTable.totalSpent")} dataIndex="totalSpent" key="totalSpent" render={convertValueToString} />
                <Table.Column title={t("budgetPage.columnTable.balance")} dataIndex="balance" key="balance" render={convertValueToString} />
                <Table.Column title={t("budgetPage.columnTable.active")} dataIndex="active" key="active"  render={(active: boolean) => (
            <div
                style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    backgroundColor: active ? "green" : "red",
                }}
            />
        )} />
                <Table.Column title={t("budgetPage.columnTable.categoryName")} dataIndex="categoryName" key="categoryName" />
            </Table>
        </Flex>
    );
}

export default BudgetPage;
