import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Descriptions } from 'antd';
import { Row, Col } from 'antd';
import styles from './PublishForm.less';
import axios from 'axios';

type LayoutType = Parameters<typeof Form>[0]['layout'];

const App = () => {
  //   const { getHeader } = props;
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');
  const [local, setLocal] = React.useState<string>('');
  const [remote, setRemote] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [init, setInit] = React.useState<boolean>(false);
  let isMounted = true;

  React.useEffect(() => {
    if (!init) {
      setLoading(true);
      axios.get('repository', {}).then((res) => {
        console.log(res.data.data);
        setLocal(res.data.data.path);
        setRemote(res.data.data.url);
      });
      setLoading(false);
      setInit(true);
    }
    return () => {
      isMounted = false;
    };
  }, [init]);

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  const sync = () => {
    const hide = message.loading('同步中', 0);
    setLoading(true);
    axios.post('sync', {}).then((res) => {
      message.success(res.data.msg);
      setTimeout(hide, 0);
      setLoading(false);
    }).catch((e) => {
      message.error("同步出错啦qwq\n" + e.response.data.msg);
      setTimeout(hide, 0);
      setLoading(false);
    });
  };

  return (
    <div>
      <Card>
        <Form
          layout={'horizontal'}
          form={form}
          //   initialValues={{ layout: formLayout }}
          onValuesChange={onFormLayoutChange}
          labelAlign="left"
          //   labelCol={{ span: 8 }}
          //   wrapperCol={{ span: 20 }}
        >
          <Row>
            <Col span={20}>
              <Form.Item label="本地仓库">
                  <Descriptions>
                      <Descriptions.Item>{local}</Descriptions.Item>
                  </Descriptions>
              </Form.Item>
            </Col>
            <Col flex={1} span={1}>
              <Button type="primary" loading={loading} onClick={sync}>
                同步
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={20}>
              <Form.Item label="远程仓库">
                  <Descriptions>
                      <Descriptions.Item>{remote}</Descriptions.Item>
                  </Descriptions>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default App;
