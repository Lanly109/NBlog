import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
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
    axios.post('sync', {}).then((res) => {
      message.success(res.data.msg);
      console.log(res);
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
            <Col span={10}>
              <Form.Item label="本地仓库">
                <Input
                  disabled
                  style={{ borderRadius: 10 }}
                  onChange={(e) => setLocal(e.target.value)}
                  key={local}
                  defaultValue={local}
                />
              </Form.Item>
            </Col>
            <Col span={1}></Col>
            <Col span={10}>
              <Form.Item label="远程仓库">
                <Input
                  disabled
                  style={{ borderRadius: 10 }}
                  onChange={(e) => setRemote(e.target.value)}
                  key={remote}
                  defaultValue={remote}
                />
              </Form.Item>
            </Col>
            <Col span={1}></Col>
            <Col flex={1} span={2}>
              <Button type="primary" onClick={sync}>
                同步
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default App;