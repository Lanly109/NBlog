import React, { SyntheticEvent } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import { Input, Layout, message, Button } from 'antd';
import 'vditor/dist/index.css';
import Vditor from 'vditor';
import axios from 'axios';
import { Row, Col } from 'antd';
import ArticleList from './components/ArticlesList';

type Header = {
  title?: string;
  category?: string;
  tag?: string[];
};

const Articles: React.FC = () => {
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
    e.preventDefault();
    setLoading(true);
    // console.log(vd?.getValue());
    // console.log(header);
    axios
      .post('articles', {
        title: header?.title,
        abstract: '',
        date: '',
        content: vd?.getValue(),
        tag: header?.tag,
        category: header?.category,
      })
      .then((res) => {
        message.success(res.data.msg);
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
            <ArticleList></ArticleList>
        </Col>
        {/* <Col span={2}>
            <Button type="primary" loading={loading} onClick={submit}>
              发表
            </Button>
        </Col> */}
      </Row>
        </Card>
    </PageContainer>
  );
};

export default Articles;
