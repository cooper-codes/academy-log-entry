import { Field, InputType } from "type-graphql";

@InputType()
export class CreateLogEntryInput {
    @Field(() => String)
    name!: string;

    @Field(() => String)
    description!: string;

    @Field(() => String)
    location!: string;

    @Field(() => String)
    date!: string;
}

@InputType()
export class UpdateLogEntryInput {
    @Field(() => String)
    name!: string;

    @Field(() => String)
    id!: string;
}
