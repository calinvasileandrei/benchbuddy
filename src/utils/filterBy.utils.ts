import {FilterObject} from 'src/models/generalTypes';

type operatorFilterObject = 'OR' | 'AND';

const applyFilterObjects = (
    filterBy: FilterObject[],
    operatorFilterObject: operatorFilterObject,
): string[] => {
    let returnQuery: string[] = [];

    filterBy.map(item => {
        if (item.value.length > 0) {
            let query = '';
            for (let value of item.value) {
                if (query.length > 0) {
                    query += ` ${operatorFilterObject} `;
                }
                if (item.operator === 'BETWEEN') {
                    query += `${item.field} ${item.operator} ${value}`;
                } else {
                    query += `${item.field} ${item.operator} "${value}"`;
                }
            }
            returnQuery.push(query);
        }
    });

    return returnQuery;
};

export const filterByUtils = {
    applyFilterObjects,
};
