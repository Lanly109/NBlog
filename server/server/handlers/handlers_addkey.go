package handlers

import (
	"nblog-server/server/util"
	"nblog-server/server/util/serializer"

	"github.com/gin-gonic/gin"

	"encoding/json"
	"os"
)

type keyObj struct {

	// 给后端调用github api时的身份验证
	Key string `json:"key"`
}

// Ping 状态检查页面
func addKey(c *gin.Context) {
	obj := keyObj{}
	c.BindJSON(&obj)
	str,_ := json.Marshal(obj)
	util.Log().Info(string(str))

	_ = os.Setenv("AUTHKEY", obj.Key)

	c.JSON(200, serializer.Response{
		Code: 0,
		Msg:  "ok",
	})
}