import { GraphQLFieldMap, GraphQLSchema, defaultFieldResolver } from 'graphql';
import {
  MapperKind,
  SchemaMapper,
  getDirective,
  mapSchema,
} from '@graphql-tools/utils';

export function authDirectiveTransformer(
  schema: GraphQLSchema,
  directiveName = 'auth',
): GraphQLSchema {
  console.info('::: authDirectiveTransformer :::');

  const schemaMapper: SchemaMapper = {};
  const locationsSupported: MapperKind[] = [
    MapperKind.OBJECT_TYPE,
    MapperKind.OBJECT_FIELD,
  ];

  for (const location of locationsSupported) {
    schemaMapper[location] = (locationConfig) => {
      const authDirective: Record<string, any> = getDirective(
        schema,
        locationConfig,
        directiveName,
      )?.[0];

      if (authDirective) {
        const allowedRoles: string[] = authDirective.roles;

        if (location === MapperKind.OBJECT_TYPE) {
          const fields: GraphQLFieldMap<any, any> = locationConfig.getFields();

          Object.keys(fields).forEach((fieldName) => {
            const field: any = fields[fieldName];
            resolveFieldForAuth(field, allowedRoles);
          });
        } else {
          resolveFieldForAuth(locationConfig, allowedRoles);
        }

        return locationConfig;
      }
    };
  }

  return mapSchema(schema, schemaMapper);
}

function resolveFieldForAuth(
  locationConfig: any,
  allowedRoles: string[],
): void {
  // Get this field's original resolver
  const { resolve = defaultFieldResolver } = locationConfig;

  // Replace the original resolver with a function that *first* calls
  // the original resolver, then converts its result to upper case
  locationConfig.resolve = function (source, args, context, info) {
    if (
      !context?.req?.user ||
      !allowedRoles.includes(context?.req?.user?.role?.name)
    )
      return null;

    return resolve(source, args, context, info);
  };
}
