function schemaToObject<T, I>(data: Realm.Results<any> | undefined): I[] {
    const dataObjects = data?.map(x => x.toJSON() as I)
    return dataObjects || []
}

export const realmMapper = {
    schemaToObject
}
