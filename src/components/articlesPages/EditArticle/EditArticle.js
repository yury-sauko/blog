import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import {
  pushToEditedTagsArr,
  delFromEditedTagsArr,
  confirmEditing,
} from '../../../store/articleData.slice';
import mwFetchArticles from '../../../middlewares/mwFetchArticles';
import mwEditArticle from '../../../middlewares/mwEditArticle';
import ViewCreateEditArticle from '../../_reusable/ViewCreateEditArticle/ViewCreateEditArticle';

export default function EditArticle() {
  const { editArticleStatus } = useSelector((state) => state.articleData);
  const { token } = useSelector((state) => state.userData.currUserData);
  const { articles, offset } = useSelector((state) => state.startPage);

  const slug = useLoaderData();

  const [thisArticle] = articles.filter((el) => el.slug === slug);
  const {
    title: thisTitle,
    description: thisDescr,
    body: thisBody,
    tagList: thisTagList,
  } = thisArticle;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onBtnAddClick = () => {
    dispatch(pushToEditedTagsArr());
  };

  const onBtnDelClick = (e) => {
    dispatch(delFromEditedTagsArr(e.target.name));
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

    dispatch(mwEditArticle({ token, slug, articleData }));
  };

  useEffect(() => {
    if (editArticleStatus === 'resolved') {
      dispatch(mwFetchArticles(offset));
      navigate('../article-action-type');
      dispatch(confirmEditing());
    }
  }, [editArticleStatus]);

  return (
    <ViewCreateEditArticle
      formName="edit-article"
      formHeader="Edit article"
      defValuesObj={{ defTitle: thisTitle, defDescr: thisDescr, defBody: thisBody }}
      tagsArr={thisTagList}
      onBtnAddClick={onBtnAddClick}
      onBtnDelClick={onBtnDelClick}
      onSubmit={onSubmit}
    />
  );
}
