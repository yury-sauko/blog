import { createBrowserRouter } from 'react-router-dom';
import App from '../components/App/App';
import PrivateRoute from './PrivateRoute';
import ArticlesList from '../components/articlesPages/ArticlesList/ArticlesList';
import BlogPagination from '../components/BlogPagination/BlogPagination';
import ArticleFull from '../components/articlesPages/ArticleFull/ArticleFull';
import SignIn from '../components/userProfilePages/SignIn/SignIn';
import SignUp from '../components/userProfilePages/SignUp/SignUp';
import SuccessCreateUser from '../components/servicePages/SuccessCreateUser/SuccessCreateUser';
import EditProfile from '../components/userProfilePages/EditProfile/EditProfile';
import SuccessEditUserProfile from '../components/servicePages/SuccessEditUserProfile/SuccessEditUserProfile';
import CreateNewArticle from '../components/articlesPages/CreateNewArticle/CreateNewArticle';
import ArticleActionType from '../components/servicePages/ArticleActionType/ArticleActionType';
import EditArticle from '../components/articlesPages/EditArticle/EditArticle';
import PageNotFound from '../components/servicePages/PageNotFound/PageNotFound';

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
        path: 'sign-in',
        element: <SignIn />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
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
            path: 'success-create-user',
            element: <SuccessCreateUser />,
          },
          {
            path: 'profile',
            element: <EditProfile />,
          },
          {
            path: 'success-edit-user-profile',
            element: <SuccessEditUserProfile />,
          },
          {
            path: 'new-article',
            element: <CreateNewArticle />,
          },
          {
            path: 'article-action-type',
            element: <ArticleActionType />,
          },
          {
            path: 'articles/:slug/edit',
            element: <EditArticle />,
            loader: ({ params }) => params.slug,
          },
        ],
      },
    ],
  },
]);

export default router;
