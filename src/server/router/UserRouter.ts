import PhotoEntity from '@interface/entity/PhotoEntity';
import UserEntity from '@interface/entity/UserEntity';
import express, { Express, Router, Request, Response } from 'express';
import {
    EntityManager,
    Repository,
    Transaction,
    TransactionManager,
} from 'typeorm';

class UserRouter {
    private entry_point = '/users';
    private app: Express;
    private router: Router;
    private db_manager: EntityManager;
    private user_repository: Repository<UserEntity>;
    private photo_repository: Repository<PhotoEntity>;

    constructor(app: Express, db_manager: EntityManager) {
        this.app = app;
        this.router = Router();
        this.db_manager = db_manager;
        this.user_repository = db_manager.getRepository(UserEntity);
        this.photo_repository = db_manager.getRepository(PhotoEntity);
        this.defineRouteWithURL();
        this.mapRouterWithApp();
    }

    defineRouteWithURL() {
        this.router.get('/', this.getUsers.bind(this));
        this.router.get('/photos', this.getUsersWithPhoto.bind(this));
        this.router.get('/:id', this.getUsersById.bind(this));
        this.router.get('/:id/photos', this.getUserWithPhoto.bind(this));
        this.router.post('/', this.addUser.bind(this) as any);
        this.router.patch('/', this.updateUser.bind(this) as any);
        this.router.delete('/', this.deleteUser.bind(this));
    }
    //@GET
    async getUsers(req: Request, res: Response) {
        const user_list = await this.user_repository.find();
        res.status(200).json(user_list);
    }
    async getUsersWithPhoto(req: Request, res: Response) {
        const user = await this.user_repository.findOne({
            relations: ['photo'],
        });
        res.status(200).json(user);
    }
    async getUsersById(req: Request, res: Response) {
        const { id } = req.params;
        const user = await this.user_repository.findOne({ where: { id } });
        res.status(200).json(user);
    }
    async getUserWithPhoto(req: Request, res: Response) {
        const { id } = req.params;
        const user = await this.user_repository.findOne({
            relations: ['photo'],
            where: { id },
        });
        res.status(200).json(user);
    }
    //@POST
    @Transaction()
    async addUser(
        req: Request,
        res: Response,
        @TransactionManager() db: EntityManager
    ) {
        const transaction_user_repository = db.getRepository(UserEntity);
        const transaction_photo_repository = db.getRepository(PhotoEntity);

        const user_entity = UserEntity.of(req.body);
        const photo_entity = PhotoEntity.of(req.body.photo);

        const photo = await transaction_photo_repository.save(photo_entity);

        user_entity.photo_no = photo.photo_no;
        user_entity.photo = photo;
        const user = await transaction_user_repository.save(user_entity);

        res.status(200).json(user);
    }
    //@PATCH
    @Transaction()
    async updateUser(
        req: Request,
        res: Response,
        @TransactionManager() db: EntityManager
    ) {
        const transaction_user_repository = db.getRepository(UserEntity);
        const transaction_photo_repository = db.getRepository(PhotoEntity);

        const user_entity = UserEntity.of(req.body);
        const photo_entity = PhotoEntity.of(req.body.photo);

        const photo = await transaction_photo_repository.save(photo_entity);

        user_entity.photo_no = photo.photo_no;
        user_entity.photo = photo;
        const user = await transaction_user_repository.save(user_entity);

        res.status(200).json(user);
    }
    //@DELETE
    async deleteUser(req: Request, res: Response) {
        const user_entity = UserEntity.of(req.body);
        const user = await this.user_repository.remove(user_entity);
        res.status(200).json(user);
    }

    async mapRouterWithApp() {
        this.app.use(this.entry_point, this.router);
    }
}

export default UserRouter;

export { UserRouter };
