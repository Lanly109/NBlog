# NBlog

[![License](https://img.shields.io/github/license/Lanly109/NBlog)](LICENSE)
![Electron Version](https://img.shields.io/badge/electron-19.0.2+-blue)
![Golang Version](https://img.shields.io/badge/Golang-1.18.2-blue)

软件文档请参见`document`分支。

基于`Electron`的面向小白的博客搭建和编写软件

## 安装


### 通过二进制文件安装

从[release](https://github.com/Lanly109/NBlog/releases)中下载符合自己电脑的安装包安装

### 通过源码安装

```bash
git clone https://github.com/Lanly109/NBlog

# 构建后端
cd backend
make build
# 构建出的二进制文件在bin文件夹下

# 复制二进制文件到frontend文件夹下
cp bin/nblog-server ../frontend/
# 在windows系统，其二进制文件名为nblog-server.exe

# 构建前端
cd ../frontend

# 构建前端页面
yarn
yarn install

# 构建electron应用
yarn ebuild
# 构建出的应用在build文件夹里

cd bin

# 打开二进制安装包安装
``` 

## 使用

- 打开NBlog
- 选择主机上博客的路径，或者新建博客
- 享受编写博客吧～

注：在新建博客中，personal token的创建位于右上角点击头像，`settings->Developer settings->Personal access tokens->Generate new token`，该`token`需要有`repo`和`workflow`权限。

填写的仓库名若不存在，`NBlog`会自动创建新仓库，若存在，则原有内容会**被覆盖**。

## TODO列表

- [ ] 支持`关于我`页面修改
- [ ] 支持多种主题
- [ ] 支持多种框架
- [x] 更新tag的界面
- [x] 完善简介文案（去掉乱码）
- [x] 支持后端添加`secret`
- [x] fix delete commit
