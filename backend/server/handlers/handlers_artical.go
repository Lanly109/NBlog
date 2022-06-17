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

	defer fp.Close()

	obj := infoObj{}

	obj.Abstract = ""
	obj.Category = ""
	obj.Id, _ = strconv.Atoi(aid)

	r := bufio.NewReader(fp)
	lnum := 1
	for {
		if lnum == 6 {
			var content []byte
			cnt := 0
			for {
				lineBytes, err := r.ReadByte()
				cnt += 1
				// if cnt == 20 {
				// 	obj.Abstract = string(content)
				// }
				if err != nil && err != io.EOF {
					panic(err)
				}
				if err == io.EOF {
					break
				}
				content = append(content, lineBytes)
			}
			fmt.Print(string(content))
			// if cnt < 20 {
			// 	obj.Abstract = string(content)
			// }
			obj.Content = string(content)

			nameRune := []rune(string(content))
			runeLen := len(nameRune)
			if runeLen > 20 {
				runeLen = 20
			}
			obj.Abstract = string(nameRune[0:runeLen])
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
			obj.Category = obj.Tag[0]
		}

		lnum += 1
	}

	c.JSON(200, articalObj{
		Code: 0,
		Msg:  "Pong",
		Data: obj,
	})
}
