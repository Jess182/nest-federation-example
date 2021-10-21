
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface Policy {
    id?: Nullable<string>;
    name?: Nullable<string>;
    statement?: Nullable<JSONObject>;
}

export interface User {
    id?: Nullable<string>;
    name?: Nullable<string>;
    email?: Nullable<string>;
    role?: Nullable<Policy>;
}

export interface IQuery {
    policy(id: string): Nullable<Policy> | Promise<Nullable<Policy>>;
    user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export type JSONObject = any;
type Nullable<T> = T | null;
