import express from 'express'
import bodyParser from 'body-parser'
import * as sip from './sipuni.js'
// import * as amo from './modules/amo.js'
// import * as wb from './modules/wildberries.js'
import fs from 'fs'
import { log } from 'console';

export async function records(){
    let phones=fs.readFileSync('./files/phones.data', 'utf8', (err, data)=>{
        if (err) throw err;
        return data
        // return JSON.parse(data);
    }).toString();
    return phones.split('\r\n').filter(el=>el.length>10).map((el)=>{return parseInt(el)})
    // console.log(phones);
}

export async function rechandl(){
    let recs=fs.readFileSync('./files/records.json', 'utf8', (err, data)=>{
        if (err) throw err;
        return data
        // return JSON.parse(data);
    })
    let p=await records()
    recs=JSON.parse(recs)
    recs=recs
    // .filter(el=>[el.from,el.to].some(f=>p.includes(f)))
    .filter(el=>el.talklong>30)
    // .filter(el=>el.type=='Входящий')
    .filter(el=>el.newclient===1)
    console.log(p.length,recs.length);
    let v=739
    let id=recs[v].id
    let name=recs[v].manager.split(" ")[1]
    if (recs[v].manid==206 || recs[v].from==206) name='Марк'
    console.log(recs[v]);
    await sip.getaudio(id,name)
    // console.log(phones);
}