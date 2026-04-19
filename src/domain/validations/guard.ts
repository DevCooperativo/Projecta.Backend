import DomainException from "@/domain/exceptions/domainException"

export class Guard{
    public static againstNullOrUndefinedBulk(args: { argument: unknown, argumentName: string }[]): void {
        for (const { argument, argumentName } of args) {
            if (argument === null || argument === undefined) {
                throw new DomainException(`Value is required`, `Argument ${argumentName} is null or undefined`)
            }
        }
    }
    public static againstNullOrUndefined(argument: unknown, argumentName: string): void {
        if (argument === null || argument === undefined) {
            throw new DomainException(`Value is required`, `Argument ${argumentName} is null or undefined`)
        }
    }

    public static againstMinLength(argument: string, minLength: number, message: string): void {
        if (argument.length < minLength) {
            throw new DomainException(`Value is too short`, message)
        }
    }

    public static againstMaxLength(argument: string, maxLength: number, message: string): void {
        if (argument.length > maxLength) {
            throw new DomainException(`Value is too long`, message)
        }
    }

    public static againstRangeLenght(argument: string, minLength: number, maxLength: number, message: string): void {
        if (argument.length < minLength || argument.length > maxLength) {
            throw new DomainException(`Value length is out of range`, message)
        }
    }

    public static againstInvalidDateFormat(argument: unknown, message: string): void {
        // test against regext for YYYY-MM-DD format
        const regex = /^\d{4}-\d{2}-\d{2}$/
        if (!regex.test(argument as string)) {
            throw new DomainException(`Value is not a valid date`, message)
        }
    }

    public static againstFutureDate(argument: Date, message: string): void {
        const now = new Date()
        if (argument > now) {
            throw new DomainException(`Value is a future date`, message)
        }
    }

    public static againstValueSet(argument: unknown, valueSet: object, message: string): void {
        if (!Object.values(valueSet).includes(argument)) {
            throw new DomainException(`Value doesn't contain a valid value`, message)
        }
    }

    public static against(condition: boolean, message: string): void {
        if (condition) {
            throw new DomainException(message, message)
        }
    }

    public static againstRegularExpressionBulk(args: { argument: unknown, regex: RegExp, message: string }[]): void {
        for (const { argument, regex, message } of args) {
            if (!regex.test(argument as string)) {
                throw new DomainException(`Value doen't match the predefined structure`, message)
            }
        }
    }

    public static againstRegularExpression(argument: unknown, regex: RegExp, message: string): void {
        if (!regex.test(argument as string)) {
            throw new DomainException(`Value doen't match the predefined structure`, message)
        }
    }

}