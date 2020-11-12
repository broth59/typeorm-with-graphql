// import { Resolver, Ctx, FieldResolver, Root } from 'type-graphql';
// import LectureEntity from '@interface/entity/LectureEntity';
// import LectureContentEntity from '@interface/entity/LectureContentEntity';
// import ResolverContext from '@server/graphql/type/ResolverContext';

// @Resolver(() => LectureEntity)
// export class LectureMasterResolver {
//     @FieldResolver(() => LectureContentEntity, { nullable: true })
//     async lecture_content(
//         @Ctx() ctx: ResolverContext,
//         @Root() lecture: LectureEntity
//     ): Promise<LectureContentEntity | undefined> {
//         const repository = ctx.db.getRepository(LectureContentEntity);
//         const [lecture_content] = await repository.find({
//             where: { content_no: lecture.content_no },
//         });
//         return lecture_content;
//     }

//     @FieldResolver(() => LectureEntity, { nullable: true })
//     async upper_lecture(
//         @Ctx() ctx: ResolverContext,
//         @Root() lecture: LectureEntity
//     ): Promise<LectureEntity | undefined> {
//         const repository = ctx.db.getRepository(LectureEntity);
//         const [lecture_content] = await repository.find({
//             where: { content_no: lecture.upper_content_no },
//         });
//         return lecture_content;
//     }

//     @FieldResolver(() => [LectureEntity], { nullable: true })
//     async child_lectures(
//         @Ctx() ctx: ResolverContext,
//         @Root() lecture: LectureEntity
//     ): Promise<LectureEntity[] | undefined> {
//         const repository = ctx.db.getRepository(LectureEntity);
//         const child_lectures = await repository.find({
//             where: { upper_content_no: lecture.content_no },
//         });
//         return child_lectures;
//     }
// }

// export default LectureMasterResolver;
