import { Entity, Column, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import UserEntity from '@interface/entity/UserEntity';

@Entity('TB_PHOTO')
@ObjectType()
export default class PhotoEntity {
    @PrimaryGeneratedColumn({ name: 'PHOTO_NO' })
    @Field(() => Number)
    photo_no?: number;

    @Column({ name: 'IMAGE_PATH' })
    @Field(() => String)
    image_path?: string;

    @OneToOne(() => UserEntity)
    @Field(() => UserEntity)
    user?: UserEntity;

    constructor(data?: PhotoEntity) {
        if (data) {
            this.photo_no = data.photo_no;
            this.image_path = data.image_path;
            this.user = data.user;
        }
    }

    static of<T extends PhotoEntity & { [index: string]: any }>(
        photo_entity?: T
    ) {
        return new PhotoEntity(photo_entity);
    }
}

export { PhotoEntity };
