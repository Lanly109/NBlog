package handlers

import (
	"nblog-server/server/util/serializer"

	"github.com/gin-gonic/gin"
)

// Ping 状态检查页面
func getList(c *gin.Context) {
	c.JSON(200, serializer.Response{
		Code: 0,
		Msg:  "Pong",
	})
}