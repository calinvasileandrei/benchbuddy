// hook

export interface useRealmListParams<T> {
    schema: any;
    keyExtractorKey: keyof T;
}

export interface useRealmListReturn<T> {
    data: Realm.Results<T & Realm.Object<unknown, never>>;
    keyExtractor: (item: T) => string;
}

// component

export interface RealmListProps<T> {
    realmHookParams: useRealmListReturn<T>;
    renderItem: (item: any) => any;

    emptyList?: {
        message?: string;
        image?: any;
        imageStyle?: {
            width: number;
            height: number;
        };
    };
}
