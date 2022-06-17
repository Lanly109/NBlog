import React, { SyntheticEvent } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import { Input, Layout, message, Button } from 'antd';
import { history, useParams } from 'umi';
import 'vditor/dist/index.css';
import Vditor from 'vditor';
import axios from 'axios';
import { Row, Col } from 'antd';
import ArticleForm from './components/PublishForm';
import Header from './type/Header'
import moment from 'moment'

type Params = {
    id?: string;
}
const Edit: React.FC = () => {
    const [vd, setVd] = React.useState<Vditor>();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [header, setHeader] = React.useState<Header>({});
    const params: Params = useParams();
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
            axios
                .get('articles/' + params.id, {
                })
                .then((res) => {
                    console.log(res.data);
                    vd.setValue(res.data.data.content);
                    setHeader(res.data.data);
                });
        }
    }, [vd]);

    const submit = (e: SyntheticEvent<HTMLElement>) => {
        console.log("summit")
        console.log(header)
        if (header.title === undefined || header.title === '' || header.category === undefined || header.category === '' || header.tag === undefined || header.tag.length === 0 || header.tag === ['']) {
            message.error('请填写题目,类别和标签');
            return;
        }
        e.preventDefault();
        setLoading(true);
        console.log(header?.tag)
        const hide = message.loading('更新中', 0);
        axios
            .put('articles/' + params.id, {
                title: header?.title,
                abstract: '',
                date: header?.date,
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
                message.error("更新失败了qwq\n" + e.response.data.msg);
                setLoading(false);
            });
    };

    const delArticle = (e: SyntheticEvent<HTMLElement>) => {
        e.preventDefault();
        setLoading(true);
        const hide = message.loading('删除中', 0);
        axios
            .delete('articles/' + params.id, {
            })
            .then((res) => {
                setTimeout(hide, 0);
                message.success(res.data.msg);
                history.push('/articles');
            }).catch((e) => {
                setTimeout(hide, 0);
                message.error("删除失败了qwq\n" + e.response.data.msg);
                setLoading(false);
            });
    };

    const getChildHeader = (header: Header) => {
        setHeader(header);
    };

    return (
        <PageContainer>
            <Card>
                <Row wrap={false} gutter={[-5, 0]}>
                    <Col flex={6} span={22}>
                        <ArticleForm getHeader={getChildHeader} header={header}></ArticleForm>
                    </Col>
                    <Row wrap={true} gutter={[-5, 0]}>
                        <Col span={12}>
                            <Button type="primary" loading={loading} onClick={submit}>
                                更新
                            </Button>
                        </Col>
                        <Col md={1} sm={24}></Col>
                        <Col span={12}>
                            <Button type="primary" danger loading={loading} onClick={delArticle}>
                                删除
                            </Button>
                        </Col>
                    </Row>
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

export default Edit;
