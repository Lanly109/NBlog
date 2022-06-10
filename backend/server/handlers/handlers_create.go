package handlers

import (
	"nblog-server/server/util"
	"nblog-server/server/util/git"
	"nblog-server/server/util/githubAPI"
	"nblog-server/server/util/serializer"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"encoding/json"

	"fmt"
	"os"
)

type createObj struct {

	// 本地路径
	REPOPATH string `json:"path"`

	// 远程仓库名
	REPONAME string `json:"reponame"`

	// 远程仓库
	REMOTEURL string `json:"url"`

	// 用户名
	USERNAME string `json:"username"`

	// 邮箱
	MAIL string `json:"usermail"`

	// github的personal token
	TOKEN string `json:"persontoken"`

	// 博客框架，目前只有hexo
	FRAMEWORK string `json:"framework"`

	// 服务器类型，目前只有github page
	SERVER string `json:"server"`
}

func createRepo(c *gin.Context) {

    githubClient := githubAPI.GetNewGithubClient()

	obj := createObj{}
	c.BindJSON(&obj)
	str, _ := json.Marshal(obj)
	util.Log().Info(string(str))

	ma := make(map[string]string)

	repopath := filepath.Join(obj.REPOPATH, "src")
	envpath := filepath.Join(obj.REPOPATH, ".env")

    obj.REMOTEURL = "github.com/" + obj.USERNAME + "/" + obj.REPONAME + ".git";

    githubClient.Init(obj.USERNAME, obj.REPONAME, obj.TOKEN)
    if err := githubClient.CreateRepo(); err != nil{
		c.JSON(400, serializer.Response{
			Code: 0,
			Msg:  err.Error(),
		})
		return
    }

    if err := githubClient.AddSecret("GIT_NAME", obj.USERNAME); err != nil{
		c.JSON(400, serializer.Response{
			Code: 0,
			Msg:  err.Error(),
		})
		return
    }

    if err := githubClient.AddSecret("GIT_EMAIL", obj.MAIL); err != nil{
		c.JSON(400, serializer.Response{
			Code: 0,
			Msg:  err.Error(),
		})
		return
    }

    if err := githubClient.AddSecret("GIT_URL", obj.REMOTEURL); err != nil{
		c.JSON(400, serializer.Response{
			Code: 0,
			Msg:  err.Error(),
		})
		return
    }

    if err := githubClient.AddSecret("GH_TOKEN", obj.TOKEN); err != nil{
		c.JSON(400, serializer.Response{
			Code: 0,
			Msg:  err.Error(),
		})
		return
    }

    obj.REMOTEURL = "https://" + obj.REMOTEURL

	ma["REPOPATH"] = repopath
    ma["REMOTEURL"] = obj.REMOTEURL
	ma["REPONAME"] = obj.REPONAME
	ma["USERNAME"] = obj.USERNAME
	ma["MAIL"] = obj.MAIL
	ma["TOKEN"] = obj.TOKEN
	ma["FRAMEWORK"] = obj.FRAMEWORK
	ma["SERVER"] = obj.SERVER
	ma["ENVPATH"] = envpath


	os.Setenv("REPOPATH", repopath)
	os.Setenv("REMOTEURL", obj.REMOTEURL)
	os.Setenv("REPONAME", obj.REPONAME)
	os.Setenv("USERNAME", obj.USERNAME)
	os.Setenv("MAIL", obj.MAIL)
	os.Setenv("TOKEN", obj.TOKEN)
	os.Setenv("FRAMEWORK", obj.FRAMEWORK)
	os.Setenv("SERVER", obj.SERVER)
	os.Setenv("ENVPATH", envpath)

	fmt.Printf("username %s token %s\n", obj.USERNAME, obj.TOKEN)
	err := git.GitClone(os.Getenv("REMOTEURL"), os.Getenv("REPOPATH"), os.Getenv("USERNAME"), os.Getenv("TOKEN"))
	if err != nil {
		c.JSON(400, serializer.Response{
			Code: 0,
			Msg:  err.Error(),
		})
		return
	}

	fmt.Println(os.Getenv("TOKEN"))

	err = godotenv.Write(ma, envpath)
	if err != nil {
		c.JSON(400, serializer.Response{
			Code: 0,
			Msg:  err.Error(),
		})
		return
	}

	directory := os.Getenv("REPOPATH")
	token := os.Getenv("TOKEN")
	username := os.Getenv("USERNAME")

	err = git.GitAddCommit(directory)
	if err != nil {
		c.JSON(400, serializer.Response{
			Code: 0,
			Msg:  err.Error(),
		})
		return
	}

	err = git.GitPush(directory, username, token)

    // if err := githubClient.CreatePage("main", "/"); err != nil{
	//     c.JSON(400, serializer.Response{
	//         Code: 0,
	//         Msg:  err.Error(),
	//     })
	//     return
    // }

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
