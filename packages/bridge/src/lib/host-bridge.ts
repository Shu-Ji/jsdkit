import {MessageType, RequestMessage, ResponseMessage} from '@/lib/interfaces';
import {uuid} from '@/lib/utils';

const request_promises = {} as Record<
    string,
    {resolve: (value: unknown) => unknown}
>; // 存储的是 {request_id: {resolve}}
let host: unknown = undefined;
const methods = {} as Record<string, unknown>;

/**
 * 宿主与iframe桥接工具
 *
 * @param pluginId - 插件 id
 */
export function createHostBridge<T extends object>(pluginId: string) {
    // 确保是一个单例
    if (!host) {
        listen(pluginId);
        host = new Proxy<T>({} as T, {
            get(target: T, property: string): unknown {
                return function (...args: unknown[]) {
                    const request_id = uuid();
                    sendMessage(
                        {
                            method: property,
                            args: args,
                            request_id,
                            type: MessageType.request,
                        } as RequestMessage,
                        pluginId,
                    );
                    return new Promise((resolve) => {
                        request_promises[request_id] = {resolve};
                    });
                };
            },

            set(target: T, property: string, value: unknown): boolean {
                methods[property] = value;
                return true;
            },
        });
    }

    return host as T;
}

/**
 * 监听来自 host 的消息
 *
 * @param pluginId - 插件 id
 */
function listen(pluginId: string) {
    onmessage = async (event) => {
        try {
            const msg = JSON.parse(event.data.pluginMessage);
            switch (msg.type) {
                case MessageType.response:
                    const response_message: ResponseMessage = msg;
                    request_promises[response_message.request_id]?.resolve(
                        response_message.data,
                    );
                    delete request_promises[response_message.request_id];
                    break;

                case MessageType.request:
                    const request_message: RequestMessage = msg;
                    // 调用函数
                    // @ts-ignore
                    const res = await methods[request_message.method]?.(
                        ...request_message.args,
                    );
                    // 返回结果
                    sendMessage(
                        {
                            request_id: request_message.request_id,
                            data: res,
                            type: MessageType.response,
                        } as ResponseMessage,
                        pluginId,
                    );

                    break;

                default:
                    break;
            }
        } catch (e) {}
    };
}

/**
 * 向宿主 host 发送消息
 *
 * @param msg - 要发送的消息
 * @param pluginId - 插件 id
 */
function sendMessage(msg: ResponseMessage | RequestMessage, pluginId: string) {
    parent.postMessage(
        {
            pluginMessage: JSON.stringify(msg),
            pluginId,
        },
        'https://js.design',
    );
}
