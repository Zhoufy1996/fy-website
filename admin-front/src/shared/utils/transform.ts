/** @format */

interface Result<T> {
    [key: string]: T;
}

interface Data {
    id: number;
}

export const transformArrToObj = <T extends Data>(arr: T[]): Result<T> => {
    const result: Result<T> = {};
    arr.forEach((item) => {
        result[item.id] = item;
    });
    return result;
};

export default {};
