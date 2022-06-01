import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import { Layout } from 'antd';
import MD from './components/MD';
import { Row, Col } from 'antd';

const Articles: React.FC = () => {
  return (
    <PageContainer>
        <Row>
          <Col flex={1}>
            <Card>
              <MD></MD>
            </Card>
          </Col>
        </Row>
    </PageContainer>
  );
};

export default Articles;
