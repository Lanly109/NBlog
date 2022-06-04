package handlers

import (
	"bufio"
	"fmt"
	"io"
	"nblog-server/server/util/serializer"
	"os"
	"path/filepath"
	"regexp"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

type articalObj struct {

	// 返回代码
	Code int32 `json:"code"`

	// 返回信息
	Msg string `json:"msg"`

	// 返回数据
	Data infoObj `json:"data"`
}

type infoObj struct {

	// 文章id，后端生成，用于后续定位获取的是哪个文章内容
	Id int `json:"id"`

	// 标题
	Title string `json:"title"`

	// 摘要
	Abstract string `json:"abstract"`

	// 日期
	Date string `json:"date"`

	// 内容
	Content string `json:"content"`

	// 标签
	Tag []string `json:"tag"`

	// 归档
	Category string `json:"category"`
}

// Ping 状态检查页面
func getArti(c *gin.Context) {

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

	fp, err := os.Open(path)
	if err != nil {
		c.JSON(400, serializer.Response{
			Code: 0,
			Msg:  err.Error(),
		})
		return
	}

	obj := infoObj{}

	obj.Abstract = ""
	obj.Category = ""
	obj.Id, _ = strconv.Atoi(aid)

	r := bufio.NewReader(fp)
	lnum := 1
	for {
		if lnum == 6 {
			var content []byte
			for {
				lineBytes, err := r.ReadByte()
				if err != nil && err != io.EOF {
					panic(err)
				}
				if err == io.EOF {
					break
				}
				content = append(content, lineBytes)
			}
			fmt.Print(string(content))
			obj.Content = string(content)
			break
		}
		lineBytes, err := r.ReadBytes('\n')
		line := strings.TrimSpace(string(lineBytes))
		if err != nil && err != io.EOF {
			panic(err)
		}
		if err == io.EOF {
			break
		}
		if lnum == 2 {
			compileRegex := regexp.MustCompile("title: (.*?)$")
			matchArr := compileRegex.FindStringSubmatch(line)
			fmt.Println("提取字符串: ", matchArr[len(matchArr)-1])
			obj.Title = matchArr[len(matchArr)-1]
		} else if lnum == 3 {
			compileRegex := regexp.MustCompile("date: (.*?)$")
			matchArr := compileRegex.FindStringSubmatch(line)
			fmt.Println("提取字符串: ", matchArr[len(matchArr)-1])
			obj.Date = matchArr[len(matchArr)-1]
		} else if lnum == 4 {
			compileRegex := regexp.MustCompile("tags: (.*?)$")
			matchArr := compileRegex.FindStringSubmatch(line)
			fmt.Println("提取字符串: ", matchArr[len(matchArr)-1])

			subs := matchArr[len(matchArr)-1]

			obj.Tag = strings.Split(subs, ", ")
		}

		lnum += 1
	}

	c.JSON(200, articalObj{
		Code: 0,
		Msg:  "Pong",
		Data: obj,
	})
}
