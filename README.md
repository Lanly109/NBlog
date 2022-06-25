# NBlog

[![License](https://img.shields.io/github/license/Lanly109/NBlog)](LICENSE)
![Electron Version](https://img.shields.io/badge/electron-19.0.2+-blue)
![Golang Version](https://img.shields.io/badge/Golang-1.18.2-blue)

[中文版](./README_cn.md)

For software documents, please refer to the `document` branch.

Electron-based software that is friendly to beginners in building blogs and writing blog posts.

## Install


### Install from Binary File

Download from [release](https://github.com/Lanly109/NBlog/releases) that is suitable for your computer.

### Install from Source Code

```bash
git clone https://github.com/Lanly109/NBlog

# build backend binary
cd backend
make build
# the target file is in bin Folder

# copy the target file to frontend Folder
cp bin/nblog-server ../frontend/
# In windows, use the name nblog-server.exe

# build frontend 
cd ../frontend

# build frontend page
yarn
yarn install
yarn build

# build Electron
yarn ebuild
# the target file is in bin Folder

cd build

# Install it
``` 

## Usage

- Open NBlog.
- Select the path of a blog or create a blog
- enjoy the writting.

Tip: In the page of creating a blog, the creation of personal token is located in the upper right corner of the github page. Click the avatar, `settings->Developer settings->Personal acce ss tokens->Generate new token`. The token requires `repo` and `workflow` permissions.

If the repository name does not exist in your github, `NBlog` will automatically create a new repository, or will **overwrite** if it exists.

## TODO List

- [ ] support about me modify
- [ ] support multiple theme
- [ ] support multiple framework
- [x] update tag UI
- [x] update abstract part(remove garbled codes)
- [x] support add `secret` in backend
