import React, { SyntheticEvent } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import { Input, Layout, message, Button } from 'antd';
import 'vditor/dist/index.css';
import Vditor from 'vditor';
import axios from 'axios';
import { Row, Col } from 'antd';
import ArticleForm from './components/PublishForm';
import { history } from 'umi';
import dateFormat, { masks } from "dateformat";

type Header = {
    title?: string;
    category?: string;
    tag?: string[];
};

const Publish: React.FC = () => {
    const [vd, setVd] = React.useState<Vditor>();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [header, setHeader] = React.useState<Header>();

    React.useEffect(() => {
        if (!vd) {
            const vditor = new Vditor('vditor', {
                toolbar: [],
                width: '100%',
                minHeight: 600,
                preview: { maxWidth: 1000, theme: { current: 'light' } },
                after: () => {
                    setVd(vditor);
                },
            });
        }
    }, []);

    React.useEffect(() => {
        if (vd) {
            vd.setValue('# 开始撰写你的文章吧!');
        }
    }, [vd]);

    const submit = (e: SyntheticEvent<HTMLElement>) => {
        if (header === undefined || header.title === undefined || header.title === '' || header.category === undefined || header.category === '' || header.tag === undefined || header.tag.length === 0) {
            // console.log(header)
            message.error('请填写题目,类别和标签');
            return;
        }
        const hide = message.loading('发表中', 0);
        e.preventDefault();
        setLoading(true);
        // console.log(vd?.getValue());
        console.log(header);
        axios
            .post('articles', {
                title: header?.title,
                abstract: '',
                date: dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"),
                content: vd?.getValue(),
                tag: header?.tag,
                category: header?.category,
            })
            .then((res) => {
                setTimeout(hide, 0);
                message.success(res.data.msg);
                history.push('/articles');
            }).catch((e) => {
                setTimeout(hide, 0);
                message.error("发表失败了qwq\n" + e.response.data.msg);
                setLoading(false);
            });
        setLoading(false);
    };

    const getChildHeader = (header: Header) => {
        setHeader(header);
    };

    return (
        <PageContainer>
            <Card>
                <Row wrap={false} gutter={[-5, 0]}>
                    <Col flex={6} span={22}>
                        <ArticleForm getHeader={getChildHeader}></ArticleForm>
                    </Col>
                    <Col span={2}>
                        <Button type="primary" loading={loading} onClick={submit}>
                            发表
                        </Button>
                    </Col>
                </Row>
            </Card>
            <Row>
                <Col flex={1}>
                    <Card>
                        <div id="vditor" className="vditor" />
                    </Card>
                </Col>
            </Row>
        </PageContainer>
    );
};

export default Publish;
