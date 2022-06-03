package handlers

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"nblog-server/server/util"
	"nblog-server/server/util/serializer"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

const (
	DEFAULTREPONAME = "NBlogUser"
)

type initObj struct {

	// 路径，仓库存放的绝对路径
	Path string `json:"path"`
}

// 初始化仓库 v1.POST("init", initRepo)
func initRepo(c *gin.Context) {

	fmt.Println("Entered")

	obj := initObj{}
	c.BindJSON(&obj)
	str, _ := json.Marshal(obj)
	util.Log().Info(string(str))
	fmt.Println(string(str))

	filename := filepath.Join(obj.Path, ".env")

	fmt.Println(filename)

	err := godotenv.Load(filename)

	fmt.Println(os.Getenv("REMOTEURL"))

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
