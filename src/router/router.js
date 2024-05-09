import { createBrowserRouter } from 'react-router-dom';
import App from '../components/App/App';
import ArticlesList from '../components/articlesPages/ArticlesList/ArticlesList';
import BlogPagination from '../components/BlogPagination/BlogPagination';
import ArticleFull from '../components/articlesPages/ArticleFull/ArticleFull';
import SignIn from '../components/userProfilePages/SignIn/SignIn';
import SignUp from '../components/userProfilePages/SignUp/SignUp';
import SuccessCreateUser from '../components/servicePages/SuccessCreateUser/SuccessCreateUser';
import EditProfile from '../components/userProfilePages/EditProfile/EditProfile';
import SuccessEditUserProfile from '../components/servicePages/SuccessEditUserProfile/SuccessEditUserProfile';
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
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
]);

export default router;
