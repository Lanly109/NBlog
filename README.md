# NBlog

[![License](https://img.shields.io/github/license/Lanly109/NBlog)](LICENSE)
![Electron Version](https://img.shields.io/badge/electron-19.0.2+-blue)
![Golang Version](https://img.shields.io/badge/Golang-1.18.2-blue)

Electron-based software that is friendly to beginners in building blogs and writing blog posts.

## Install


### Install from Binary File

Download from [release](https://github.com/Lanly109/NBlog/releases) that is suitable for your computer.

### Install from Source Code

```bash
git clone https://github.com/Lanly109/NBlog

// build backend binary
cd backend
make build
// the target file is in bin Folder

// copy the target file to frontend Folder
cp bin/nblog-server ../frontend/
// In windows, use the name nblog-server.exe

// build frontend 
cd ../frontend

// build frontend page
yarn
yarn install

// build Electron
yarn ebuild
// the target file is in bin Folder

cd bin

// Install it
``` 

## Usage

- Open NBlog.
- Select the path of a blog or create a blog
- enjoy the writting.

## TODO List

- [ ] update tag UI
- [ ] update abstract part(remove garbled codes)
- [ ] support add `secret` in backend
- [ ] support about me modify
- [ ] fix delete commit
