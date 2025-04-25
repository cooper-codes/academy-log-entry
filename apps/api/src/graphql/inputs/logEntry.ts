import { IsDateString, IsNotEmpty, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class LogEntryInput {
    @IsString()
    @IsNotEmpty()
    @Field(() => String)
    name!: string;

    @IsString()
    @IsNotEmpty()
    @Field(() => String)
    description!: string;

    @IsString()
    @IsNotEmpty()
    @Field(() => String)
    location!: string;

    @IsDateString({ strict: false })
    @IsNotEmpty()
    @Field(() => String)
    date!: string;
}
