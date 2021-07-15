const got = require('got');

async function saveJson(url, x){
    const {data} = await got.post(url, {
        json: x
    }).json();
    return data
}
async function getJson(url){
  const response = await got(url);
  return JSON.parse(response.body)
}

module.exports = {getJson, saveJson};