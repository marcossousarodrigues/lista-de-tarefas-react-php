import React, { useEffect } from 'react'
import styles from './Task.module.css'
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTask } from '../../hooks/useTask';
import { useUser } from '../../hooks/useUser';


const EditTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [datestart, setDatestart] = useState('');
    const [datefinish, setDatefinish] = useState('');

    const [isLoadingInclude, setIsLoadingInclude] = useState(false);

    const {id} = useParams('id');

    const {userId} = useUser();

    const navigate = useNavigate();
    
    const {findTaskUserIdAndTaskId, updateTask} = useTask();

    useEffect(()=>{
        const httpRequestfindTask = async () =>{
            const task = await findTaskUserIdAndTaskId(userId, id);
            if(task.length > 0)
            {
                setTitle(task[0].title);
                setDescription(task[0].description);
                setDatestart(task[0].datestart);
                setDatefinish(task[0].datefinish);
            }
    
           
        }
        httpRequestfindTask();
    }, [userId])

        const handleSubmit = async (e) =>{
        e.preventDefault();

        setIsLoadingInclude(true)

        const task = {
            title, description, datestart, datefinish
        }

        setTimeout( async()=>{
            await updateTask(task, userId, id);
            setIsLoadingInclude(false);
            navigate('/');
            window.location.reload();
        }, 2000)

        

    }


  return (
    <div className={`container ${styles.content_task_add}`}>
         <div className={styles.header_task}>
            <h1 className='mt-5'>lista de tarefas - editar</h1>
        </div>
    
    <hr />
        <form className={`${styles.form}`} onSubmit={handleSubmit}>
            <div className={styles.div_input}>
                <label className="form-label">Titulo</label>
                <input type="text" id='title' className="form-control" 
                value={title}
                onChange={(e)=>{setTitle(e.target.value)}}
                />
            </div>
            <div className={styles.div_input}>
                <label className="form-label">Descrição</label>
                <textarea type="text" id='description'  className="form-control"
                value={description}
                onChange={(e)=>{setDescription(e.target.value)}}></textarea>
                

            </div>
            <div className={styles.div_input}>
                <label className="form-label">Data de incio</label>
                <input type="date" id='datestart' className="form-control" 
                value={datestart}
                onChange={(e)=>{setDatestart(e.target.value)}}/>
            </div>
            <div className={styles.div_input}>
                <label className="form-label">Data de finalização</label>
                <input type="date" id='datefinish' className="form-control" 
                value={datefinish}
                onChange={(e)=>{setDatefinish(e.target.value)}}/>
            </div>
            
            {isLoadingInclude ? 
                <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                </div>
            :
                <input type="submit" className={`btn btn-primary`} value="Atualizar" />
            }

            <a href='/' className={`btn btn-secondary`}>Cancelar</a>
        </form>
    </div>
  )
}

export default EditTask