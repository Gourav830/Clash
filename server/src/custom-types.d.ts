interface AuthUser {
    id: number;
    name: string;
    email: string;
}

interface VotingData {
    clashId: number;
    clashItemId: number;
    userId?: number;
}

interface CommentData {
    id: number;
    comment: string;
    userId?: number;
}

interface EmailJobData {
    to: string;
    subject: string;
    body: string;
}

interface JWTPayload {
    id: number;
    name: string;
    email: string;
    iat?: number;
    exp?: number;
}

declare namespace Express {
    interface Request {
        user?: AuthUser;
    }
}