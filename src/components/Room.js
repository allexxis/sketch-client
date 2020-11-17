const Room =({name,users,onClick})=>{
    
    return (
        <div className='Room'>
            <p className='Room-name'>Nombre:<span style={{color:'purple' }}>  {name}</span></p>
            <p className='Room-users'>Usuarios: <span style={{color:'green'}}>  {users}</span></p>
            <button onClick={()=>onClick(`/game/${name}`)} className='Room-button'>Ingresar</button>
        </div>
    )
}
export default Room