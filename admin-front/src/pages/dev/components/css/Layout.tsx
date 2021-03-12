/** @format */
import React from 'react';

// 两栏布局
// 三栏布局
const LayoutDemo = () => {
    return (
        <div>
            <div style={{ display: 'flex', height: 500 }}>
                <div style={{ flexBasis: 200, flexGrow: 0, flexShrink: 0, backgroundColor: 'yellow' }}>left</div>
                <div style={{ flexGrow: 1, flexShrink: 1, backgroundColor: 'blue' }}>right</div>
            </div>

            <div style={{ display: 'flex', height: 500 }}>
                <div style={{ flexBasis: 200, flexGrow: 0, flexShrink: 0, backgroundColor: 'yellow' }}>left</div>
                <div style={{ flexGrow: 1, flexShrink: 1, backgroundColor: 'blue' }}>middle</div>
                <div style={{ flexBasis: 200, flexGrow: 0, flexShrink: 0, backgroundColor: 'green' }}>right</div>
            </div>
        </div>
    );
};

export default LayoutDemo;
