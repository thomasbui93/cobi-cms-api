export interface InterfaceException {
    getErrorCode(): number

    getMessage(): string

    getStack(): string
}