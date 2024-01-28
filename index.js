import express from 'express'
import bodyParser from 'body-parser'
import * as sip from './modules/sipuni.js'
// import * as amo from './modules/amo.js'
// import * as wb from './modules/wildberries.js'
import * as app from './modules/app.js'
import fs from 'fs'

import dotenv from 'dotenv'

dotenv.config()
const env=process.env
const exp = express()

// await app.records()
await app.rechandl()
// await sip.getallrecs()
// await sip.getaudio()

exp.listen(3000, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`Server is listening on http://localhost:3000`)
})