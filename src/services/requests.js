

async function getAnomalies(params) {
  
    var url = "http://0.0.0.0:5000/anomalies?"

    /* Convert dictionary to string URL format */
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

async function getCategoricalFilters() {
    var url = "http://0.0.0.0:5000/get-categorical-filters"
    let response = await fetch(url)
    return response  
}

async function classifyProperty(property) {
    var url = "http://0.0.0.0:5000/classify-property?"
    
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

