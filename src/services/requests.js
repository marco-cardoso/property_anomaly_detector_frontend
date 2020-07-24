

async function getAnomalies(params) {
  
    var url = "http://0.0.0.0:5000/anomalies?"

    Object.keys(params).forEach(function(key) {
        url += key + "="

        if( Object.prototype.toString.call( params[key] ) === '[object Array]' )
        {
            url += JSON.stringify(params[key]) 
        }
        else
        {
            url += params[key]
        }
        
        url += "&"
    });
    console.log(url)
    let response = await fetch(url)
    return response  
  }

export {getAnomalies}