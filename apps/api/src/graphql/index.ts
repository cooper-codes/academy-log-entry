import { buildSchema } from "type-graphql";
import resolvers from "./resolvers";
import Container from "typedi";

const getSchema = async () => buildSchema({
    resolvers,
    validate: true,
    nullableByDefault: false,
    container: Container,
    emitSchemaFile: __dirname + '/schema.gql'
});

export default getSchema