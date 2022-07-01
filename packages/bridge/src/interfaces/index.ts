export interface Bridge {
    /** 创建矩形 */
    createRectangle(count: number): Promise<boolean>;

    /** 改变按钮颜色 */
    changeButtonColor(color: string): void;
}
