import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNamesBind from 'classnames/bind';
import { pushToTagsArr, delFromTagsArr, confirmCreating } from '../../../store/articleData.slice';
import mwCreateNewArticle from '../../../middlewares/mwCreateNewArticle';
import Button from '../../Button/Button';
import classes from './create-new-article.module.scss';

const cnb = classNamesBind.bind(classes);

const schema = yup
  .object({
    titleInput: yup
      .string()
      .trim('No leading and trailing spaces')
      .strict()
      .min(1, 'Article title needs to be at least 1 character')
      .max(100, 'Article title needs to be maximum 100 characters'),
    descrInput: yup
      .string()
      .trim('No leading and trailing spaces')
      .strict()
      .min(1, 'Article short description needs to be at least 1 character')
      .max(200, 'Article short description needs to be maximum 200 characters'),
    bodyTextArea: yup
      .string()
      .trim('No leading and trailing spaces')
      .strict()
      .min(1, 'Article text needs to be at least 1 character'),
  })
  .required();

export default function CreateNewArticle() {
  const { createArticleStatus, createdTagsArr } = useSelector((state) => state.articleData);
  const { token } = useSelector((state) => state.userData.currUserData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onBlur' });

  const onBtnAddClick = () => {
    dispatch(pushToTagsArr());
  };

  const onBtnDelClick = (e) => {
    dispatch(delFromTagsArr(e.target.name));
  };

  const createTagEl = (el) => {
    const tagInputName = `tagInput_${el}`;
    return (
      <li key={tagInputName} className={classes['create-article-form__tag-wrapper']}>
        <div>
          <input
            type="text"
            autoComplete="off"
            placeholder="Tag"
            className={cnb('create-article-form__input', 'create-article-form__input--width-300')}
            {...register(`tagInputs.${tagInputName}`)}
          />
        </div>
        <button
          type="button"
          disabled={createdTagsArr.length === 1}
          name={el}
          className={classes['create-article-form__btn-del']}
          onClick={onBtnDelClick}
        >
          Delete
        </button>
      </li>
    );
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

    console.log('data.tagInputs = ', data.tagInputs);
    console.log('[String(Object.values(data.tagInputs)).split(', ')] =>');
    console.log([String(Object.values(data.tagInputs)).split(',')]);
    console.log('articleData = ', articleData);

    dispatch(mwCreateNewArticle({ token, articleData }));
  };

  useEffect(() => {
    if (createArticleStatus === 'resolved') {
      navigate('../success-create-article');
      dispatch(confirmCreating());
    }
  }, [createArticleStatus]);

  return (
    <form
      name="create-article"
      className={classes['create-article-form']}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={classes['create-article-form__header']}>Create new article</h2>

      <label htmlFor="articleTitle" className={classes['create-article-form__label']}>
        <span className={classes['create-article-form__label-text']}>Title</span>
        <input
          type="text"
          autoComplete="off"
          placeholder="Title"
          id="articleTitle"
          className={cnb('create-article-form__input', {
            'create-article-form__input--validation-error': errors.titleInput,
          })}
          {...register('titleInput')}
        />
      </label>
      <p className={classes['create-article-form__validation-error-text']}>
        {errors.titleInput?.message}
      </p>

      <label htmlFor="articleShortDescr" className={classes['create-article-form__label']}>
        <span className={classes['create-article-form__label-text']}>Short description</span>
        <input
          type="text"
          autoComplete="off"
          placeholder="Short description"
          id="articleShortDescr"
          className={cnb('create-article-form__input', {
            'create-article-form__input--validation-error': errors.descrInput,
          })}
          {...register('descrInput')}
        />
      </label>
      <p className={classes['create-article-form__validation-error-text']}>
        {errors.descrInput?.message}
      </p>

      <label htmlFor="articleBody" className={classes['create-article-form__label']}>
        <span className={classes['create-article-form__label-text']}>Text</span>
        <textarea
          placeholder="Text"
          id="articleBody"
          className={cnb('create-article-form__input', 'create-article-form__body', {
            'create-article-form__input--validation-error': errors.bodyTextArea,
          })}
          {...register('bodyTextArea')}
        />
      </label>
      <p className={classes['create-article-form__validation-error-text']}>
        {errors.bodyTextArea?.message}
      </p>

      <div className={classes['create-article-form__tags-btns-wrapper']}>
        <ul className={classes['create-article-form__tags-list']}>
          {createdTagsArr.map((el) => createTagEl(el))}
        </ul>
        <button
          type="button"
          className={cnb('create-article-form__btn-del', 'create-article-form__btn-del--add')}
          onClick={onBtnAddClick}
        >
          Add tag
        </button>
      </div>

      <Button classMod="button--width-319">Create</Button>
    </form>
  );
}
