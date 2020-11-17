const broadcastEvent=({event,payload})=>{
    switch(event){
        case 'DRAW':
            console.log(payload)
            break;
        case 'CLEAR':
            console.log('Clean')
            break;
        default:
            break;
    }
   
}
const getRooms = async()=>{
    const result = await fetch('https://7baf5e61b0f7.ngrok.io/rooms',{
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        },
       
    }).then(res=>res.json()).catch(err=>{
        throw err
    });
    return result.rooms
}
export  {
    broadcastEvent,
    getRooms
}