import PaginatedComponent from '../../common/paginated.component';
import { getUserPagedUrl, PagedQueryInterface } from '../../config/urls.config';
import { UserInterface } from '../interfaces/user.interface';
import AddUserCardComponent from './AddUserCardComponent';
import UserCardComponent from './UserCard.component';

const UserListComponent: React.FC = () => {
  return (
    <PaginatedComponent<UserInterface>
      apiFunction={(value: PagedQueryInterface) => {
        return getUserPagedUrl(value);
      }
      } uniqueKey={'user/pages'} limit={10}
    >
      {(data) => (
        <div className='row'>
          {(data || []).map(user =>
          (<div className='mt-2 mb-2 col-lg-3 col-md-4 col-sm-6' key={user.id} >
            <UserCardComponent user={user} />
          </div>)
          )}
          <div className='mt-2 mb-2 col-lg-3 col-md-4 col-sm-6'>
            <AddUserCardComponent />
          </div>
        </div>
      )}
    </PaginatedComponent>
  );
}

export default UserListComponent;
