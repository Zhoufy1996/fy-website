/** @format */
export const range = (begin: number, end: number) => {
    const result: number[] = [];

    for (let i = begin; i < end; i += 1) {
        result.push(i);
    }

    return result;
};

export default {};
