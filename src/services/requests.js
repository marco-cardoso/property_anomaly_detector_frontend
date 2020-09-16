// const hostUrl = "http://" + process.env.REACT_APP_BACKEND_HOST + ":" + process.env.REACT_APP_BACKEND_PORT;
const hostUrl = "http://3.133.34.180:8080"

async function getAnomalies() {
  
    var url = hostUrl + "/anomalies";
    let response = await fetch(url);

    return response  
  }

async function getCategoricalFilters() {
    var url = hostUrl + "/get-categorical-filters";
    let response = await fetch(url)
    return response  
}

async function classifyProperty(property) {
    var url = hostUrl + "/classify-property?"
    
    /* Convert dictionary to string URL format */
    Object.keys(property).forEach(function(key) {
        url += key + "="

        if( Object.prototype.toString.call( property[key] ) === '[object Array]' )
        {
            url += JSON.stringify(property[key]) 
        }
        else
        {
            url += property[key]
        }
        
        url += "&"
    });

    let response = await fetch(url)
    return response  
}


export {getAnomalies, getCategoricalFilters, classifyProperty}

