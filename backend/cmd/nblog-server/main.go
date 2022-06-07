package main

import (
	"nblog-server/server/conf"
	"nblog-server/server/handlers"
	"nblog-server/server/util"
)

func main() {
	// 从配置文件读取配置
	conf.Init()

	// 装载路由
	util.Log().Info("nblog-server start severing...")
	r := handlers.NewRouter()
	r.Run(":13145")
}
