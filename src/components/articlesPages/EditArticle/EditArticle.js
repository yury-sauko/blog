import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { confirmEditing } from '../../../store/articleData.slice';
import mwFetchArticles from '../../../middlewares/mwFetchArticles';
import mwEditArticle from '../../../middlewares/mwEditArticle';
import ViewCreateEditArticle from '../../_reusable/ViewCreateEditArticle/ViewCreateEditArticle';

export default function EditArticle() {
  const { editArticleStatus } = useSelector((state) => state.articleData);
  const { token } = useSelector((state) => state.userData.currUserData);
  const { articles, offset } = useSelector((state) => state.startPage);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const slug = useLoaderData();

  const [thisArticle] = articles.filter((el) => el.slug === slug);
  const {
    title: thisTitle,
    description: thisDescr,
    body: thisBody,
    tagList: thisTagList,
  } = thisArticle;

  const onSubmit = (data) => {
    const articleData = {
      article: {
        title: data.titleInput,
        description: data.descrInput,
        body: data.bodyTextArea,
        tagList: data.tagsArr.map((el) => el.tagInput),
      },
    };

    dispatch(mwEditArticle({ token, slug, articleData }));
  };

  useEffect(() => {
    if (editArticleStatus === 'resolved') {
      dispatch(mwFetchArticles({ token, offset }));
      navigate('../article-action-type');
      dispatch(confirmEditing());
    }
  }, [editArticleStatus]);

  return (
    <ViewCreateEditArticle
      formName="edit-article"
      formHeader="Edit article"
      defValuesObj={{ defTitle: thisTitle, defDescr: thisDescr, defBody: thisBody }}
      defTagsArr={thisTagList.map((el) => ({ tagInput: el }))}
      onSubmit={onSubmit}
    />
  );
}
