import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, InputType } from 'type-graphql';
import PhotoEntity from '@interface/entity/PhotoEntity';

@Entity({ name: 'TB_USER' })
@ObjectType()
export default class UserEntity {
    @PrimaryColumn({ name: 'ID' })
    @Field(() => String)
    id?: string;

    @Column({ name: 'EMAIL' })
    @Field(() => String)
    email?: string;

    @Column({ name: 'PHOTO_NO' })
    @Field(() => Number)
    photo_no?: number;

    @OneToOne(() => PhotoEntity, (photo) => photo.user, {
        cascade: true,
        onDelete: 'SET NULL',
    })
    @JoinColumn()
    @Field(() => PhotoEntity)
    photo?: PhotoEntity;

    constructor(data?: UserEntity) {
        if (data) {
            this.id = data.id;
            this.email = data.email;
            this.photo_no = data.photo_no;
        }
    }

    static of<T extends UserEntity & { [index: string]: any }>(
        user_entitiy: T
    ) {
        return new UserEntity(user_entitiy);
    }
}

export { UserEntity };
