export class Guard {
    public static againstNullOrUndefinedBulk(args: { argument: unknown, argumentName: string }[]): string[] {
        const errors: string[] = []
        for (const { argument, argumentName } of args) {
            if (argument === null || argument === undefined) {
                errors.push(`Argument ${argumentName} is null or undefined`)
            }
        }
        return errors
    }

    public static againstNullOrUndefined(argument: unknown, message: string): string | null {
        if (argument === null || argument === undefined) {
            return message
        }
        return null
    }

    public static againstMinLength(argument: string, minLength: number, message: string): string | null {
        if (argument === null || argument === undefined) return null
        if (argument.length < minLength) return message
        return null
    }

    public static againstMaxLength(argument: string, maxLength: number, message: string): string | null {
        if (argument === null || argument === undefined) return null
        if (argument.length > maxLength) return message
        return null
    }

    public static againstRangeLenght(argument: string, minLength: number, maxLength: number, message: string): string | null {
        if (argument === null || argument === undefined) return null
        if (argument.length < minLength || argument.length > maxLength) return message
        return null
    }

    public static againstInvalidDateFormat(argument: unknown, message: string): string | null {
        if (argument === null || argument === undefined) return null
        const regex = /^\d{4}-\d{2}-\d{2}$/
        if (!regex.test(argument as string)) return message
        return null
    }

    public static againstFutureDate(argument: unknown, message: string): string | null {
        if (argument === null || argument === undefined) return null
        const now = new Date()
        if (Date.parse(String(argument)) > now.getUTCMilliseconds()) return message
        return null
    }

    public static againstValueSet(argument: unknown, valueSet: object, message: string): string | null {
        if (argument === null || argument === undefined) return null
        if (!Object.values(valueSet).includes(argument)) return message
        return null
    }

    public static against(condition: boolean, message: string): string | null {
        if (condition) return message
        return null
    }

    public static againstRegularExpressionBulk(args: { argument: unknown, regex: RegExp, message: string }[]): string[] {
        const errors: string[] = []
        for (const { argument, regex, message } of args) {
            if (argument === null || argument === undefined) continue
            if (!regex.test(argument as string)) errors.push(message)
        }
        return errors
    }

    public static againstRegularExpression(argument: unknown, regex: RegExp, message: string): string | null {
        if (argument === null || argument === undefined) return null
        if (!regex.test(argument as string)) return message
        return null
    }
}
