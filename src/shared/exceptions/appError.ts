abstract class AppError extends Error {
    abstract readonly code: number
}
export default AppError