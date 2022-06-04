package handlers

import (
	"bufio"
	"encoding/json"
	"fmt"
	"nblog-server/server/util"
	"nblog-server/server/util/serializer"
	"os"
	"path/filepath"
	"strconv"

	"github.com/gin-gonic/gin"
)

// Ping 状态检查页面
func newArti(c *gin.Context) {

	iobj := infoNoIDObj{}

	c.BindJSON(&iobj)
	str, _ := json.Marshal(iobj)
	util.Log().Info(string(str))

	rootpath, ok := os.LookupEnv("REPOPATH")

	if !ok {
		c.JSON(400, serializer.Response{
			Code: 0,
			Msg:  "Haven`t inited",
		})
		return
	}

	nid, ok := os.LookupEnv("NID")

	var aid int

	if !ok {
		aid = 10
	} else {
		aid, _ = strconv.Atoi(nid)
		aid += 1
	}

	os.Setenv("NID", strconv.Itoa(aid))

	path := filepath.Join(rootpath, "source/_posts", strconv.Itoa(aid)+".md")

	fmt.Println(path)

	fp, err := os.Create(path)
	if err != nil {
		c.JSON(400, serializer.Response{
			Code: 0,
			Msg:  err.Error(),
		})
		return
	}

	w := bufio.NewWriter(fp)

	w.WriteString("---")
	w.WriteByte('\n')
	w.WriteString("title: " + iobj.Title)
	w.WriteByte('\n')
	w.WriteString("date: " + iobj.Date)
	w.WriteByte('\n')
	w.WriteString("tags: ")
	first := true
	for _, tag := range iobj.Tag {
		if first {
			first = false
		} else {
			w.WriteString(", ")
		}
		w.WriteString(tag)
	}
	w.WriteByte('\n')
	w.WriteString("---")

	w.WriteString(iobj.Content)

	if err := w.Flush(); err != nil {
		c.JSON(400, serializer.Response{
			Code: 0,
			Msg:  err.Error(),
		})
		return
	}

	c.JSON(200, serializer.Response{
		Code: 0,
		Msg:  "创建成功",
	})
}
