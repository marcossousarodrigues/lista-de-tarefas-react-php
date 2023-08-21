
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useUser } from './useUser';

const urlDeploy = 'https://tasks.marcosrodrigues.net/backend';

const urlLocal = 'http://localhost/project-marcos/marcos/app/projects/tasks/';

const urlGet = urlDeploy;


export const useTask = () =>
{


    const navigate = useNavigate()
    // requisitar tarefas a api
    const findTask = async (userId) =>{
        try
        {
            const res = await fetch(`${urlGet}/api/task/${userId}`);
            const json = await res.json();
            return json.data;
        }
        catch(error)
        {
            console.log("catch"+error)
        }
     
    }

    // enviar tarefa para api
    const postTask = async ($data) =>{
        
        try
        {
            const res = await api.post(`/api/task/`, $data);
        }
        catch(error)
        {
            console.log(error);
        }
       
    }   

    const updateTask = async ($data, userid, id) =>{
        try
        {
            const res = await api.patch(`/api/task/${userid}/${id}`, $data);

        }
        catch(error)
        {
            console.log(error);
        }
    }

    const deleteTask = async (userid, id) =>{
        try
        {
            await api.delete(`/api/task/${userid}/${id}`);
        }
        catch(error)
        {

        }
        
    }

    const findTaskUserIdAndTaskId = async (userid, taskid) =>{
        try
        {
            const res = await fetch(`${urlGet}/api/task/${userid}/${taskid}`);
            const json = await res.json();

            return json.data;
        }
        catch(error)
        {
            
        }
    }

    return {findTask, postTask, deleteTask, updateTask, findTaskUserIdAndTaskId}

}