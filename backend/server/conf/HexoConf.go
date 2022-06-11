package conf

type HexoConf struct {
	Title              string         `yaml:"title"`
	Subtitle           string         `yaml:"subtitle"`
	Description        string         `yaml:"description"`
	Keywords           string         `yaml:"keywords"`
	Author             string         `yaml:"author"`
	Language           string         `yaml:"language"`
	Timezone           string         `yaml:"timezone"`
	Url                string         `yaml:"url"`
	Permalink          string         `yaml:"permalink"`
	Permalink_defaults string         `yaml:"permalink_defaults"`
	Pretty_urls        PrettyUrl      `yaml:"pretty_urls"`
	Source_dir         string         `yaml:"source_dir"`
	Public_dir         string         `yaml:"public_dir"`
	Tag_dir            string         `yaml:"tag_dir"`
	Archive_dir        string         `yaml:"archive_dir"`
	Category_dir       string         `yaml:"category_dir"`
	Code_dir           string         `yaml:"code_dir"`
	I18n_dir           string         `yaml:"i18n_dir"`
	Skip_render        string         `yaml:"skip_render"`
	New_post_name      string         `yaml:"new_post_name"`
	Default_layout     string         `yaml:"default_layout"`
	Titlecase          bool           `yaml:"titlecase"`
	External_link      ExternalLink   `yaml:"external_link"`
	Filename_case      int            `yaml:"filename_case"`
	Render_drafts      bool           `yaml:"render_drafts"`
	Post_asset_folder  bool           `yaml:"post_asset_folder"`
	Relative_link      bool           `yaml:"relative_link"`
	Future             bool           `yaml:"future"`
	Highlight          Highlight      `yaml:"highlight"`
	Prismjs            Prismjs        `yaml:"prismjs"`
	Index_generator    IndexGenerator `yaml:"index_generator"`
	Default_category   string         `yaml:"default_category"`
	Category_map       string         `yaml:"category_map"`
	Tag_map            string         `yaml:"tag_map"`
	Meta_generator     bool           `yaml:"meta_generator"`
	Date_format        string         `yaml:"date_format"`
	Time_format        string         `yaml:"time_format"`
	Updated_option     string         `yaml:"updated_option"`
	Per_page           int            `yaml:"per_page"`
	Pagination_dir     string         `yaml:"pagination_dir"`
	Include            string         `yaml:"include"`
	Exclude            string         `yaml:"exclude"`
	Ignore             string         `yaml:"ignore"`
	Theme              string         `yaml:"theme"`
	Deploy             Deploy         `yaml:"deploy"`
}

type PrettyUrl struct {
	Trailing_index bool `yaml:"trailing_index"`
	Trailing_html  bool `yaml:"trailing_html"`
}

type ExternalLink struct {
	Enable  bool   `yaml:"enable"`
	Field   string `yaml:"field"`
	Exclude string `yaml:"exclude"`
}

type Highlight struct {
	Enable      bool   `yaml:"enable"`
	Line_number bool   `yaml:"line_number"`
	Auto_detect bool   `yaml:"auto_detect"`
	Tab_replace string `yaml:"tab_replace"`
	Wrap        bool   `yaml:"wrap"`
	Hljs        bool   `yaml:"hljs"`
}

type Prismjs struct {
	Enable      bool   `yaml:"enable"`
	Preprocess  bool   `yaml:"preprocess"`
	Line_number bool   `yaml:"line_number"`
	Tab_replace string `yaml:"tab_replace"`
}

type IndexGenerator struct {
	Path     string `yaml:"path"`
	Per_page int    `yaml:"per_page"`
	Order_by string `yaml:"order_by"`
}

type Deploy struct {
	Type string `yaml:"type"`
}
