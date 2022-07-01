import {Bridge} from '@/interfaces';
import {createUiBridge} from '@/lib';

const ui = createUiBridge<Bridge>();

ui.createRectangle = async (count) => {
    const nodes: SceneNode[] = [];
    for (let i = 0; i < count; i++) {
        const rect = jsDesign.createRectangle();
        rect.x = i * 150;
        rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
        jsDesign.currentPage.appendChild(rect);
        nodes.push(rect);
    }
    jsDesign.currentPage.selection = nodes;
    jsDesign.viewport.scrollAndZoomIntoView(nodes);

    // 调用 ui 方法，随机改变一下按钮颜色
    const color =
        '#' +
        parseInt(
            (Math.random() * (0xffffff - 0x111111) + 0x111111).toString(),
        ).toString(16);
    ui.changeButtonColor(color);

    // 使用 return 将值直接传递给 ui
    return true;
};

jsDesign.showUI(
    `<script>window.location.href = "http://localhost:3910/"</script>`,
);
