/** @format */
import service from './base';

export const getSortIdsAsync = () => {
    return service.post('sort/get');
};

export default {};
