class DomainException implements Error {
    name: string
    message: string
    code: number
    stack?: string | undefined;
    constructor(name: string, message: string, code: number, stack?: string) {
        this.name = name
        this.code = code
        this.message = message
        this.stack = stack
    }

}
export default DomainException