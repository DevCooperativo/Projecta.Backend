class DomainException implements Error {
    name: string
    message: string
    stack?: string | undefined;
    constructor(name: string, message: string, stack?: string) {
        this.name = name
        this.message = message
        this.stack = stack
    }

}
export default DomainException