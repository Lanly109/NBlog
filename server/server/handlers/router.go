package handlers

import (
	"github.com/gin-gonic/gin"
)

// NewRouter 路由配置
func NewRouter() *gin.Engine {
	r := gin.Default()

	// 路由
	v1 := r.Group("/api/v1")
	{
		v1.GET("ping", ping)
	}
	return r
}
