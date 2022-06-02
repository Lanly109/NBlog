import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import { Input, Layout, message, Button } from 'antd';
import 'vditor/dist/index.css';
import Vditor from 'vditor';
import axios from 'axios'
import { Row, Col } from 'antd';


const Articles: React.FC = () => {

    const [vd, setVd] = React.useState<Vditor>();
    const [category, setCategory] = React.useState("");
    const [tag, setTag] = React.useState([""]);
    const [title, setTitle] = React.useState("");
    const [loading, setLoading] = React.useState<boolean>(false);


    React.useEffect(() => {
        if (!vd){
            const vditor = new Vditor('vditor', {
                toolbar: [],
                width: '100%',
                minHeight: 600,
                preview: { maxWidth: 1000, theme: { current: 'light' } },
                after: () => {
                  setVd(vditor);
                },
            });
        };
    }, []);

    React.useEffect(() => {
        if (vd){
            vd.setValue('# 开始撰写你的文章吧!');
        }
    }, [vd]);

    const submit = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(title);
        axios.post(axios.defaults.baseURL + "articles", {
            title:title,
            abstract:"",
            date:"",
            content:vd.getValue(),
            tag:tag,
            category:category,
        }).then(res => {
            message.success(res.data.msg);
        });
        setLoading(false);
    }


  return (
    <PageContainer>
        <Row>
          <Col flex={1}>
            <Input placeholder="Title" onChange={e => setTitle(e.target.value)}/>
          </Col>
        </Row>
        <Row>
          <Col flex={2}>
            <Input placeholder="Category" onChange={e => setCategory(e.target.value)}/>
          </Col>
        </Row>
        <Row>
          <Col flex={1}>
            <Card>
                <div id="vditor" className="vditor" />
            </Card>
          </Col>
        </Row>
        <Row>
            <Button type="primary" loading={loading} onClick={submit} >
            发表
            </Button>
        </Row>
    </PageContainer>
  );
};

export default Articles;
