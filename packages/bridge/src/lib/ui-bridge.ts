import {MessageType, RequestMessage, ResponseMessage} from '@/lib/interfaces';
import {uuid} from '@/lib/utils';

const methods = {} as Record<string, unknown>;
let ui: unknown = undefined;
const request_promises = {} as Record<
    string,
    {resolve: (value: unknown) => unknown}
>; // 存储的是 {request_id: {resolve}}

/**
 * 宿主与iframe桥接工具
 */
export function createUiBridge<T extends object>() {
    if (!ui) {
        listen();
        ui = new Proxy<T>({} as T, {
            set(target: T, property: string, value: unknown): boolean {
                methods[property] = value;
                return true;
            },

            get(target: T, property: string): unknown {
                return function (...args: unknown[]) {
                    const request_id = uuid();
                    sendMessage({
                        method: property,
                        args: args,
                        request_id,
                        type: MessageType.request,
                    } as RequestMessage);

                    return new Promise((resolve) => {
                        request_promises[request_id] = {resolve};
                    });
                };
            },
        });
    }

    return ui as T;
}

function listen() {
    jsDesign.ui.onmessage = async (msg) => {
        try {
            const _message = JSON.parse(msg);
            switch (_message.type) {
                // 处理来自 ui 的函数调用
                case MessageType.request:
                    const request_message: RequestMessage = _message;
                    // 调用函数
                    // @ts-ignore
                    const res = await methods[request_message.method]?.(
                        ...request_message.args,
                    );
                    // 返回结果
                    sendMessage({
                        request_id: request_message.request_id,
                        data: res,
                        type: MessageType.response,
                    } as ResponseMessage);
                    break;

                case MessageType.response:
                    const response_message: ResponseMessage = _message;
                    request_promises[response_message.request_id]?.resolve(
                        response_message.data,
                    );
                    delete request_promises[response_message.request_id];
                    break;

                default:
                    break;
            }
        } catch (e) {}
    };
}

/**
 * 发送消息到 ui
 *
 * @param msg - 要发送的消息
 */
function sendMessage(msg: RequestMessage | ResponseMessage) {
    jsDesign.ui.postMessage(JSON.stringify(msg));
}
