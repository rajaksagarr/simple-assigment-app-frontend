import { useMutation } from '@tanstack/react-query';
import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { postComment } from '../../common/apiCalls/posts';
import ButtonLoader from '../../common/buttonLoader.component';
import { Helper } from '../../common/helper';
import PaginatedComponent, { PageComponentParams } from '../../common/paginated.component';
import { getCommentsPagedUrl, PagedQueryInterface } from '../../config/urls.config';
import { CommentInterface } from '../interfaces/comment.interface';
import './Comment.scss';

export interface Props {
    open: boolean;
    userId: number;
    postId: number;
}

const CommentsComponent: React.FC<Props> = (props: Props) => {
    const { open, userId, postId } = props;

    const { register, handleSubmit, formState: { errors } } = useForm<{ comment: string }>();
    const pageComponentParams = useRef<PageComponentParams>();

    const { isLoading, mutate } = useMutation<unknown, { message: string }, Omit<CommentInterface, 'id' | 'commenter'>>(postComment, {
        onSuccess: () => {
            toast.success("Comment added successfully");
            pageComponentParams.current?.refresh();
        },
        onError: (error: any) => {
            toast.error(Helper.getErrorMessage(error.message, "unbale to add comment !"));
        }
    });

    const onSubmit = (fields: {comment: string}) => {
        mutate({
            ...fields,
            ...{
                postId,
                commenterId: 1,
            }
        });
    }

    if (!open)
        return <></>
    return <>
        <Form>
            <Form.Group className='mt-3'>
                <Form.Label>Add comment</Form.Label>
                <Form.Control type="text" placeholder="Comment ..." as="textarea" {...register('comment', { required: true })} isValid={!!errors.comment} />
                {errors.comment && <Form.Control.Feedback type="invalid">
                    {errors.comment.message}
                </Form.Control.Feedback>}
            </Form.Group>
            <Button variant="primary" type="submit" className='mt-4' onClick={handleSubmit(onSubmit)} disabled={isLoading}>
                Submit
                {isLoading && <ButtonLoader></ButtonLoader>}
            </Button>
        </Form>
        <div id="example-collapse-text" className='mt-4 comment-container' >
            <PaginatedComponent<CommentInterface>
                apiFunction={(value: PagedQueryInterface) => {
                    return getCommentsPagedUrl({
                        ...value,
                        ...{
                            postId
                        }
                    });
                }} uniqueKey={`user/comment/${postId}`} limit={3}
            >
                {(data, params) => {
                    pageComponentParams.current = params;
                    return (
                        <div className='row'>
                            {(data || []).map(post => (<div className='mt-1 mb-1 w-100 col-md-1 col-sm-1' key={post.id}>
                                {/* <b><h4>{post.commenter.name}</h4></b> */}
                                <p className='comment-container__header'>{post.comment}
                                { !!post.createdAt && <span className='comment-container__date'>{new Date(post.createdAt).toLocaleDateString()}</span> }
                                </p>
                                
                            </div>)
                            )}
                        </div>
                    )
                }}
            </PaginatedComponent>
        </div>
    </>
}

export default CommentsComponent;