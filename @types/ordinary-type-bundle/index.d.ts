declare type AnyFunction = (...args: any[]) => any;
declare type AnyClass = { new (...args: any[]): any };

declare type MethodKeys<T> = {
    [P in keyof T]: T[P] extends AnyFunction ? P : never;
}[keyof T];
declare type Methods<T> = Pick<T, MethodKeys<T>>;
declare type PartialMethods<T> = Partial<Methods<T>>;

declare type Nullable<T> = { [K in keyof T]?: T[K] } & { [index: string]: any };
