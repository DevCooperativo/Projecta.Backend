import ApiExceptionMessageReturner from "api/constants/apiExceptionMessageReturner"
import ApiExceptionNameEnum from "api/enums/apiExceptionNameEnum"
import ApiException from "api/exceptions/apiException"

class CheckRequestPropertiesHelper {
    public static CheckRequired(properties: Record<string, unknown>) {
        const errors: string[] = []
        Object.entries(properties).forEach(([k, v], i) => {
            if (v === "" || v === undefined)
                errors.push(k)
        })
        ApiException.When(errors.length !== 0, ApiExceptionNameEnum.PAYLOAD_VALIDATION_EXCEPTION, ApiExceptionMessageReturner.RequiredProperties(errors), 400)
    }
}
export default CheckRequestPropertiesHelper