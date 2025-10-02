function createSearchParams(objects) {
    const queryParams=[]
   for (const[key,value] of Object.entries(objects)){
    if(Array.isArray(value)&& value.length>0){
     const paramValue=value.join(',')
     queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
    }
   }
   return queryParams.join('&')
}

export default createSearchParams