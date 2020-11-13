import { Resolver, Ctx, FieldResolver, Root } from 'type-graphql';
import ResolverContext from '../../type/ResolverContext';
import UserEntity from '@interface/entity/UserEntity';
import PhotoEntity from '@interface/entity/PhotoEntity';

@Resolver(() => UserEntity)
export class UserFieldResolver {
    @FieldResolver()
    async photo(
        @Root() user: UserEntity,
        @Ctx() ctx: ResolverContext
    ): Promise<PhotoEntity | undefined> {
        const photo_repository = ctx.db.getRepository(PhotoEntity);
        return photo_repository.findOne({ photo_no: user.photo_no });
    }
}

export default UserFieldResolver;
