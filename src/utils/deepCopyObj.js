export const deepcopyObj =(data)=>{
  const copiedData=JSON.parse(JSON.stringify(data))
  return copiedData
}