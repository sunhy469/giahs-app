import React, {useState} from "react";
import {Card, ConfigProvider, Popover, Select, Table, TableProps, Input, Checkbox, Space, CheckboxProps} from "antd";
import {SearchProps} from "antd/es/input";
import {handleSearch} from "../../api/instance.ts";
import {ReceiveData} from "../../interface/data.ts";
import styles from "./index.module.scss"
import {CheckboxValueType} from "antd/es/checkbox/Group";

const CheckboxGroup = Checkbox.Group;
const {Search} = Input;
const Retrieval: React.FC = () => {

    const [data, setData] = useState<ReceiveData[]>([])
    const [type, setType] = useState("与所有词匹配")
    const plainOptions = ['国际机构', '茶业','茶树栽培', '茶叶加工','农药登记','农药名称', '农药剂型', '农药构成','GIAHS官网词汇', '气候术语'];
    const defaultCheckedList = ['国际机构', '茶业','茶树栽培', '茶叶加工','农药登记','农药名称', '农药剂型', '农药构成','GIAHS官网词汇', '气候术语'];
    const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultCheckedList);
    const checkAll = plainOptions.length === checkedList?.length;
    const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;


    const columns: TableProps<ReceiveData>['columns'] = [
        {
            title: '术语',
            dataIndex: 'english',
            key: 'english',
        },
        {
            title: '释义',
            dataIndex: 'chinese',
            key: 'chinese',
            className: styles.column
        },
        {
            title: '主题',
            dataIndex: 'topic',
            key: 'topic',
            className: styles.column
        },
        {
            title: '分类',
            dataIndex: 'classify',
            key: 'classify',
        },
        {
            title: '缩略语',
            dataIndex: 'abbreviation',
            key: 'abbreviation',
        }
    ];

    const onSearch: SearchProps['onSearch'] = (value: any) => {
        console.log(checkedList)
        handleSearch({
            type,
            item: value,
            checkedList
        }).then((res) => {
            setData(res.data)
        })
    }

    const handleChangeSelect = (value: string) => {
        setType(value)
    };

    const selectBefore = (
        <ConfigProvider
            theme={{
                components: {
                    Popover: {
                        zIndexPopup: 9999
                    },
                },
            }}
        >
            <Select
                size="large"
                defaultValue="与所有词匹配"
                onChange={handleChangeSelect}
                options={[
                    {
                        value: "与所有词匹配",
                        label:
                            <Popover content="查找搜索框中所填所有词" title="与所有词匹配">
                                与所有词匹配
                            </Popover>
                    },
                    {
                        value: "完全匹配",
                        label:
                            <Popover content="仅查找所输入的字或词" title="完全匹配">
                                完全匹配&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </Popover>
                    },
                ]}
            >
            </Select>
        </ConfigProvider>
    );

    const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
        setCheckedList(e.target.checked ? plainOptions : []);
    };

    const onChange = (list: CheckboxValueType[]) => {
        setCheckedList(list);
    };

    return (
        <div>

            <Space>
                <Space direction="vertical">
                    <div>
                        <Card style={{
                            backgroundColor: '#91caff',
                            width: 756,
                            textAlign: 'justify'
                        }}>
                            <p>
                                创建词汇门户网站的目的是储存、 管理和维护各类与粮农组织活
                                动领域相关的概念、术语和定义。本网站旨在提供可以搜索一种或
                                多语种术语库的独特站点，作为促进信息共享和交流的机制。
                            </p>
                        </Card>

                        <Card style={{
                            backgroundColor: '#91caff',
                            width: 756,
                            marginTop: '20px'
                        }}>
                            <p>关于有效搜索的提示：</p>
                            <ol style={{listStyleType: 'decimal', paddingLeft: '20px'}}>
                                <li>删除词尾变形、撇号、介词、冠词、连字符、斜杠、逗号和其他标点符号。</li>
                                <li>分别尝试英式和美式拼法（例如既搜索“organization”，又搜索“organisation”) 。</li>
                                <li>使用单数形式（例如，搜索“chickpea”而不是“chickpeas”），或使用不带词尾的形式
                                    （例如，搜索“propert”而不是“property”或“properties”)。
                                </li>
                                <li>如不确定，请将单词分开（例如，搜索“water mark”，而不是“watermark”或“water-mark”)</li>
                            </ol>
                        </Card>

                        <Search
                            style={{
                                width: 756,
                                marginTop: '20px'
                            }}
                            onSearch={onSearch}
                            size="large"
                            placeholder="搜索"
                            enterButton
                            allowClear
                            addonBefore={selectBefore}
                        />


                        <ConfigProvider
                            theme={{
                                components: {
                                    Card: {
                                        headerBg: '#1677ff'
                                    },
                                },
                            }}
                        >
                            <Card
                                style={{
                                    width: 756,
                                    marginTop: '20px'
                                }}
                                title={<p style={{color: '#ffffff'}}>搜索结果</p>}
                            >

                                <Table
                                    columns={columns}
                                    dataSource={data}
                                    pagination={{
                                        defaultPageSize: 5,
                                        pageSizeOptions: [5, 10, 15, 20]
                                    }}

                                />
                            </Card>
                        </ConfigProvider>
                    </div>
                </Space>

                <ConfigProvider
                    theme={{
                        components: {
                            Card: {
                                headerBg: '#1677ff'
                            },
                        },
                    }}
                >

                    <Card title={<p style={{color: '#ffffff'}}>术语集</p>}
                          style={{
                              position: 'absolute',
                              top: '0px',
                              marginLeft: '40px',
                              width: '240px'
                          }}
                          extra={
                              <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                              </Checkbox>
                          }
                    >
                        <ConfigProvider
                            theme={{
                                token: {
                                    fontSize : 20,
                                    lineHeight : 1.5
                                },
                            }}
                        >
                            <CheckboxGroup
                                options={plainOptions}
                                value={checkedList}
                                onChange={onChange}
                            />
                        </ConfigProvider>

                    </Card>
                </ConfigProvider>
            </Space>
        </div>
    )
}

export default Retrieval
