import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import styles from './PublishForm.less';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Props from '../type/Props';
import Mytag from './MyTag'

type LayoutType = Parameters<typeof Form>[0]['layout'];


const App: React.FC<Props> = (props) => {
    const { getHeader, header } = props;
    const [form] = Form.useForm();
    const [category, setCategory] = React.useState('');
    const [date, setDate] = React.useState('');
    const [tag, setTag] = React.useState(['']);
    const [title, setTitle] = React.useState('');
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (loading && header.title !== undefined) {
            console.log(header)
            setTitle(header.title ? header.title : '');
            setCategory(header.category ? header.category : '');
            setDate(header.date ? header.date : '');
            setTag(header.tag ? header.tag : ['默认标签']);
            setLoading(false);
        }
    }, [header]);

    React.useEffect(() => {
        if (!loading) {
            getHeader({ title: title, category: category, tag: tag, date: date });
        }
    }, [title, tag, category]);

    const getChildTag = (tag: string[]) => {
        setTag(tag);
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
                >
                    <Input
                        style={{ width: '30%', borderRadius: 10 }}
                        placeholder="Category"
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                    />
                </Form.Item>
            </Form>
            标签: &ensp;<Mytag getTag={getChildTag} initTag={tag}></Mytag>
        </div>
    );
};

export default App;
