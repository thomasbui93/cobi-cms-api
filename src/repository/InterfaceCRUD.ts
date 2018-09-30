

export interface InterfaceCRUD<T> {
    create(item: T): Promise<T>
    update(id: string, item: any): Promise<T>
    read(id: string): Promise<T>
    remove(id: string): Promise<T>
}