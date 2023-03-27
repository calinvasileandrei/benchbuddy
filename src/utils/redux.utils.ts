// Action name utils
type ActionTypeMap<T extends string> = { [key in T]: string };
export const createActionTypesMap = <T extends string>(
    prefix: string,
    types: T[]
): ActionTypeMap<T> =>
    types.reduce(
        (obj, key) => ({
            ...obj,
            [key]: `${prefix}${key}`,
        }),
        {} as ActionTypeMap<T>
    );
