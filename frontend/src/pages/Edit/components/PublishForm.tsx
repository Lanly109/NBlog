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
    const [date, setDate] = React.useState('');
    const [tag, setTag] = React.useState(['']);
    const [title, setTitle] = React.useState('');
    const [loading, setLoading] = React.useState(true);

    const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
        setFormLayout(layout);
    };

    React.useEffect(() => {
        if (loading && header.title !== undefined) {
            console.log(header)
            setTitle(header.title ? header.title : '');
            setCategory(header.category ? header.category : '');
            setDate(header.date ? header.date : '');
            setLoading(false);
        }
    }, [header]);

    React.useEffect(() => {
        if (!loading) {
            getHeader({ title: title, category: category, tag: tag, date: date });
        }
    }, [title, tag, category]);

    const onValuesChange = (_: any, allValues: any) => {
        const parseValues = allValues['names'];
        parseValues.forEach((val: string | undefined, key: number) => {
            if (typeof parseValues[key] === 'undefined') {
                parseValues[key] = ''
            }
        });
        setTag(parseValues);
    };

    return (
        <div>
            <Form
                layout={'horizontal'}
                form={form}
                initialValues={{ layout: 'horizontal' }}
                labelAlign="left"
                requiredMark={false}
            >
                <Form.Item label="题目"
                    // name="title"
                    required
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: '请输入标签',
                        },
                    ]}
                >
                    <Input
                        style={{ width: '80%', borderRadius: 10 }}
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Item>
            </Form>
            <Form
                form={form}
                initialValues={{ layout: 'horizontal' }}
                labelAlign="left"
                requiredMark={false}
            >
                <Form.Item label="类别"
                    // name="category"
                    required
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: '请输入标签',
                        },
                    ]}
                >
                    <Input
                        style={{ width: '30%', borderRadius: 10 }}
                        placeholder="Category"
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                    />
                </Form.Item>
            </Form>
            <Form
                layout={'inline'}
                initialValues={{ layout: 'inline' }}
                name="dynamic_form_item"
                onValuesChange={onValuesChange}
            >
                <Form.List name="names" initialValue={[""]}>
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field, index) => (
                                <Form.Item
                                    required={false}
                                    key={index}
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
