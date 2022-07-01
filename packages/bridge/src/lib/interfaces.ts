export enum MessageType {
    request = 'jsdkit-bridge-request-message',
    response = 'jsdkit-bridge-response-message',
}

export interface RequestMessage {
    method: string;
    args: unknown[];
    request_id: string;
    type: MessageType.request;
}

export interface ResponseMessage {
    request_id: string;
    type: MessageType.response;
    data: unknown;
}
