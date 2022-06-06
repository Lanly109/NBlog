import React, { SyntheticEvent } from 'react';
import { Card } from 'antd';
import { Input, message, Button } from 'antd';
import axios from 'axios';
import { Row, Col } from 'antd';
import "./styles.less"
import { Link } from 'umi';
import { history } from 'umi';
import { Radio } from 'antd';
import { GithubOutlined, AntCloudOutlined, ShopOutlined, CoffeeOutlined } from '@ant-design/icons';

const Create: React.FC = () => {
  const [path, setPath] = React.useState<string>();
  const [persontoken, setPersontoken] = React.useState<string>();
  const [username, setUsername] = React.useState<string>();
  const [useremail, setUseremail] = React.useState<string>();
  const [remoteURL, setRemoteURL] = React.useState<string>();
  const [framework, setFramework] = React.useState<string>("hexo");
  const [position, setPosition] = React.useState<string>("gp");
  const [loading, setLoading] = React.useState<boolean>(false);


  const submit = (e: SyntheticEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post('create', {
        path: path,
        url: remoteURL,
        username: username,
        useremail: useremail,
        persontoken: persontoken,
        framework: framework,
        server: position
      })
      .then((res) => {
        message.success(res.data.msg);
        history.push('/welcome');
      });
    setLoading(false);
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
          <Card title="美好的一天从新建博客开始">
              <Row gutter={[16, 32]}>
                <Col>
                  <Input placeholder="选择你的博客路径" onChange={e => setPath(e.target.value)} value={path}/> 
                </Col>

                <Col>
                  <Button onClick={handleClick}>选择路径</Button>
                </Col>
              </Row>
              <br/>

              <Row gutter={[16, 32]}>
                <Col>
                  选择你的博客框架:
                </Col>

                <Col>
                    <Radio.Group onChange={e => setFramework(e.target.value)} defaultValue="hexo">
                        <Radio.Button value="hexo">
                            <CoffeeOutlined /> Hexo
                        </Radio.Button>
                        <Radio.Button value="hugo" disabled>
                            <ShopOutlined /> Hugo
                        </Radio.Button>
                    </Radio.Group>
                </Col>
              </Row>
              <br/>

              <Row gutter={[16, 32]}>
                <Col>
                  选择你的博客存放云端:
                </Col>

                <Col>
                    <Radio.Group onChange={e => setPosition(e.target.value)} defaultValue="gp">
                        <Radio.Button value="gp">
                            <GithubOutlined /> github page
                        </Radio.Button>
                        <Radio.Button value="cs" disabled>
                            <AntCloudOutlined /> cloud server
                        </Radio.Button>
                    </Radio.Group>
                </Col>
              </Row>
              <br/>

              <Row gutter={[16, 32]}>
                <Col>
                    Github用户名：
                </Col>

                <Col>
                  <Input placeholder="github用户名" onChange={e => setUsername(e.target.value)} value={username}/> 
                </Col>
              </Row>
              <br/>

              <Row gutter={[16, 32]}>
                <Col>
                    Github邮箱：
                </Col>

                <Col>
                  <Input placeholder="github邮箱" onChange={e => setUseremail(e.target.value)} value={useremail}/> 
                </Col>
              </Row>
              <br/>

              <Row gutter={[16, 32]}>
                <Col>
                    Github的person key
                </Col>

                <Col>
                  <Input placeholder="person token" onChange={e => setPersontoken(e.target.value)} value={persontoken}/> 
                </Col>
              </Row>
              <br/>

              <Row gutter={[16, 32]}>
                <Col>
                    Github远程仓库网址
                </Col>

                <Col>
                  <Input placeholder="https://.." onChange={e => setRemoteURL(e.target.value)} value={remoteURL}/> 
                </Col>
              </Row>
              <br/>

              <Row gutter={[16, 32]} justify="center">
                  <Button loading={loading} type="primary" onClick={submit}>就是它了！</Button>
              </Row>
              <br/>

          </Card>
      </div>
  );
};

export default Create;
