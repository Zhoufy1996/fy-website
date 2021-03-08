/** @format */
import service from './base';

export const findSortIdsAsync = (name: string): Promise<number[]> => {
    return service.post('sort/find', { name });
};

export default {};
