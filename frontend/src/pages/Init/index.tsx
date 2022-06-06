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
        const hide = message.loading('Action in progress..', 0);
        axios
            .post('init', {
                path: path
            })
            .then((res) => {
                message.success(res.data.msg);
                setTimeout(hide, 0);
                setLoading(false);
                history.push('/articles');
            }).catch(() => {
                message.error("初始化出错啦请重试");
                setTimeout(hide, 0);
                setLoading(false);
            })
    };


    const handleClick = (e) => {
        // const {dialog} = require('electron').remote
        // dialog.showOpenDialog({
        //         title:'请选择你的文件',
        //         defaultPath:'',//默认打开的文件路径选择
        //         buttonLabel:'就是这里！'
        //     }).then(res=>{
        //         setPath(res.filePaths[0])
        //     }).catch(req=>{
        //         console.log(req)
        //     })
    }

    return (
        <div className="init">
            <Card title="美好的一天从写博客开始">
                <Row gutter={[16, 32]}>
                    <Col>
                        <Input placeholder="选择你的博客路径" onChange={e => setPath(e.target.value)} value={path} />
                    </Col>

                    <Col>
                        <Button onClick={handleClick}>选择路径</Button>
                    </Col>
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
