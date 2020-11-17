import  {useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Room from '../components/Room'
import {getRooms} from '../services'

const Home =({username,setUsername})=>{
    const [created,setCreated] = useState(false)
    const [rooms,setRooms] =useState([])
    const history = useHistory()
    const goToRoom =(route)=>{
        if(created){
            history.push(route)
        }
    }
    
    useEffect(()=>{
        getRooms().then(rooms=>{
            setRooms(rooms)
        })
    },[])
    useEffect(()=>{
        if(username){
            setCreated(true)
        }
    },[])
    return (
        <div>
            <h1 className='Username-label'>{username}</h1>
            {!created&&<input onChange={(event)=>{    
                setUsername(event.target.value)
                localStorage.setItem('username',event.target.value.toLowerCase())
            }}className='Username-input' value={username?username:''}></input>}
            {!created&&<button onClick={()=>{
                setCreated(true)
            }} className='Username-button'>Crear nombre de usuario</button>}
            <div className='Rooms'>
                {rooms.map((room)=>{
                    return <Room key={room.name} name={room.name} users={room.users} onClick={goToRoom}/>
                })}
            </div>
        </div>
        
    )
}

export default Home