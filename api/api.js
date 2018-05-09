var api = {
    getDataCoin10(){
        var url = `https://api.coinmarketcap.com/v2/ticker/?limit=30`
        return fetch(url)
        .then((res) => res.json())
        
      
      
        //var array = Object.keys(coiner).map(item => coiner[item]);
    }   
};

module.exports = api;