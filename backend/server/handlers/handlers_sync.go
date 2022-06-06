package handlers

import (
	"fmt"
	"nblog-server/server/util/git"
	"nblog-server/server/util/serializer"

	"github.com/gin-gonic/gin"

	"os"
	// git "github.com/go-git/go-git/v5"
	// . "github.com/go-git/go-git/v5/_examples"
)

const (
	REPOPATH = "https://github.com/huanghy95/FISCO-BCOS" // for test
)

// Ping 状态检查页面
func syncCommit(c *gin.Context) {

	if _, ok := os.LookupEnv("REPOPATH"); !ok {
		c.JSON(400, serializer.Response{
			Code: 0,
			Msg:  "Haven`t inited",
		})
		return
	}
	// url, directory, token := os.Args[1], os.Args[2], os.Args[3]

	// url := os.Getenv("REMOTEURL")
	directory := os.Getenv("REPOPATH")
	token := os.Getenv("TOKEN")
	username := os.Getenv("USERNAME")

	err := git.GitAddCommit(directory)
	if err != nil {
		c.JSON(400, serializer.Response{
			Code: 0,
			Msg:  err.Error(),
		})
		return
	}
	err = git.GitPush(directory, username, token)
	fmt.Println("=== checkpoint1 ===")
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
