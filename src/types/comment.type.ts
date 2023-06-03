import { Ref } from '@typegoose/typegoose';

import { RentEntity } from '@modules/rent/rent.entity';
import { UserEntity } from '@modules/user/user.entity';

export type Comment = {
  text: string;
  createdAt?: Date;
  rating: number;
  rentId: string;
  author: string;
};

export type CommentEntityType = Omit<Comment, 'rentId' | 'author'> & {
  rentId: Ref<RentEntity>;
  author: Ref<UserEntity>;
};
