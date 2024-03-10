export type signinPayload = {
    email: string;
    password: string;
}

export type Token = {
    access_token: string;
    expires_in: string;
    token_type: string;
    refresh_token: string;
    id_token: string;
    user_id: string;
    project_id: string;
}