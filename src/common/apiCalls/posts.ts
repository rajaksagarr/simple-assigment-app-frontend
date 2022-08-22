import { addCommentUrl, addPostUrl } from "../../config/urls.config";
import { CommentInterface } from "../../posts/interfaces/comment.interface";
import { PostInterface } from "../../posts/interfaces/posts.interface";

const createPost = async (form: Omit<PostInterface, 'id'>) => {
    const responseRaw = await fetch(addPostUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
    const response = await responseRaw.json();
    if (response.ok)
      return Promise.resolve(response);
    return Promise.reject(response);
  }
  
const postComment = async (form : Omit<CommentInterface, 'id' | 'commenter'>) => {
  const responseRaw = await fetch(addCommentUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
  const response = await responseRaw.json();
  if (response.ok)
    return Promise.resolve(response);
  return Promise.reject(response);
}

  export {
      createPost,
      postComment
  }