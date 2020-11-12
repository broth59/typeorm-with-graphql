// import { Resolver, Arg, Ctx, Query, Mutation } from 'type-graphql';
// import LectureEntity, { LectureInput } from '@interface/entity/LectureEntity';
// import LectureContentEntity, {
//     LectureContentInput,
// } from '@interface/entity/LectureContentEntity';
// import ResolverContext from '../../type/ResolverContext';
// import { Transaction, EntityManager, TransactionManager } from 'typeorm';

// @Resolver(() => LectureEntity)
// export class LectureResolver {
//     @Query(() => LectureEntity, { nullable: true })
//     async lecture(
//         @Ctx() ctx: ResolverContext,
//         @Arg('content_no', { nullable: false }) content_no: number
//     ): Promise<LectureEntity | undefined> {
//         const repository = ctx.db.getRepository(LectureEntity);
//         const [lecture] = await repository.find({
//             where: { content_no: content_no },
//         });
//         return lecture;
//     }

//     @Query(() => [LectureEntity], { nullable: 'items' })
//     async lectures(
//         @Ctx() ctx: ResolverContext,
//         @Arg('skip', { nullable: true, defaultValue: 0 }) skip: number,
//         @Arg('take', { nullable: true, defaultValue: 50 }) take: number
//     ): Promise<LectureEntity[] | undefined> {
//         const repository = ctx.db.getRepository(LectureEntity);

//         const skipped = skip * take;

//         return repository
//             .createQueryBuilder('lecture')
//             .where('ROWNUM > :skip AND ROWNUM <= :take', {
//                 skip: skipped,
//                 take,
//             })
//             .getMany();
//     }

//     @Query(() => [LectureEntity], { nullable: 'items' })
//     async lecturesHierarky(
//         @Ctx() ctx: ResolverContext,
//         @Arg('skip', { nullable: true, defaultValue: 0 }) skip: number,
//         @Arg('take', { nullable: true, defaultValue: 50 }) take: number
//     ): Promise<LectureEntity[] | undefined> {
//         const repository = ctx.db.getRepository(LectureEntity);
//         return repository
//             .createQueryBuilder('lecture')
//             .where('lecture.upper_content_no IS NULL')
//             .getMany();
//     }

//     @Query(() => LectureContentEntity, { nullable: true })
//     async lectureContent(
//         @Ctx() ctx: ResolverContext,
//         @Arg('content_no', { nullable: false }) content_no: number
//     ): Promise<LectureContentEntity | undefined> {
//         const repository = ctx.db.getRepository(LectureContentEntity);
//         const [lecutre_content] = await repository.find({
//             where: { content_no },
//         });
//         return lecutre_content;
//     }

//     @Transaction()
//     @Mutation(() => LectureEntity)
//     async addLecture(
//         @TransactionManager() manager: EntityManager,
//         @Ctx() ctx: ResolverContext,
//         @Arg('payload') lecture: LectureInput
//     ): Promise<LectureEntity> {
//         const lecutre_repository = manager.getRepository(LectureEntity);
//         const lecutre_content_repository = manager.getRepository(
//             LectureContentEntity
//         );

//         const new_lecture = LectureEntity.of(lecture);
//         await setLectureContentAndSave(new_lecture);

//         return new_lecture;

//         async function setLectureContentAndSave(new_lecture: LectureEntity) {
//             const max_content_no = await getMaxContentNo();
//             new_lecture.content_no = max_content_no;
//             const lecture_content = new LectureContentEntity({
//                 content_no: new_lecture,
//                 contents: '내용을 적어주세요',
//             });
//             new_lecture.lecture_content = lecture_content;
//             await lecutre_repository.save(new_lecture);
//             await lecutre_content_repository.save(lecture_content);
//             return new_lecture;
//         }

//         async function getMaxContentNo(): Promise<number> {
//             const [chunk] = await lecutre_repository.query(
//                 `SELECT NVL(MAX(CONTENT_NO),0)+1 AS CONTENT_NO FROM TB_LECTURE_MASTER`
//             );
//             return chunk.CONTENT_NO;
//         }
//     }

//     @Transaction()
//     @Mutation(() => LectureEntity)
//     async updateLecture(
//         @TransactionManager() manager: EntityManager,
//         @Ctx() ctx: ResolverContext,
//         @Arg('content_no', { nullable: false }) content_no: number,
//         @Arg('payload') lecture: LectureInput
//     ): Promise<LectureEntity> {
//         const lecutre_repository = manager.getRepository(LectureEntity);

//         const prev_lecture = LectureEntity.of({
//             content_no,
//             ...lecture,
//         });

//         return lecutre_repository.save(prev_lecture);
//     }

//     @Transaction()
//     @Mutation(() => Boolean)
//     async deleteLecture(
//         @TransactionManager() manager: EntityManager,
//         @Ctx() ctx: ResolverContext,
//         @Arg('content_no', { nullable: false }) content_no: number
//     ): Promise<boolean> {
//         const lecutre_repository = manager.getRepository(LectureEntity);

//         const prev_lecture = LectureEntity.of({
//             content_no,
//         });
//         const prev_lecture_content = LectureContentEntity.of({
//             content_no: prev_lecture,
//         });
//         prev_lecture.lecture_content = prev_lecture_content;

//         return !!(await lecutre_repository.remove(prev_lecture));
//     }

//     @Transaction()
//     @Mutation(() => LectureContentEntity)
//     async updateLectureContent(
//         @TransactionManager() manager: EntityManager,
//         @Ctx() ctx: ResolverContext,
//         @Arg('content_no', { nullable: false }) content_no: number,
//         @Arg('payload') lecture: LectureContentInput
//     ): Promise<LectureContentEntity> {
//         const lecutre_repository = manager.getRepository(LectureContentEntity);

//         const prev_lecture = LectureContentEntity.of({
//             content_no: LectureEntity.of({ content_no }),
//             ...lecture,
//         });

//         return lecutre_repository.save(prev_lecture);
//     }
// }

// export default LectureResolver;
