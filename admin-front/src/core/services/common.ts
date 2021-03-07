/** @format */
import service from './base';

export const getSortIdsAsync = (name: string): Promise<number[]> => {
    return service.post('sort/find', { name });
};

export default {};
