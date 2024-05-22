import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import classNamesBind from 'classnames/bind';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
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
    tagsArr: yup.array().of(
      yup.object().shape({
        tagInput: yup
          .string()
          .trim('No leading and trailing spaces')
          .strict()
          .min(1, 'Tag needs to be at least 1 character'),
      }),
    ),
  })
  .required();

export default function ViewCreateEditArticle({
  formName,
  formHeader,
  defValuesObj,
  defTagsArr,
  onSubmit,
}) {
  const { defTitle, defDescr, defBody } = defValuesObj;

  const {
    control,
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
      tagsArr: defTagsArr,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagsArr',
  });

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
          {fields.map((item, index) => (
            <li key={item.id} className={classes['article-form__tag-wrapper']}>
              <input
                type="text"
                autoComplete="off"
                placeholder="Tag"
                className={cnb('article-form__input', 'article-form__input--width-300')}
                {...register(`tagsArr.${index}.tagInput`)}
              />
              <button
                type="button"
                disabled={fields.length === 1}
                className={classes['article-form__btn-del']}
                onClick={() => remove(index)}
              >
                Delete
              </button>
              <p className={classes['article-form__validation-error-text']}>
                {errors.tagsArr?.[index]?.tagInput?.message}
              </p>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={cnb('article-form__btn-del', 'article-form__btn-del--add')}
          onClick={() => append({ tagInput: '' })}
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
  defTagsArr: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  onSubmit: PropTypes.func.isRequired,
};
