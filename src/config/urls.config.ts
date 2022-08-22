export interface PagedQueryInterface {
    page: number;
    limit: number;
    [key: string]: string | number;
}

export interface PostsPagedQueryInterface extends PagedQueryInterface {
    userId: number;
}

export interface TodosPagesQueryInterface extends PagedQueryInterface {
    userId: number;
}

export interface CommentPagesQueryInterface extends PagedQueryInterface {
    postId: number;
}

const getQueryString = <T extends Record<string, number | string>>(obj: T): string => {
    const uri = new URLSearchParams();
    for (const key in obj) {
        uri.append(encodeURIComponent(key), encodeURIComponent(obj[key]));
    }
    return uri.toString();
}

export const baseUrl = process.env.REACT_APP_ROOT_URL;
export const addPostUrl = () => `${baseUrl}/post`
export const addCommentUrl = () => `${baseUrl}/comment`
export const getPostsPagedUrl = (query: PostsPagedQueryInterface) => `${baseUrl}/post/paged?${getQueryString<PostsPagedQueryInterface>(query)}`;
export const getTodosPagedUrl = (query: TodosPagesQueryInterface) => `${baseUrl}/todo/paged?${getQueryString<TodosPagesQueryInterface>(query)}`;
export const getCommentsPagedUrl = (query: CommentPagesQueryInterface) => `${baseUrl}/comment/paged?${getQueryString<CommentPagesQueryInterface>(query)}`;
export const addTodoUrl = () => `${baseUrl}/todo`;
export const addUserUrl = () => `${baseUrl}/user`;
export const updateUserUrl = () => `${baseUrl}/user`;
export const getUserPagedUrl = (query: PagedQueryInterface) => `${baseUrl}/user/paged?${getQueryString<PagedQueryInterface>(query)}`;