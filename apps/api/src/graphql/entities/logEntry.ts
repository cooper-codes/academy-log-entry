import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/**
 * This is a shared entity that represents both the GraphQL (ObjectType) and database definition (Entity) of a log entry.
 * @Fields() define the GraphQL schema for the log entry.
 * @Column() define the database schema for the log entry.
 * For more complex definitions, consider using a separate class for the database entity.
 */
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