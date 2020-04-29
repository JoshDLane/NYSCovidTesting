import React from 'react'
require('dotenv').config();


export default async function getNYData(){
    let resp = await fetch("https://health.data.ny.gov/resource/xdss-u53e.json")
    let respJson = await(resp.json())
    console.log(respJson)
}
