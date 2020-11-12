import {Resolver, Arg, Ctx, Query} from "type-graphql";
// import bcrypt from "bcryptjs";
import UserEntity from "@interface/entity/UserEntity";
import ResolverContext from "../type/ResolverContext";

@Resolver()
export class UserResolver{
	
	@Query(() => UserEntity)
    async user(
		@Ctx() ctx: ResolverContext, 
		@Arg('id') id:string
	): Promise<UserEntity | undefined> {
		const repository = ctx.db.getRepository(UserEntity)
		return repository.findOne(id)
	}
	
}
