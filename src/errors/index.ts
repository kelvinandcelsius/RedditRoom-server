import { Request, Response, NextFunction, Express } from 'express'

export default (app: Express): void => {
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.status(404).json({ message: "This route does not exist" })
    })

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        console.error("ERROR", req.method, req.path, err)

        //That's for manual validation. Remove in case the validation in the Front will be made with a library
        if (err.name === 'ValidationError') {
            let errorMessages = Object.values(err.errors).map((el: any) => el.message)
            res.status(400).json({ errorMessages })
        }

        if (!res.headersSent) {
            res.status(500).json({ errorMessages: ['There has been an error on the server.'] })
        }
    })
}