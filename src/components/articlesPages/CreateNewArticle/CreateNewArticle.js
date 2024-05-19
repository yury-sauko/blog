import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  pushToCreatedTagsArr,
  delFromCreatedTagsArr,
  confirmCreating,
} from '../../../store/articleData.slice';
import mwFetchArticles from '../../../middlewares/mwFetchArticles';
import mwCreateNewArticle from '../../../middlewares/mwCreateNewArticle';
import ViewCreateEditArticle from '../../_reusable/ViewCreateEditArticle/ViewCreateEditArticle';

export default function CreateNewArticle() {
  const { createArticleStatus, createdTagsArr } = useSelector((state) => state.articleData);
  const { token } = useSelector((state) => state.userData.currUserData);
  const { offset } = useSelector((state) => state.startPage);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onBtnAddClick = () => {
    dispatch(pushToCreatedTagsArr());
  };

  const onBtnDelClick = (e) => {
    dispatch(delFromCreatedTagsArr(e.target.name));
  };

  const onSubmit = (data) => {
    const articleData = {
      article: {
        title: data.titleInput,
        description: data.descrInput,
        body: data.bodyTextArea,
        tagList: Object.values(data.tagInputs),
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
      tagsArr={createdTagsArr}
      onBtnAddClick={onBtnAddClick}
      onBtnDelClick={onBtnDelClick}
      onSubmit={onSubmit}
    />
  );
}
