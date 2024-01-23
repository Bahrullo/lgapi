import express from 'express'
import bodyParser from 'body-parser'
// import * as sip from './modules/sipuni.js'
// import * as amo from './modules/amo.js'
// import * as wb from './modules/wildberries.js'
import fs from 'fs'

export async function records(){
    let phones=fs.readFileSync('./files/phones.data', 'utf8', (err, data)=>{
        if (err) throw err;
        return data
        // return JSON.parse(data);
    }).toString;
    console.log(phones);
}
