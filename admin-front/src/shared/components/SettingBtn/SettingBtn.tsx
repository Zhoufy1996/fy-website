/** @format */

import { SettingOutlined } from '@ant-design/icons';
import { Dropdown, DropDownProps } from 'antd';

interface SettingBtnProps {
    overlay: DropDownProps['overlay'];
}

const SettingBtn: React.FC<SettingBtnProps> = ({ overlay }) => {
    return (
        <Dropdown overlay={overlay}>
            <SettingOutlined
                style={{ position: 'absolute', right: 10, top: -5, fontSize: 24, cursor: 'pointer' }}
                className="transparency"
            />
        </Dropdown>
    );
};

export default SettingBtn;
