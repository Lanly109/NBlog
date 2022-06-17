import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import styles from './PublishForm.less';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import MyTag from './MyTag'

type LayoutType = Parameters<typeof Form>[0]['layout'];
type selfProps = {
  getHeader: Function;
};

const App: React.FC<selfProps> = (props) => {
  const { getHeader } = props;
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');
  const [category, setCategory] = React.useState('');
  const [tag, setTag] = React.useState(['']);
  const [title, setTitle] = React.useState('');

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  React.useEffect(() => {
    getHeader({ title: title, category: category, tag: tag });
  }, [title, tag, category]);

  const titleLayout =
    formLayout === 'horizontal'
      ? {
          //   labelCol: { span: 1 },
          wrapperCol: { span: 14 },
        }
      : null;
  const categoryLayout =
    formLayout === 'horizontal'
      ? {
          //   labelCol: { span: 1 },
          wrapperCol: { span: 5 },
        }
      : null;
    const getChildTag = (tag: string[]) => {
        setTag(tag);
      };

  return (
    <div>
      <Form
        {...titleLayout}
        layout={formLayout}
        form={form}
        initialValues={{ layout: formLayout }}
        onValuesChange={onFormLayoutChange}
        labelAlign="left"
      >
        <Form.Item label="题目">
          <Input
            style={{ borderRadius: 10 }}
            key="0"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Item>
      </Form>
      <Form
        {...categoryLayout}
        form={form}
        initialValues={{ layout: 'inline' }}
        onValuesChange={onFormLayoutChange}
        labelAlign="left"
      >
        <Form.Item label="类别">
          <Input
            style={{ borderRadius: 10 }}
            placeholder="Category"
            key="0"
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Item>
      </Form>
      标签: &ensp;<MyTag getTag={getChildTag} initTag={['']}></MyTag>
    </div>
  );
};

export default App;
