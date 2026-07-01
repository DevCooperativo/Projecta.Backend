class ApiExceptionMessageReturner {
    public static Required(name: string) {
        return `The ${name} field is a required field`
    }
    public static MaxLength(name: string, maxLength: number) {
        return `The ${name} field must have a maximum of ${maxLength} characters`
    }
    public static MinLength(name: string, minLength: number) {
        return `The ${name} field must have a minimum of ${minLength} characters`
    }
    public static RangeLength(name: string, minLength: number, maxLength: number) {
        return `The ${name} field must have between ${minLength} and ${maxLength} characters`
    }
    public static InvalidProperties(props: string[]) {
        return `The following fields contain errors: ${props.join(", ")}`
    }
    public static RequiredProperties(props: string[]) {
        return `The following fields are required: ${props.join(", ")}`
    }
}

export default ApiExceptionMessageReturner