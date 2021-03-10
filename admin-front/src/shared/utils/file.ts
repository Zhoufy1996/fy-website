/** @format */
import { saveAs } from 'file-saver';

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

interface SelectFileProps {
    accept?: string[];
    multiple?: boolean;
}

export const selectFile = ({ accept = [], multiple = false }: SelectFileProps): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        let inputEl = document.createElement('input');
        inputEl.type = 'file';
        const handleChange = () => {
            if (inputEl.files) {
                readTextFiles(inputEl.files)
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((e) => {
                        reject(e);
                    });
            } else {
                reject(new Error('请选择文件'));
            }
            inputEl = (null as unknown) as HTMLInputElement;
        };
        inputEl.onchange = handleChange;
        inputEl.accept = accept.join(',');
        inputEl.multiple = multiple;
        inputEl.click();
    });
};

interface ExportFileProps {
    fileContent?: string;
    type?: string;
    name: string;
    charset?: string;
}

export const exportFile = ({ fileContent = '', type = 'txt', name = '', charset = 'utf-8' }: ExportFileProps) => {
    const file = new File([fileContent], `${name}.${type}`, { type: `${type}/charset=${charset}` });
    saveAs(file);
};
