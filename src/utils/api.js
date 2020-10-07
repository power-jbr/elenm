import request from './request'

export function gets(url,data){
    return request.get(url,{
        params:data
    })
}

export function posts(url,data){
    return request.post(url,data)
}

export function ajaxcityG(type){
    return gets(`/v1/cities?type=${type}`)
}

export function ajaxcityP(){
    return posts('/v1/captchas')
}