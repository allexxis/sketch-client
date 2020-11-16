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

export  {
    broadcastEvent
}