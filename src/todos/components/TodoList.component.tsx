import React from 'react';
import { useParams } from 'react-router';
import PaginatedComponent from '../../common/paginated.component';
import { getTodosPagedUrl, PagedQueryInterface } from '../../config/urls.config';
import { TodoInterface } from '../interfaces/todo.interface';
import TodoCardComponent from './TodoCard.component';

const TodoListComponent: React.FC = () => {
    let { id } = useParams();
    return (
        <PaginatedComponent<TodoInterface>
            apiFunction={(value: PagedQueryInterface) => {
                return getTodosPagedUrl({ ...value, userId: id ? +id : 0 });
            }
            } uniqueKey={`user/todos/${id}`} limit={10}
        >
            {(data) => (
                <div className='row'>
                    {(data || []).map(todo =>
                    (<div className='mt-1 mb-1 w-100 col-md-1 col-sm-1'>
                        <TodoCardComponent todo={todo} />
                    </div>)
                    )}
                </div>
            )}
        </PaginatedComponent>
    )
}

export default TodoListComponent;
