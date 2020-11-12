// import { Resolver, Ctx, FieldResolver, Root } from "type-graphql";
// import LectureContentEntity from "@interface/entity/LectureContentEntity";
// import ResolverContext from "../../type/ResolverContext";

// @Resolver(() => LectureContentEntity)
// export class LectureContentResolver {
//     @FieldResolver(() => LectureContentEntity, { nullable: true })
//     async lecture_content(
//         @Ctx() ctx: ResolverContext,
//         @Root() lecture: LectureContentEntity
//     ): Promise<LectureContentEntity | undefined> {
//         const repository = ctx.db.getRepository(LectureContentEntity);
//         const [lecture_content] = await repository.find({
//             where: { content_no: lecture.content_no },
//         });
//         return lecture_content;
//     }
// }

// export default LectureMasterResolver;
