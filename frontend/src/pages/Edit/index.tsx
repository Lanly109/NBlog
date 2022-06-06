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
  const params:Params = useParams();
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
        .get('articles/'+params.id, {
        })
        .then((res) => {
          console.log(res.data);
          vd.setValue(res.data.data.content);
          setHeader(res.data.data);
        });
    }
  }, [vd]);

  const submit = (e: SyntheticEvent<HTMLElement>) => {
    if(header.title===undefined||header.title===''||header.category===undefined||header.category===''||header.tag===undefined||header.tag.length===0){
        console.log(header)
        message.error('请填写题目,类别和标签');
        return;
    }
    e.preventDefault();
    setLoading(true);
    axios
      .put('articles/'+params.id, {
        title: header?.title,
        abstract: '',
        date: moment().format('YYYY-MM-DD HH:mm:ss'),
        content: vd?.getValue(),
        tag: header?.tag,
        category: header?.category,
      })
      .then((res) => {
        message.success(res.data.msg);
      });
    setLoading(false);
  };
  const delArticle = (e: SyntheticEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);
    axios
      .delete('articles/'+params.id, {
      })
      .then((res) => {
        message.success(res.data.msg);
        history.push('/articles');
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
            <ArticleForm getHeader={getChildHeader} header={header}></ArticleForm>
          </Col>
          <Row wrap={true} gutter={[-5, 0]}>
          <Col span={12}>
            <Button type="primary" loading={loading} onClick={submit}>
              发表
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
