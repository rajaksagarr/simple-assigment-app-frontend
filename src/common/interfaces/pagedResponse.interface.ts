export interface PagedResponse<T> {
    data: T[],
    isNextAvaible: boolean;
    ok: boolean
}
