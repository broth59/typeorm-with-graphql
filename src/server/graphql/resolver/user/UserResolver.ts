import { Resolver, Arg, Ctx, Query, Mutation } from 'type-graphql';
import ResolverContext from '../../type/ResolverContext';
import UserEntity, { UserInput } from '@interface/entity/UserEntity';

@Resolver(() => UserEntity)
export class UserResolver {
    @Query(() => UserEntity, { nullable: false })
    async user(
        @Ctx() ctx: ResolverContext,
        @Arg('email', { nullable: true }) email: string
    ): Promise<UserEntity | undefined> {
        const repository = ctx.db.getRepository(UserEntity);
        const [user] = await repository.find({ where: { email } });
        return user;
    }

    @Mutation(() => UserEntity, { nullable: true })
    async login(
        @Ctx() ctx: ResolverContext,
        @Arg('payload', { nullable: false }) payload: UserInput
    ): Promise<UserEntity | undefined> {
        const repository = ctx.db.getRepository(UserEntity);
        const new_user = UserEntity.of(payload);
        return repository.save(new_user);
    }
}

export default UserEntity;
