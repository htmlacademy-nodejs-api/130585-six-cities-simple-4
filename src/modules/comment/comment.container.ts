import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { CommentServiceInterface } from '@modules/comment/comment.service.interface.js';
import { ControllerInterface } from '@core/controller/controller.interface.js';
import { CommentEntity, CommentModel } from '@modules/comment/comment.entity.js';
import CommentService from '@modules/comment/comment.service.js';
import CommentController from '@modules/comment/comment.controller.js';
import { AppComponent } from '@appTypes/app-component.enum.js';

export function createCommentContainer () {
  const container = new Container();

  container.bind<CommentServiceInterface>(AppComponent.CommentServiceInterface).to(CommentService).inSingletonScope();
  container.bind<types.ModelType<CommentEntity>>(AppComponent.CommentModel).toConstantValue(CommentModel);
  container.bind<ControllerInterface>(AppComponent.CommentController).to(CommentController).inSingletonScope();

  return container;
}
