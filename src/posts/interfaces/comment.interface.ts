import { UserInterface } from "../../users/interfaces/user.interface";

export interface CommentInterface {
     comment: string;
     commenter: UserInterface;
     commenterId: number;
     postId: number;
     id: number;
     createdAt?: Date;
     updatedAt?: Date;
}