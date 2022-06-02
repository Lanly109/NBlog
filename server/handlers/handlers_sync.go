package handlers

import (
	"nblog-server/server/util/serializer"
	"nblog-server/server/util/git"

	"github.com/gin-gonic/gin"

	"os"

	"github.com/go-git/go-git/v5"
	. "github.com/go-git/go-git/v5/_examples"

	"fmt"
	"os"

	// git "github.com/go-git/go-git/v5"
	// . "github.com/go-git/go-git/v5/_examples"
	"github.com/go-git/go-git/v5/plumbing/transport/http"
)

const (
	REPOPATH = "https://github.com/huanghy95/FISCO-BCOS" // for test
)

// Ping 状态检查页面
func syncCommit(c *gin.Context) {

	// url, directory, token := os.Args[1], os.Args[2], os.Args[3]

	url := os.Getenv("REMOTEURL")
	directory := os.Getenv("REPOPATH")
	token := os.Getenv("AUTHKEY")
	username := os.Getenv("USERNAME")

	err := git.GitAddCommit(directory)
	if err != nil {
		c.JSON(400, serializer.Response{
			Code: 0,
			Msg:  "Fail Add Commit",
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
			Msg:  "无权限..",
		})
	}
}