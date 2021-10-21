import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

process.on('unhandledRejection', (err) => {
  console.error('[Generate graphql typings] Unhandled rejection:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('[Generate graphql typings] Uncaught rejection:', err);
  console.error(err.stack);
  process.exit(1);
});

const GRAPHQL_TYPINGS_PATH = 'libs/interfaces/src/graphql.interface.ts';

const args: string[] = process.argv;

const watch: boolean = args[2] === '--watch';

const definitionsFactory: GraphQLDefinitionsFactory =
  new GraphQLDefinitionsFactory();

definitionsFactory.generate({
  typePaths: ['apps/**/*/*.graphql', 'libs/**/*/*.graphql'],
  path: join(process.cwd(), GRAPHQL_TYPINGS_PATH),
  watch,
  federation: true,
});
