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

export type Room = 'Первый чат' | 'Второй чат'