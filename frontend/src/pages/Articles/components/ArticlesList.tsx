import React, { SyntheticEvent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { List, Card } from 'antd';
import axios from 'axios';
import style from './ArticleList.less';

type Article = {
  id?: number;
  title?: string;
  abstract?: string;
  date?: string;
  category?: string;
  tag?: string[];
};
interface InitProps {}
type MainProps = InitProps & RouteComponentProps;

const App: React.FC<MainProps> = (props: MainProps) => {
  const [articleList, setArticleList] = React.useState<Article[]>();
  const [loading, setLoading] = React.useState<boolean>(false);
  let isMounted = true;
  React.useEffect(() => {
    if (!articleList) {
      setLoading(true);
      axios.get(axios.defaults.baseURL + 'articles', {}).then((res) => {
        console.log(res.data);
        setArticleList(res.data.data);
      });
      setLoading(false);
    }
    return () => {
      isMounted = false;
    };
  }, [articleList]);
  const routeClick = (jumpId: number | undefined) => {
    if (isMounted) {
      console.log(props.history);
      props.history.push('/edit/' + jumpId);
    }
  };
  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={articleList}
      renderItem={(item) => (
        <List.Item
          onClick={(e: SyntheticEvent<HTMLElement>) => {
            e.preventDefault();
            const articles = articleList?.find((article) => {
              const textContent = (e.target as HTMLButtonElement).textContent;
              return textContent === article.title || textContent === article.abstract;
            });
            console.log(articles);
            routeClick(articles?.id);
          }}
        >
          <Card loading={loading} className={style.articleCard} title={item.title} hoverable={true}>
            {item.abstract}
          </Card>
        </List.Item>
      )}
    />
  );
};
export default withRouter(App);
