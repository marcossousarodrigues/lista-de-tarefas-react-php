
import { useNavigate } from 'react-router-dom';
import api from '../utils/api'
import { useEffect, useState } from 'react';


export const useUser = () =>
{
    const [authenticated, setAuthenticated] = useState(null)
    const [userId, setUserId] = useState(null)
    const [userName, setUserName] = useState('');

    const navigate = useNavigate();

    
    useEffect( ()=>{
        const token = localStorage.getItem('token')
        const id = localStorage.getItem('userId');
        const name = localStorage.getItem('userName');

        if(token)
        {  
            setAuthenticated(true)
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)} `
            setUserName(name)
        }
        else
        {
            setAuthenticated(false)
            navigate('/user')
        }
        if(id)
        {  
            setUserId(JSON.parse(id))
        }


    }, [authenticated]);


    const register = async (user) =>{
        try
        {
           const res = await api.post('/api/user', user)

           const getUser = res.data.data.user; 

           if(getUser !== null)
           {
                const user = {
                    email: getUser.email,
                    password: getUser.password,
                    action: "login"
                } 
                await login(user);
           }
        }
        catch(error)
        {
            console.log(error)
        }
    }

    const login = async (user) =>
    {
        try
        {
           const res = await api.post('/api/user', user)

           const authUserValid = await authUser(res.data.data.user, res.data.data.token)

           if(authUserValid)
           {   
               return true
           }
           else
           {
                return false
           }

        }
        catch(error)
        {
            console.log(error);
        }
    }


    async function authUser(user, tokenUser = '')
    {
        if(user == null)
        {
            return false
            
        }
        else
        {
            localStorage.setItem('token', JSON.stringify(tokenUser))
            localStorage.setItem('userId', JSON.stringify(user[0].id))
            localStorage.setItem('userName', JSON.stringify(user[0].name))
        
            await setAuthenticated(true)

            navigate('/tasks');
            return true
        }
       
    }

    function logout()
    {
        setAuthenticated(false)
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        api.defaults.headers.Authorization = undefined; 
        navigate('/login')
    }



    return {register, login, logout, authenticated, userId }

}