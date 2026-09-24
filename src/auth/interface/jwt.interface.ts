export interface JwtPayload {
    sub: number;
    email: string;
    permissions: string;
    roles: string;
    iat?: number;
    exp?: number;
}
