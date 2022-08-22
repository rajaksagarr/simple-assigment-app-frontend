import { useParams } from 'react-router';
import PaginatedComponent from '../../common/paginated.component';
import { getPostsPagedUrl, PagedQueryInterface } from '../../config/urls.config';
import { PostInterface } from '../interfaces/posts.interface';
import PostCardComponent from './PostCard.component';

export default function ListPostComponent() {
  let { id } = useParams();

  return (
    <PaginatedComponent<PostInterface>
      apiFunction={(value: PagedQueryInterface) => {
        return getPostsPagedUrl({
          ...value,
          ...{
            userId: id ? +id : 0,
          }
        });
      }} uniqueKey={`user/posts${id}`} limit={10}>
      {(data) => {
        return (
          <div className='row'>
            {(data || []).map(post => (<div className='mt-1 mb-1 w-100 col-md-1 col-sm-1'>
              <PostCardComponent post={post} />
            </div>)
            )}
          </div>
        )
      }}
    </PaginatedComponent>
  )
}
