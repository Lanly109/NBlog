package handlers

import (
	"nblog-server/server/util/serializer"
	"os"

	"github.com/gin-gonic/gin"
)

type pathObj struct {
	// 仓库路径
	REPOPATH string `json:"path"`

	// 远程地址
	REMOTEURL string `json:"url"`

	// 博客地址
	HOMEURL string `json:"home_url"`
}

type retObj struct {
	// 返回代码
	Code int32 `json:"code"`

	// 返回信息
	Msg string `json:"msg"`

	// 返回数据
	Data pathObj `json:"data"`
}

// Ping 状态检查页面
func getPATH(c *gin.Context) {

	obj := pathObj{}

	_, ok := os.LookupEnv("REPOPATH")

	if !ok {
		c.JSON(400, serializer.Response{
			Code: 0,
			Msg:  "Haven`t inited",
		})
		return
	}

	obj.REMOTEURL = os.Getenv("REMOTEURL")
	obj.REPOPATH = os.Getenv("REPOPATH")
	obj.HOMEURL = os.Getenv("HOMEURL")

	c.JSON(200, retObj{
		Code: 0,
		Msg:  "ok",
		Data: obj,
	})
}
