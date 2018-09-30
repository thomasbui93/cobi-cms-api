import { GeneralRepository } from './GeneralRepository'

export class CategoryRepository extends GeneralRepository {
    verifySlug(item: any): string {
        const { title, slug } = item
        if (slug.indexOf(' ') > -1) {

        } else {
            return slug
        }
    }
}