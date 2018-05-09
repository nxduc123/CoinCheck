const URI = 'https://api.coinmarketcap.com/v2/ticker';
const URIV2= 'https://api.coinmarketcap.com/v2/listings'

export default {
    async fetch10v2() {
        try {
                let response = await fetch(URI + '/?limit=2');
                let responseJsonData = await response.json();
                return responseJsonData.data;
                console.log(responseJsonData.data)
            }
        catch(e) {
            console.log(e)
        }
    }
  /*   async fetch10v2() {
        try {
                let response = await fetch(URI + '');
                let responseJson = await response.json();
                return responseJson.data;
            }
        catch(e) {
            console.log(e)
        }
    } */
}