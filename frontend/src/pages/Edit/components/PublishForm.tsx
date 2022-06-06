import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import styles from './PublishForm.less';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Header from '../type/Header';

type LayoutType = Parameters<typeof Form>[0]['layout'];
type selfProps = {
  getHeader: Function;
  header: Header;
};

const App: React.FC<selfProps> = (props) => {
  const { getHeader, header } = props;
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');
  const [category, setCategory] = React.useState('');
  const [tag, setTag] = React.useState(['']);
  const [title, setTitle] = React.useState('');
  const [loading, setLoading] = useState(true);

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  React.useEffect(() => {
    if (loading && header === {}) {
      setTitle(header.title ? header.title : '');
      setCategory(header.category ? header.category : '');
      setLoading(false);
    }
  }, [header]);

  React.useEffect(() => {
    getHeader({ title: title, category: category, tag: tag });
  }, [title, tag, category]);

  const titleLayout =
    formLayout === 'horizontal'
      ? {
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
  const onValuesChange = (_: any, allValues: any) => {
    setTag(allValues);
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
            placeholder={header.title}
            onChange={(e) => setTitle(e.target.value)}
            key={header.title}
            defaultValue={header.title}
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
            placeholder={header.category}
            onChange={(e) => setCategory(e.target.value)}
            key={header.category}
            defaultValue={header.category}
          />
        </Form.Item>
      </Form>
      <Form
        layout={'inline'}
        initialValues={{ layout: 'inline' }}
        name="dynamic_form_item"
        onValuesChange={onValuesChange}
      >
        <Form.List name="names" initialValue={[{ tag }]}>
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  required={false}
                  key={field.key}
                  label={index === 0 ? '标签' : ''}
                  wrapperCol={{ span: 19 }}
                  //   style={{wrap:{false}}}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: '请输入标签',
                      },
                    ]}
                    noStyle
                  >
                    <Input placeholder="Tag" style={{ width: '60%', borderRadius: 10 }} />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className={styles.dynamic_delete_button}
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}></Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </div>
  );
};

export default App;
