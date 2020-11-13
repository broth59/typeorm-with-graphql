import { Resolver, Ctx, Query, Arg, Mutation } from 'type-graphql';
import ResolverContext from '../../type/ResolverContext';
import UserEntity from '@interface/entity/UserEntity';
import PhotoEntity from '@interface/entity/PhotoEntity';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';

@Resolver()
export class UserResolver {
    @Query(() => UserEntity)
    async user(
        @Ctx() ctx: ResolverContext,
        @Arg('id') id: string
    ): Promise<UserEntity | undefined> {
        const user_repository = ctx.db.getRepository(UserEntity);
        return user_repository.findOne({ where: { id } });
    }

    @Query(() => [UserEntity])
    async users(
        @Ctx() ctx: ResolverContext
    ): Promise<UserEntity[] | undefined> {
        const user_repository = ctx.db.getRepository(UserEntity);
        return user_repository.find();
    }

    @Transaction()
    @Mutation(() => UserEntity)
    async addUser(
        @TransactionManager() db: EntityManager,
        @Ctx() ctx: ResolverContext,
        @Arg('id') id: string,
        @Arg('email') email: string,
        @Arg('image_path') image_path: string
    ): Promise<UserEntity | undefined> {
        const transaction_user_repository = db.getRepository(UserEntity);
        const transaction_photo_repository = db.getRepository(PhotoEntity);

        const user_entity = UserEntity.of({ id, email });
        const photo_entity = PhotoEntity.of({ image_path });

        const photo = await transaction_photo_repository.save(photo_entity);

        user_entity.photo_no = photo.photo_no;
        user_entity.photo = photo;
        const user = await transaction_user_repository.save(user_entity);

        return user;
    }
}

export default UserEntity;
