package handlers

import (
	"nblog-server/server/util"
	"nblog-server/server/util/serializer"

	"github.com/gin-gonic/gin"

	"net/http"
)

type keyObj struct {

	// 给后端调用github api时的身份验证
	Key string `json:"key"`
}

// Ping 状态检查页面
func addKey(c *gin.Context) {
	obj := keyObj{}
	c.BindJSON(&obj)
	util.Log().Info(string(obj))

	_ = os.Setenv("AUTHKEY", obj.Key)

	c.JSON(200, serializer.Response{
		Code: 0,
		Msg:  "ok",
	})
}