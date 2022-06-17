# NBlog Server

NBlog Server, 处理HTTP API请求


## Build & Run

### Prerequisites
Linux环境，安装 Go 1.18.3 (建议安装`gvm`(https://github.com/moovweb/gvm))

在`.env`修改环境变量

### Build

在项目根目录运行:
```
make build
```

### Run
运行项目：`./bin/nblog-server` 或:
```
make run
```

## Directory Structure

```bash
backend
├── bin
│   └── nblog-server
├── cmd
│   └── nblog-server # server entry point, 初始化各服务
│       └── main.go
├── go.mod
├── go.sum
├── Makefile
├── README.md
└── server # 与外部逻辑交互的包
    ├── conf # 配置
    │   └── conf.go
    ├── handlers # 处理所有HTTP API请求
    │   ├── artiobj.go
    │   ├── handlers_artical.go
    │   ├── handlers_create.go
    │   ├── handlers_default.go
    │   ├── handlers_deleteArti.go
    │   ├── handlers_init.go
    │   ├── handlers_list.go
    │   ├── handlers_newArti.go
    │   ├── handlers_sync.go
    │   ├── handlers_updateArti.go
    │   └── router.go # 路由
    └── util
        ├── git # git相关操作
        │   ├── add-commit.go
        │   ├── clone.go
        │   └── push.go
        ├── logger.go # 日志
        └── serializer # 序列化器
            └── common.go
```

## Development Workflow

1. 添加一个路由：修改`server/handlers/routes.go`
2. 实现一组相同逻辑的handlers：添加`server/handlers/handlers_xxx.go`并修改
3. 添加新的servers：在`server/`下添加
