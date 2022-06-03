package handlers

import (
	"fmt"
	"nblog-server/server/util/serializer"
	"os"

	"github.com/gin-gonic/gin"
)

// Ping 状态检查页面
func ping(c *gin.Context) {

	if val, ok := os.LookupEnv("TOKEN"); ok {
		fmt.Printf("%s: %s\n", "TOKEN", val)
	} else {
		fmt.Println("NOT EXIST")
	}

	c.JSON(200, serializer.Response{
		Code: 0,
		Msg:  "Pong",
	})
}
