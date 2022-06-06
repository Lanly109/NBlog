package handlers

import (
	"github.com/gin-gonic/gin"
)

// NewRouter 路由配置
func NewRouter() *gin.Engine {
	r := gin.Default()

	// 路由
	v1 := r.Group("/api")
	{
		v1.GET("ping", ping)
		// 创建仓库
		v1.POST("create", createRepo)
		// 初始化仓库
		v1.POST("init", initRepo)
		// 同步云端
		v1.POST("sync", syncCommit)
		// 获取文章列表
		v1.GET("articles", getList)
		// 获取指定文章
		v1.GET("articles/:id", getArti)
		// 更新指定文章
		v1.PUT("articles/:id", updateArti)
		// 删除指定文章
		v1.DELETE("articles/:id", deleteArti)
		// 新建指定文章
		v1.POST("articles", newArti)
	}
	return r
}
