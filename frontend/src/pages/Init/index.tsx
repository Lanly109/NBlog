import React, { SyntheticEvent } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import { Input, Layout, message, Button, Space } from 'antd';
import axios from 'axios';
import { Row, Col } from 'antd';
import "./styles.less"
import { Link } from 'umi';
import { history } from 'umi';

const Init: React.FC = () => {
    const [path, setPath] = React.useState<string>();
    const [loading, setLoading] = React.useState<boolean>(false);


    const submit = (e: SyntheticEvent<HTMLElement>) => {
        e.preventDefault();
        setLoading(true);
        const hide = message.loading('初始化中', 0);
        axios
            .post('init', {
                path: path
            })
            .then((res) => {
                message.success(res.data.msg);
                setTimeout(hide, 0);
                setLoading(false);
                history.push('/articles');
            }).catch((e) => {
                message.error(e.response.data.msg);
                setTimeout(hide, 0);
                setLoading(false);
            })
    };

    // const ipc = window.require('electron').ipcRenderer;
    // const handleClick = (e) => {
    //     ipc.send('open-file-dialog-for-file')
    //     ipc.on('selected-file', function (event, path) {
    //         setPath(path);
    //     });
    // }

    return (
        <div className="init">
            <Card title="美好的一天从写博客开始">
                <Row gutter={[16, 32]}>
                    <Col>
                        <Input placeholder="选择你的博客路径" onChange={e => setPath(e.target.value)} value={path} />
                    </Col>

                    {/* <Col>
                        <Button onClick={handleClick}>选择路径</Button>
                    </Col> */}
                </Row>
                <br />

                <Row gutter={[16, 32]} justify="center">
                    <Button loading={loading} type="primary" onClick={submit}>就是它了！</Button>
                </Row>
                <br />

                <Row gutter={[16, 32]}>
                    还没有博客？<Link to="/create"> 新建一个 </Link>
                </Row>
            </Card>
        </div>
    );
};

export default Init;
