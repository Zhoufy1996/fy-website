/** @format */

const readFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target?.result) {
                resolve(event.target.result as string);
            } else {
                reject(new Error(`${file.name}文件无内容`));
            }
        };
        reader.onerror = () => {
            reject(new Error(`${file.name}文件读取失败`));
        };
        reader.onabort = () => {
            reject(new Error(`${file.name}文件读取被中断`));
        };
        reader.readAsText(file);
    });
};

// eslint-disable-next-line import/prefer-default-export
export const readTextFiles = (files: FileList): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        Promise.all([
            ...Array.from(files).map((file) => {
                return readFile(file);
            }),
        ])
            .then((res) => {
                resolve(res);
            })
            .catch((e) => {
                reject(e);
            });
    });
};
