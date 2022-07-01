import manifest from '@/../plugin/manifest.json';
import {Bridge} from '@/interfaces';
import {createHostBridge} from '@/lib';
import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';

const host = createHostBridge<Bridge>(manifest.id);

function App() {
    const [color, setColor] = useState('#eee');

    async function createRectangle() {
        // 调用宿主方法
        const res = await host.createRectangle(1);
        alert(`函数调用返回结果为：${res}`);
    }

    useEffect(() => {
        host.changeButtonColor = (color: string) => {
            setColor(color);
        };
    }, []);

    return (
        <button style={{background: color}} onClick={createRectangle}>
            创建矩形
        </button>
    );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
