package handlers

import (
	"fmt"
	"nblog-server/server/util/serializer"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
)

// Ping 状态检查页面
func deleteArti(c *gin.Context) {

	rootpath, ok := os.LookupEnv("REPOPATH")

	if !ok {
		c.JSON(400, serializer.Response{
			Code: 0,
			Msg:  "Haven`t inited",
		})
		return
	}

	aid := c.Param("id")

	path := filepath.Join(rootpath, "source/_posts", aid+".md")

	fmt.Println(path)

	err := os.Remove(path)
	if err != nil {
		c.JSON(400, serializer.Response{
			Code: 0,
			Msg:  err.Error(),
		})
		return
	} else {
		c.JSON(200, serializer.Response{
			Code: 0,
			Msg:  "删除成功",
		})
	}
}
