export interface InterfaceDatabase {
    start(): void
    stop(): void
    isValid(): boolean | Promise<boolean>
}