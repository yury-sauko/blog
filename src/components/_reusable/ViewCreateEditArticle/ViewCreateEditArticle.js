import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import classNamesBind from 'classnames/bind';
import PropTypes from 'prop-types';
import { initializeEditedTagsArr } from '../../../store/articleData.slice';
import Button from '../../Button/Button';
import classes from './create-edit-article.module.scss';

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

export default function ViewCreateEditArticle({
  formName,
  formHeader,
  defValuesObj,
  tagsArr,
  onBtnAddClick,
  onBtnDelClick,
  onSubmit,
}) {
  const { defTitle, defDescr, defBody } = defValuesObj;
  const dispatch = useDispatch();
  const location = useLocation();

  const getDefTagsValuesObj = (thisTagsArr) =>
    thisTagsArr.reduce(
      (acc, el, idx) => ({ ...acc, [`tagInput_${el}-${idx}`]: thisTagsArr[idx] }),
      {},
    );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      titleInput: defTitle,
      descrInput: defDescr,
      bodyTextArea: defBody,
      tagInputs: getDefTagsValuesObj(tagsArr),
    },
  });

  const createTagEl = (el, idx) => {
    const tagInputName = `tagInput_${el}-${idx}`;
    return (
      <li key={tagInputName} className={classes['article-form__tag-wrapper']}>
        <div>
          <input
            type="text"
            autoComplete="off"
            placeholder="Tag"
            className={cnb('article-form__input', 'article-form__input--width-300')}
            {...register(`tagInputs.${tagInputName}`)}
          />
        </div>
        <button
          type="button"
          disabled={tagsArr.length === 1}
          name={el}
          className={classes['article-form__btn-del']}
          onClick={onBtnDelClick}
        >
          Delete
        </button>
      </li>
    );
  };

  useEffect(() => {
    if (location.pathname.slice(-4) === 'edit') {
      dispatch(initializeEditedTagsArr(tagsArr));
    }
  }, []);

  return (
    <form
      name={formName}
      className={classes['article-form']}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={classes['article-form__header']}>{formHeader}</h2>

      <label htmlFor="articleTitle" className={classes['article-form__label']}>
        <span className={classes['article-form__label-text']}>Title</span>
        <input
          type="text"
          autoComplete="off"
          placeholder="Title"
          id="articleTitle"
          className={cnb('article-form__input', {
            'article-form__input--validation-error': errors.titleInput,
          })}
          {...register('titleInput')}
        />
      </label>
      <p className={classes['article-form__validation-error-text']}>{errors.titleInput?.message}</p>

      <label htmlFor="articleShortDescr" className={classes['article-form__label']}>
        <span className={classes['article-form__label-text']}>Short description</span>
        <input
          type="text"
          autoComplete="off"
          placeholder="Short description"
          id="articleShortDescr"
          className={cnb('article-form__input', {
            'article-form__input--validation-error': errors.descrInput,
          })}
          {...register('descrInput')}
        />
      </label>
      <p className={classes['article-form__validation-error-text']}>{errors.descrInput?.message}</p>

      <label htmlFor="articleBody" className={classes['article-form__label']}>
        <span className={classes['article-form__label-text']}>Text</span>
        <textarea
          placeholder="Text"
          id="articleBody"
          className={cnb('article-form__input', 'article-form__body', {
            'article-form__input--validation-error': errors.bodyTextArea,
          })}
          {...register('bodyTextArea')}
        />
      </label>
      <p className={classes['article-form__validation-error-text']}>
        {errors.bodyTextArea?.message}
      </p>

      <div className={classes['article-form__tags-btns-wrapper']}>
        <ul className={classes['article-form__tags-list']}>
          {tagsArr.map((el, idx) => createTagEl(el, idx))}
        </ul>
        <button
          type="button"
          className={cnb('article-form__btn-del', 'article-form__btn-del--add')}
          onClick={onBtnAddClick}
        >
          Add tag
        </button>
      </div>

      <Button classMod="button--width-319">Create</Button>
    </form>
  );
}

ViewCreateEditArticle.propTypes = {
  formName: PropTypes.string.isRequired,
  formHeader: PropTypes.string.isRequired,
  defValuesObj: PropTypes.objectOf(PropTypes.string).isRequired,
  tagsArr: PropTypes.array.isRequired,
  onBtnAddClick: PropTypes.func.isRequired,
  onBtnDelClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
