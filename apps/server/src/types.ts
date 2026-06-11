export type ServiceResult<T = any> =
    | {
    success: true;
    data: T;
    message?: string;
}
    | {
    success: false;
    message: string;
    data?: never;
};