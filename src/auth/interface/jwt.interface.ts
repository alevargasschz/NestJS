export interface JwtPayload {
    sub: number;
    email: string;
    permissions: string[];
    role: string;
    iat?: number;
    exp?: number;
}
