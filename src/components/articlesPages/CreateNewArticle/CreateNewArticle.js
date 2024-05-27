import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { confirmCreating } from '../../../store/articleData.slice';
import mwFetchArticles from '../../../middlewares/mwFetchArticles';
import mwCreateNewArticle from '../../../middlewares/mwCreateNewArticle';
import ViewCreateEditArticle from '../../_reusable/ViewCreateEditArticle/ViewCreateEditArticle';

export default function CreateNewArticle() {
  const { createArticleStatus } = useSelector((state) => state.articleData);
  const { token } = useSelector((state) => state.userData.currUserData);
  const { offset } = useSelector((state) => state.startPage);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const articleData = {
      article: {
        title: data.titleInput,
        description: data.descrInput,
        body: data.bodyTextArea,
        tagList: data.tagsArr.map((el) => el.tagInput),
      },
    };

    dispatch(mwCreateNewArticle({ token, articleData }));
  };

  useEffect(() => {
    if (createArticleStatus === 'resolved') {
      dispatch(mwFetchArticles({ token, offset }));
      navigate('../article-action-type');
      dispatch(confirmCreating());
    }
  }, [createArticleStatus]);

  return (
    <ViewCreateEditArticle
      formName="create-article"
      formHeader="Create new article"
      defValuesObj={{ defTitle: '', defDescr: '', defBody: '' }}
      defTagsArr={[{ tagInput: '' }]}
      onSubmit={onSubmit}
      mainBtnName="Create"
    />
  );
}
