import { Request, Response, NextFunction } from 'express'
import { interfaces, controller, httpGet, httpPost, httpDelete } from 'inversify-express-utils'

@controller('/v1/auth')
export class AuthenticationControllers implements interfaces.Controller {

    @httpGet('/request-login')
    private async requestLogin(req: Request, res: Response, next: NextFunction) {
        try {
            const { userCredential } = req.body
            res.json({
                'access_token': 'xxxx'
            })
        } catch (err) {
            next(err)
        }
    }
}