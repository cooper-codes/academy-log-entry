import { Field, InputType } from "type-graphql";

@InputType()
export class LogEntryInput {
    @Field(() => String)
    name!: string;

    @Field(() => String)
    description!: string;

    @Field(() => String)
    location!: string;

    @Field(() => String)
    date!: string;
}
