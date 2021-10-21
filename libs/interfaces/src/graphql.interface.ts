
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface Auth {
    access_token?: Nullable<string>;
    user?: Nullable<User>;
    role?: Nullable<Policy>;
}

export interface User {
    email?: Nullable<string>;
    id?: Nullable<string>;
    name?: Nullable<string>;
    role?: Nullable<Policy>;
}

export interface Policy {
    name?: Nullable<string>;
    id?: Nullable<string>;
    statement?: Nullable<JSONObject>;
}

export interface IQuery {
    signIn(email: string, password: string): Auth | Promise<Auth>;
    policy(id: string): Nullable<Policy> | Promise<Nullable<Policy>>;
    user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export type JSONObject = any;
type Nullable<T> = T | null;
