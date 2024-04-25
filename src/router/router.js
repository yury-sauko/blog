import { createBrowserRouter } from 'react-router-dom';
import App from '../components/App/App';
import ArticlesList from '../components/articles/ArticlesList/ArticlesList';
import BlogPagination from '../components/BlogPagination/BlogPagination';
import ArticleFull from '../components/articles/ArticleFull/ArticleFull';
import PageNotFound from '../components/PageNotFound/PageNotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <>
            <ArticlesList />
            <BlogPagination />
          </>
        ),
      },
      {
        path: 'articles/:slug',
        element: <ArticleFull />,
        loader: ({ params }) => params.slug,
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
]);

export default router;
