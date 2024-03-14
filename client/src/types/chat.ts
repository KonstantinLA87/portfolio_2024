export type Chat = {
    username: string;
    text: string;
    time: string;
    room?: string;
}

export type User = {
    id: string;
    username: string;
    room: string;
}

export enum RoomType {
    FIRST = 'Первый чат',
    SECOND = 'Второй чат'
}

export type Room = RoomType