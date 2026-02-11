class DomainException implements Error {
    name: DomainExceptionNameEnum
    message: string
    code: number
    stack?: string | undefined;
    constructor(name: DomainExceptionNameEnum, message: string, code: number, stack?: string) {
        this.name = name
        this.code = code
        this.message = message
        this.stack = stack
    }

}
export default DomainException