import React, { SyntheticEvent } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import { Input, Layout, message, Button } from 'antd';
import 'vditor/dist/index.css';
import Vditor from 'vditor';
import axios from 'axios';
import { Row, Col } from 'antd';
import ArticleList from './components/ArticlesList';
import RepoSetting from './components/RepoSetting';
import { history } from 'umi';

type Header = {
  title?: string;
  category?: string;
  tag?: string[];
};

const Articles: React.FC = () => {

  return (
    <PageContainer>
      <Card>
        <Row>
          <Col flex={6} span={24}>
            <RepoSetting></RepoSetting>
          </Col>
        </Row>
        <Row wrap={false} gutter={[-5, 0]}>
          <Col flex={6} span={22}>
            <ArticleList></ArticleList>
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};

export default Articles;
