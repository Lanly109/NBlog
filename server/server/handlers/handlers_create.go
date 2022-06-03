package handlers

import (
	"nblog-server/server/util"
	"nblog-server/server/util/git"
	"nblog-server/server/util/serializer"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"encoding/json"

	"fmt"
	"os"
)

type createObj struct {

	// 本地路径
	REPOPATH string `json:"path"`

	// 远程仓库
	REMOTEURL string `json:"url"`

	// 用户名
	USERNAME string `json:"username"`

	// 邮箱
	MAIL string `json:"usermail"`

	// github的personal token
	TOKEN string `json:"persontoken"`

	// 博客框架，目前只有hexo
	FRAMEWORK string `json:"framework"`

	// 服务器类型，目前只有github page
	SERVER string `json:"server"`
}

func createRepo(c *gin.Context) {
	obj := createObj{}
	c.BindJSON(&obj)
	str, _ := json.Marshal(obj)
	util.Log().Info(string(str))

	os.Setenv("REPOPATH", obj.REPOPATH)
	os.Setenv("REMOTEURL", obj.REMOTEURL)
	os.Setenv("USERNAME", obj.USERNAME)
	os.Setenv("MAIL", obj.MAIL)
	os.Setenv("TOKEN", obj.TOKEN)
	os.Setenv("FRAMEWORK", obj.FRAMEWORK)
	os.Setenv("SERVER", obj.SERVER)

	var ma map[string]string
	json.Unmarshal(str, &ma)

	godotenv.Write(ma, filepath.Join(obj.REPOPATH, ".env"))

	err := git.GitClone(os.Getenv("REMOTEURL"), os.Getenv("REPOPATH"), os.Getenv("USERNAME"), os.Getenv("TOKEN"))
	if err != nil {
		c.JSON(400, serializer.Response{
			Code: 0,
			Msg:  err.Error(),
		})
		return
	}

	fmt.Println(os.Getenv("TOKEN"))

	directory := os.Getenv("REPOPATH")
	token := os.Getenv("TOKEN")
	username := os.Getenv("USERNAME")

	err = git.GitAddCommit(directory)
	if err != nil {
		c.JSON(400, serializer.Response{
			Code: 0,
			Msg:  err.Error(),
		})
		return
	}

	err = git.GitPush(directory, username, token)
	if err == nil {
		c.JSON(200, serializer.Response{
			Code: 0,
			Msg:  "ok",
		})
	} else {
		c.JSON(400, serializer.Response{
			Code: 0,
			Msg:  err.Error(),
		})
	}
}