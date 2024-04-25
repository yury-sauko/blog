import { useSelector, useDispatch } from 'react-redux';
import { ConfigProvider, Pagination } from 'antd';
import { changePage } from '../../store/startPage.slice';
import classes from './blog-pagination.module.scss';

export default function BlogPagination() {
  const { statusArticlesReceipt, currentPage, articlesCount } = useSelector(
    (state) => state.startPage,
  );
  const dispatch = useDispatch();
  const pagination = (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#fff',
          colorPrimaryHover: '#ccc',
          colorBgTextHover: '#c0c0c0',
          fontWeightStrong: 400,
          lineType: 'none',
          lineWidthFocus: 2,
        },
        components: {
          Pagination: {
            itemActiveBg: '#1890ff',
          },
        },
      }}
    >
      <Pagination
        className={classes['blog-pagination']}
        defaultCurrent={currentPage}
        defaultPageSize={5}
        showSizeChanger={false}
        size="small"
        total={articlesCount}
        onChange={(page) => dispatch(changePage(page))}
      />
    </ConfigProvider>
  );

  return statusArticlesReceipt !== 'resolved' ? null : pagination;
}
