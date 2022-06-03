package handlers

import (
	"nblog-server/server/util"
	"nblog-server/server/util/git"
	"nblog-server/server/util/serializer"

	"github.com/gin-gonic/gin"

	"encoding/json"

	"fmt"
	"os"
)

type createObj struct {

	// 本地路径
	Path string `json:"path"`

	// 远程仓库
	Url string `json:"url"`

	// 用户名
	Username string `json:"username"`

	// github的personal token
	Persontoken string `json:"persontoken"`

	// 博客框架，目前只有hexo
	Framework string `json:"framework"`

	// 服务器类型，目前只有github page
	Server string `json:"server"`
}

func createRepo(c *gin.Context) {
	obj := createObj{}
	c.BindJSON(&obj)
	str, _ := json.Marshal(obj)
	util.Log().Info(string(str))

	os.Setenv("REPOPATH", obj.Path)
	os.Setenv("REMOTEURL", obj.Url)
	os.Setenv("USERNAME", obj.Username)
	os.Setenv("TOKEN", obj.Persontoken)
	os.Setenv("FRAMEWORK", obj.Framework)
	os.Setenv("SERVER", obj.Server)

	err := git.GitClone(os.Getenv("REMOTEURL"), os.Getenv("REPOPATH"), os.Getenv("USERNAME"), os.Getenv("TOKEN"))

	fmt.Println(os.Getenv("TOKEN"))

	if err == nil {
		c.JSON(200, serializer.Response{
			Code: 0,
			Msg:  "ok",
		})
	} else {
		c.JSON(400, serializer.Response{
			Code: 0,
			Msg:  "Failed Create",
		})
	}
}
