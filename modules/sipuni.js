import SipuniApi from '@sipuni/sipuni'
import fs from 'fs'
import qs from 'qs'
import { createHash } from 'crypto'
import axios from "axios"

const sip = new SipuniApi({token:'0.17naslysx3mj', host:'https://sipuni.com'})

function md5(content) {  
    return createHash('md5').update(content).digest('hex')
}

let headers={
    "Content-Disposition": "attachment; filename=recs.csv"
}

export async function api(method,url,data){
    let resp
    let options={
        method: method,
        url:url,
        headers: headers
    }
    if (data) options.data=data
    await axios.request(options).then(async (res)=>{
        resp=res
    }).catch(err=>console.log(err.response.status,err.response.statusText,'\n',err.response.data))
    return resp
}

export async function getallrecs(){
    let user = '030112';
    let limit = 10000;
    let order = 'asc';
    let page = 1;
    let secret = '0.17naslysx3mj';
    let hash=md5([limit,order,page,user,secret].join('+'))
    let data={
        'user':user,
        'limit':limit,
        'order':order,
        'page':page,
        'hash':hash
    }
    data=qs.stringify(data)
    console.log(data);
    let res=await api('POST','https://sipuni.com/api/statistic/export/all',data)
    if(res) {
        fs.writeFileSync('files/resp.csv',res.data)
    }
    console.log(res?res.data:'');
}


export async function getaudio(id,name){
    let user = '030112';
    let secret = '0.17naslysx3mj';
    let hash=md5([id,user,secret].join('+'))
    let data={
        'id':id,
        'user':user,
        'hash':hash
    }
    data=qs.stringify(data)
    console.log(data);
    await axios({
        method: "POST",
        url: "https://sipuni.com/api/statistic/record",
        // headers:{
        //     "Content-Type": "audio/mpeg"
        // },
        data:data,
        responseType: "stream"
    }).then(function (response) {
        response.data.pipe(fs.createWriteStream(`files/audio/${name}_${id}.mp3`));
    });
    // console.log(res?res.data:'');
}