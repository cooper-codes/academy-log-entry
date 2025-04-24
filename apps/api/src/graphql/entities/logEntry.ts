import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class LogEntry {
    @PrimaryGeneratedColumn("uuid")
    @Field(() => ID)
    id!: string;

    @Column('text')
    @Field(() => String)
    name!: string;

    @Column('text')
    @Field(() => String)
    description!: string;

    @Column('text')
    @Field(() => String)
    date!: string;

    @Column('text')
    @Field(() => String)
    updatedAt!: string;

    @Column('text')
    @Field(() => String)
    location!: string;

    @Column('text')
    @Field(() => String)
    createdAt!: string;
}

@ObjectType()
export class LogEntryDeleteResponse {
    @Field(() => ID, { nullable: true })
    id?: string;
}