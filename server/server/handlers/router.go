package handlers

import (
	"github.com/gin-gonic/gin"
)

// NewRouter 路由配置
func NewRouter() *gin.Engine {
	r := gin.Default()

	// 路由
	v1 := r.Group("/")
	{
		v1.GET("ping", ping)
		// 创建仓库
		v1.POST("create", createRepo)
		// 初始化仓库
		v1.POST("init", initRepo)
		// 添加秘钥
		v1.POST("personalkeys", addKey)
		// 获取文章列表
		v1.GET("articals", getList)
		// 同步云端
		v1.POST("sync", syncCommit)
		// 获取指定文章
		v1.GET("articals/:id", getArti)
	}
	return r
}
