export type ResponseType = 'success' | 'info' | 'warn' | 'error'

export interface PaginationMeta {
    total: number
    limit: number
    offset: number
}

export interface ResponseDetail {
    field?: string
    reason: string
    acceptableValue?: string
}

export interface ApiResponse<T = unknown> {
    message: string
    type: ResponseType
    code: number
    name: string
    data?: T
    pagination?: PaginationMeta
    details?: ResponseDetail[]
}

export class ResponseBuilder {
    static success<T>(message: string, name: string, code: number, data: T, pagination?: PaginationMeta): ApiResponse<T> {
        const response: ApiResponse<T> = { message, type: 'success', code, name, data }
        if (pagination) response.pagination = pagination
        return response
    }

    static fail(message: string, type: Exclude<ResponseType, 'success'>, name: string, code: number, details?: ResponseDetail[]): ApiResponse {
        const response: ApiResponse = { message, type, code, name }
        if (details && details.length > 0) response.details = details
        return response
    }
}
