import { Request, Response } from 'express'
import { Repository, EntityManager, EntityTarget } from 'typeorm'

type DbContext = {
	manager: EntityManager,
	getRepository<Entity>(target: EntityTarget<Entity>): Repository<Entity>;
}

type ResolverContext = {
	req:Request, 
	res:Response,
	db: DbContext
}

export default ResolverContext 

export { ResolverContext }