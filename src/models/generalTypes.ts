export type FilterOperators =
    | 'BETWEEN'
    | 'IN'
    | 'CONTAINS[c]'
    | 'CONTAINS'
    | 'BEGINSWITH'
    | 'ENDSWITH'
    | 'LIKE'
    | '='
    | '==';

export interface FilterObject {
    field: string;
    operator: FilterOperators;
    value: (string | number)[];
}
