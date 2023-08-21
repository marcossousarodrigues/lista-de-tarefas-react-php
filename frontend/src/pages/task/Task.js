import React, { useEffect, useState } from 'react'
import styles from './Task.module.css'
import { useTask } from '../../hooks/useTask'
import trash from '../../img/icon_trash.png'
import edit from '../../img/icon_edit.png'
import icon_down_arrow from '../../img/icon_down_arrow.png'
import icon_up_arrow from '../../img/icon_up_arrow.png'
import icon_arrow_left from '../../img/icon_arrow_left.png'
import icon_arrow_right from '../../img/icon_arrow_right.png'

import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useUser } from '../../hooks/useUser'


const Task = () => {
    const [tasks, setTasks] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [conclude, setConclude] = useState('1')
    const [datestart, setDatestart] = useState('');
    const [datefinish, setDatefinish] = useState('');

    const [formHidden, setFormHidden] = useState(true)
    const [dashboarHidden, setDashboarHidden] = useState(true)

    const [updateStatus, setUpdateSatus] = useState(false);

    const [loading, setLoading] = useState(false);
    const [Idloading, setIdLoading] = useState(null);
    const [loadingConclude, setLoadingConclude] = useState(false)
    const [isLoadingInclude, setIsLoadingInclude] = useState(false);

    const [amountTotal,setAmountTotal] = useState(0)
    const [isHiddenToDo, setIsHiddenToDo] = useState(false)
    const [isHiddenInProgress, setIsHiddenInProgress] = useState(false)
    const [isHiddenConclude, setIsHiddenConclude] = useState(false)

    // controle de tarefas

    const [amountToDo, setAmountToDo] = useState(0)
    const [amountInProgress, setAmountInProgress] = useState(0)
    const [amountIsConclude, setAmountIsConclude] = useState(0)

    const {findTask, postTask, deleteTask, updateTask} = useTask();
    const navigate = useNavigate();


    const {register, userId} = useUser();

    useEffect(()=>{
        const httpRequestfindTask = async () =>{
            const tasks = await findTask(userId);
            
            setTasks(tasks);

            if(userId === null)
            {
                updateStatus ? setUpdateSatus(false) : setUpdateSatus(true)
            }

            if(tasks)
            {
                setAmountToDo(tasks.filter((item) =>{return item.conclude === '1'}).length)
                setAmountInProgress(tasks.filter((item) =>{return item.conclude === '2'}).length)
                setAmountIsConclude(tasks.filter((item) =>{return item.conclude === '3'}).length)
                setAmountTotal(tasks.length)
                
            }

        }
        if(userId !== null)
        {
            httpRequestfindTask();
        }
        
    },[updateStatus, userId])


    const handleSubmit = async (e) =>{
        e.preventDefault();
        setIsLoadingInclude(true)
        const task = {
            title, description, datestart, datefinish, fk_userid: '1', conclude: conclude, fk_userid: userId
        }
        
        setTimeout( async()=>{
            await postTask(task);

            updateStatus === false ? setUpdateSatus(true) : setUpdateSatus(false);

            setIsLoadingInclude(false);
        }, 2000)
        
      
        

    }

    const handleFormHidden = () =>{
        formHidden ? setFormHidden(false) : setFormHidden(true);
    }

    const handleDashboardHidden = () =>{
        dashboarHidden ? setDashboarHidden(false) : setDashboarHidden(true);
        
    }

    const handleDelete = async (id) => {
        
        setLoading(true)
        setIdLoading(id)
        setTimeout( async ()=>{
            await deleteTask(userId, id)
            updateStatus === false ? setUpdateSatus(true) : setUpdateSatus(false);
            setLoading(false)
            setIdLoading(false)
        }, 3000)
        
       
    }
    

    const handleConcludeTask = async (id, alterConclude, conclude) =>
    {

    
        if(conclude === alterConclude ){
            return;
        }

        setLoadingConclude(true)
        setIdLoading(id)
        const task = {
            conclude: alterConclude
        }

        setTimeout( async ()=>{
            await updateTask(task, userId, id);
            updateStatus === false ? setUpdateSatus(true) : setUpdateSatus(false);
            setLoadingConclude(false)
            setLoading(null)
        }, 3000);
        
    }

    const handleBackTask = (id, conclude) =>{
        
        if(conclude == '2'){
            return;
        }
        setLoadingConclude(true)
        setIdLoading(id)
        const task = {
            conclude: '2'
        }

        setTimeout( async ()=>{
            await updateTask(task, userId, id);
            updateStatus === false ? setUpdateSatus(true) : setUpdateSatus(false);
            setLoadingConclude(false)
            setLoading(null)
        }, 3000);
    }

    const handleHiddenColumn = async (action) =>{
        if(action === 'toDo')
        {
          isHiddenToDo ? setIsHiddenToDo(false) : setIsHiddenToDo(true)
        }
        else if(action === 'inProgress')
        {
            isHiddenInProgress ? setIsHiddenInProgress(false) : setIsHiddenInProgress(true)

        }
        else if(action === 'conclude')
        {
            isHiddenConclude ? setIsHiddenConclude(false) : setIsHiddenConclude(true)
        }
    }


    const formtDataStartFinishi = (data) =>{
        const arrayData  = data.split('-');
        const day = arrayData[2];
        const month = arrayData[1];
        const year = arrayData[0];

        switch (month) {
            case '01':
                return `${day} de Janeiro de ${year} `;
            case '02':
                return `${day} de Fevereiro de ${year} `;
            case '03':
                return `${day} de Março de ${year} `;
            case '04':
                return `${day} de Abril de ${year} `;
            case '05':
                return `${day} de Maio de ${year} `;
            case '06':
                return `${day} de Junho de ${year} `;
            case '07':
                    return `${day} de Julho de ${year} `;
            case '08':
                    return `${day} de Agosto de ${year} `;
            case '09':
                    return `${day} de Setembro de ${year} `;
            case '10':
                    return `${day} de Outubro de ${year} `;
            case '11':
                    return `${day} de Novembro de ${year} `;
            case '12':
                    return `${day} de Dezembro de ${year} `;
            default:
              
          }

    }

  return (
    <>    
    <div className={`container ${styles.content_task_add}`}>

        <div className={styles.header_task}>
            <h1 className='mt-5'>Lista de tarefas</h1>
            {!formHidden ? (
                <p>Adicionar tarefa</p>
            ) 
            :
            (
                <p>Ocultar formulario</p>
            )}
            
            <span onClick={()=>{handleFormHidden()}} className={``}>
                {!formHidden ? 
                <img src={icon_down_arrow} alt="" />
                : 
                <img src={icon_up_arrow} alt="" /> }
            </span>
            
            
        </div>
    
        <hr />
        <form className={`${styles.form}  ${ !formHidden ? styles.form_hidden : ''}`} onSubmit={handleSubmit}>
            <div className={styles.div_input}>
                <label className="form-label">Titulo</label>
                <input type="text" id='title' className="form-control" onChange={(e)=>{setTitle(e.target.value)}}/>
            </div>
            <div className={styles.div_input}>
                <label className="form-label">Descrição</label>
                <input type="text" id='description' className="form-control" onChange={(e)=>{setDescription(e.target.value)}}/>
            </div>

            <div className={styles.div_input}>
                <label className="form-label">Status</label>
                <select id="status" className='form-control' onChange={(e)=>{setConclude(e.target.value)}}>
                    <option value="1">A fazer</option>
                    <option value="2">Em andamento</option>
                    <option value="3">Feito</option>
                </select>
            </div>

            <div className={styles.div_input}>
                <label className="form-label">Data de incio</label>
                <input type="date" id='datestart' className="form-control" onChange={(e)=>{setDatestart(e.target.value)}}/>
            </div>
            <div className={styles.div_input}>
                <label className="form-label">Data de finalização</label>
                <input type="date" id='datefinish' className="form-control" onChange={(e)=>{setDatefinish(e.target.value)}}/>
            </div>
            {isLoadingInclude ? 
                <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                </div>
            :
                <input type="submit" className={`btn btn-primary`} value="Adicionar" />
            }
           
        </form>

        <hr />

        <div className={styles.header_task}>
            {!dashboarHidden ? (
                <p>Mais detalhes da tarefas</p>
            ) 
            :
            (
                <p>Ocultar detalhes</p>
            )}
            
            <span onClick={()=>{handleDashboardHidden()}} className={``}>
                {!dashboarHidden ? 
                <img src={icon_down_arrow} alt="" />
                : 
                <img src={icon_up_arrow} alt="" /> }
            </span>
            
            
        </div>

        <div className={`${styles.dashboard_task} ${ !dashboarHidden ? styles.task_dashboarHidden : ''}`}>
            
            <div className={styles.task_graphics}>
                <h3>Detalhes das tarefas</h3>
                
                    <p className='mt-2'>A fazer - Quantidade: {amountToDo}</p>
                    <div className="progress">
                        <div className="progress-bar bg-primary" role="progressbar" style={{width: (( amountToDo / amountTotal ) * 100)+"%"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>

                    <p className='mt-2'>Em andamento - Quantidade: {amountInProgress}</p>
                    <div className="progress">
                        <div className="progress-bar bg-info" role="progressbar" style={{width: (( amountInProgress / amountTotal ) * 100)+"%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
              
                
                    <p className='mt-2'>Cocluido - Quantidade: {amountIsConclude}</p>
                    <div className="progress">
                        <div className="progress-bar bg-success" role="progressbar" style={{width:(( amountIsConclude / amountTotal ) * 100)+"%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
            
            
                {/* <p className='mt-2'>Quantidade: {amountIsConclude} </p>
                <div className="progress">
                    <div className="progress-bar bg-danger" role="progressbar" style={{width: `${10}%`}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div> */}

               
            </div>

            <div className={styles.task_info}>
                <h3>Legendas</h3>
                <div className={`${styles.task_legend} ${styles.task_legend_bg_primary}`}>
                    <label></label>
                    <span>A fazer: { amountTotal > 0 ? (( amountToDo / amountTotal ) * 100 ).toFixed(0) : '0'}%</span>
                </div>
                
                <div className={`${styles.task_legend} ${styles.task_legend_bg_info}`}>
                    <label></label>
                    <span>Em andamento: { amountTotal > 0 ? (( amountInProgress / amountTotal ) * 100 ).toFixed(0) : '0'}%</span>
                </div>

                <div className={`${styles.task_legend} ${styles.task_legend_bg_success}`}>
                    <label></label>
                    <span>Concluída: { amountTotal > 0 ? (( amountIsConclude / amountTotal ) * 100 ).toFixed(0) : '0'}%</span>
                </div>

                {/* <div className={`${styles.task_legend} ${styles.task_legend_bg_danger}`}>
                    <label></label>
                    <span>Em atraso: </span>
                </div> */}

            </div>

            <div className={styles.task_info}>
                <h3>Quantidade Total das tarefas</h3>
                <div className={styles.task_info_amount}>
                    <span>{amountTotal}</span>
                </div>
            </div>
            
        </div>
        
        <hr />

        {tasks && tasks.length <= 0 ? (<h1 className='mt-5'>Você ainda não possue tarefas</h1>) : ''}
        </div>

        <div className={`container-fluid ${styles.content_task}`}>
                
        <div className={styles.toDo}>
            <h2 className='text-center'>A fazer</h2>
            <button onClick={ ()=>{handleHiddenColumn('toDo')}}>
                {isHiddenToDo && isHiddenToDo 
                ? <img src={icon_arrow_left} alt="" /> : <img src={icon_arrow_right} alt="" /> }
                
            </button>
            
            { !isHiddenToDo ? tasks && tasks.map((item, index)=>((
                item.conclude === '1' ?
                <div key={item.id} className={styles.content_card_task}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                
                    <div className={styles.content_card_task_date}>
                        <p>DATA DE INICIO: {formtDataStartFinishi(item.datestart)}</p>
                        <p>DATA DE FINALIZAÇÃO: { formtDataStartFinishi(item.datefinish)}</p>
                    </div>
                    <label htmlFor="">Status</label>
                    {loadingConclude && Idloading == item.id ?
                        <div className="spinner-border" role="status">
                            <span className="sr-only"></span>
                        </div>
                    :
                        <select id="status" defaultValue={item.conclude} className='form-control'
                        onChange={(e)=>{handleConcludeTask(item.id, e.target.value, item.conclude)}}
                        >
                            <option value="1" >A fazer</option>
                            <option value="2" >Em andamento</option>
                            <option value="3">Feito</option>
                        </select>
                    }
                    <ul>
                        <li>
                            {loading && Idloading == item.id ?
                            <div className="spinner-border" role="status">
                                <span className="sr-only"></span>
                            </div>
                            : 
                            <>
                                <Link to={`/edit/${item.id}`}>
                                    <img src={edit} alt="" />
                                </Link>
                                <span onClick={()=>{handleDelete(item.id)}}>
                                    <img src={trash} alt="" />
                                </span>
                            </>
                            
                            }
                        </li>
                    </ul>
                  
                </div>
                :
                ''
            ))) : ''}
        </div>
        <div className={styles.inProgress}>
            <h2 className='text-center'>Em andamento</h2>
            <button onClick={()=>{handleHiddenColumn('inProgress')}}>
                {isHiddenInProgress && isHiddenInProgress 
                ? <img src={icon_arrow_left} alt="" /> : <img src={icon_arrow_right} alt="" /> }
                
            </button>

            { !isHiddenInProgress ? tasks && tasks.map((item, index)=>((
                item.conclude === '2' ?
                <div key={item.id} className={styles.content_card_task}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                
                    <div className={styles.content_card_task_date}>
                        <p>DATA DE INICIO: {formtDataStartFinishi(item.datestart)}</p>
                        <p>DATA DE FINALIZAÇÃO: { formtDataStartFinishi(item.datefinish)}</p>
                    </div>
                    <label htmlFor="">Status</label>

                    {loadingConclude && Idloading == item.id ?
                        <div className="spinner-border" role="status">
                            <span className="sr-only"></span>
                        </div>
                    :
                        <select id="status" defaultValue={item.conclude} className='form-control'
                        onChange={(e)=>{handleConcludeTask(item.id, e.target.value, item.conclude)}}
                        >
                            <option value="1">A fazer</option>
                            <option value="2">Em andamento</option>
                            <option value="3">Feito</option>
                        </select>
                    }
                    <ul>
                        <li>
                            {loading && Idloading == item.id ?
                            <div className="spinner-border" role="status">
                                <span className="sr-only"></span>
                            </div>
                            : 
                            <>
                                <Link to={`/edit/${item.id}`}>
                                    <img src={edit} alt="" />
                                </Link>
                                <span onClick={()=>{handleDelete(item.id)}}>
                                    <img src={trash} alt="" />
                                </span>
                            </>
                            
                            }
                        </li>
                    </ul>
                  
                </div>
                :
                ''
            ))) : ''}
        </div>
        <div className={styles.done}>
            <h2 className='text-center'>Feito</h2>
            <button onClick={()=>{handleHiddenColumn('conclude')}}>
                {isHiddenConclude && isHiddenConclude 
                ? <img src={icon_arrow_left} alt="" /> : <img src={icon_arrow_right} alt="" /> }
                
            </button>

            { !isHiddenConclude ? tasks && tasks.map((item, index)=>((
                item.conclude === '3' ?
                <div key={item.id} className={styles.content_card_task}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                
                    <div className={styles.content_card_task_date}>
                        <p>DATA DE INICIO: {formtDataStartFinishi(item.datestart)}</p>
                        <p>DATA DE FINALIZAÇÃO: { formtDataStartFinishi(item.datefinish)}</p>
                    </div>
                    <label htmlFor="">Status</label>
                    {loadingConclude && Idloading == item.id ?
                        <div className="spinner-border" role="status">
                            <span className="sr-only"></span>
                        </div>
                    :
                    <select id="status" defaultValue={item.conclude} className='form-control'
                    onChange={(e)=>{handleConcludeTask(item.id, e.target.value, item.conclude)}}
                    >
                        <option value="1">A fazer</option>
                        <option value="2">Em andamento</option>
                        <option value="3">Feito</option>
                    </select>
                    }
                    <ul>
                        <li>
                            {loading && Idloading == item.id ?
                            <div className="spinner-border" role="status">
                                <span className="sr-only"></span>
                            </div>
                            : 
                            <>
                                <Link to={`/edit/${item.id}`}>
                                    <img src={edit} alt="" />
                                </Link>
                                <span onClick={()=>{handleDelete(item.id)}}>
                                    <img src={trash} alt="" />
                                </span>
                            </>
                            
                            }
                        </li>
                    </ul>
                  
                </div>
                :
                ''
            ))) : ''}
        </div>

        </div>  
    </>

  )
}

export default Task