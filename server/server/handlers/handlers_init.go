package handlers

import (
	"nblog-server/server/util/serializer"

	"github.com/gin-gonic/gin"

	"github.com/go-git/go-git/v5"
	. "github.com/go-git/go-git/v5/_examples"
	"github.com/go-git/go-git/v5/storage/memory"
)

const (
	DEFAULTREPONAME = "NBlogUser"
)

// 初始化仓库 v1.POST("init", initRepo)
func initRepo(c *gin.Context) {

	// 核心逻辑
	Info("git init")
	_, err := git.Init(memory.NewStorage(), nil)
	CheckIfError(err)

	if err == nil {
		c.JSON(200, serializer.Response{
			Code: 0,
			Msg:  "ok",
		})
	} else {
		c.JSON(400, serializer.Response{
			Code: 0,
			Msg:  "permission deny",
		})
	}
}