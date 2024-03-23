import React, {Fragment} from "react";
import styles from "./index.module.scss"
import {Avatar, Card, ConfigProvider, Tabs, TabsProps} from "antd";
import Meta from "antd/es/card/Meta";
import head from "../../assets/head.png"
import {HomeFilled} from "@ant-design/icons";
import Retrieval from "../../components/Retrieval";
import HandlePDF from "../../components/HandlePDF";

const Home: React.FC = () => {

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: <Fragment><HomeFilled/>主页</Fragment>,
            children: <Retrieval/>,
        },
        {
            key: '2',
            label: 'PDF高亮',
            children: <Fragment><HandlePDF/></Fragment>
        },
        {
            key: '3',
            label: 'Tab 3',
            children: 'Tab 3',

        },
    ];

    return (
        <ConfigProvider
            theme={{
                components: {
                    Tabs: {
                        cardBg: '#f0f0f0',
                        itemSelectedColor: '#ffffff'
                    },
                },
            }}
        >
                <Card
                    className={styles.headCard}
                    hoverable={true}
                >
                    <Meta
                        avatar={
                            <Avatar src={head} shape="square" size={50}/>
                        }
                        title={
                            <p style={{
                                color: "white"
                            }}>专业词汇语料库</p>
                        }
                    />
                </Card>
                <Tabs
                    className={styles.tabs}
                    type="card"
                    defaultActiveKey="1"
                    items={items}
                />
        </ConfigProvider>
    );
};

export default Home;
