package handlers

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

type infoNoIDObj struct {

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
