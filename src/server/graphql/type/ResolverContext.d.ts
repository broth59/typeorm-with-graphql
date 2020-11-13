import { Request, Response } from 'express';
import { Repository, EntityManager, EntityTarget } from 'typeorm';

type DbContext = {
    manager: EntityManager;
    getRepository<Entity>(target: EntityTarget<Entity>): Repository<Entity>;
};

type ResolverContext = {
    db: DbContext;
};

export default ResolverContext;

export { ResolverContext };
