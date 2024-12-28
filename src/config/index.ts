import express, { Express } from "express"
import cors from 'cors'

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:3000"

export default (app: Express): void => {
    app.set("trust proxy", 1)
    app.use(cors({ origin: '*' }))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
}