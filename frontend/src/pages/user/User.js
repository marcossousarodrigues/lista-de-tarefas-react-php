import React, { useState } from 'react'
import styles from './User.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../../hooks/useUser';
const User = () => {

    // register

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    // login
    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState();
    const [register, setRegister] = useState(false);

    const {register: registerUser, login} = useUser();
    const navigate = useNavigate();

    const handleSubmitLogin = async (e) =>{
        e.preventDefault();


        if(!emailLogin)
        {
            document.querySelector("#message").innerHTML = "O Campo email é obrigatorio";
            return 
        }
        else if(!passwordLogin)
        {
            document.querySelector("#message").innerHTML = "O Campo senha é obrigatorio";
            return
        }

        const user = {
            email: emailLogin, password: passwordLogin, action:"login"
        }

        
        const authenticated = await login(user)

        if(!authenticated)
        {   
            document.querySelector("#message").innerHTML = "Usuário não autenticado";
        }
        else
        {
            window.location.reload()

            // navigate('/')
        }

        

    }

    const handleSubmitRegister = async(e) =>
    {
        e.preventDefault();

        if(!name)
        {
            document.querySelector("#message").innerHTML = "O Campo nome é obrigatorio";
            return 
        }
        else if(!email)
        {
            document.querySelector("#message").innerHTML = "O Campo email é obrigatorio";
            return
        }
        else if(!password)
        {
            document.querySelector("#message").innerHTML = "O Campo senha é obrigatorio";
            return
        }
        else if(!confirmPassword)
        {
            document.querySelector("#message").innerHTML = "O Campo confirmação da senha é obrigatorio";
            return
        }
        else if(password !== confirmPassword)
        {
            document.querySelector("#message").innerHTML = "As senhas não conferem";
            return
        }



        const user = {
            name, email, password, action:"register"
        }
        
        const authenticated = await registerUser(user)

        if(!authenticated)
        {   
            document.querySelector("#message").innerHTML = "Email já cadastrado";
        }
        else{

            // window.location.reload();

            // navigate('/')
        }
        
    }

    const handleSetParams = () => {
        setEmailLogin("admin@admin.com.br")
        setPasswordLogin("123123")
    }
    
  return (
    <>

    {!register ? 
    <div className={`${styles.user_container} container`}>
        <h1 className='mt-5'>Login - Lista de tarefas</h1>
        <hr />

        <div className={styles.user_info_form}>

            <div className={styles.user_info}>
                <h1>Faça login</h1>
                <p>Para acessar a lista de tarefas faça login.</p>
                <p>Uma opção seria acessar com usuário global, usando o link: <Link onClick={()=>{handleSetParams()}}>Clique aqui para usar usuário global</Link></p>
            </div>

            <form className={`${styles.form} `}  onSubmit={handleSubmitLogin}>
            <span><Link onClick={()=>{handleSetParams()}}>Clique aqui para usar usuário global</Link></span>
            <p id='message'></p>
            <div className={styles.div_input}>
                <label className="form-label">Email</label>
                <input type="email" id='email' className="form-control"
                defaultValue={emailLogin}
                onChange={(e)=>{setEmailLogin(e.target.value)}} />
            </div>
            <div className={styles.div_input}>
                <label className="form-label">Senha</label>
                <input type="password" id='password' className="form-control"
                defaultValue={passwordLogin}
                onChange={(e)=>{setPasswordLogin(e.target.value)}}
                />
            </div>
        
            <input type="submit" className={`btn btn-primary`} value="Entrar" />
            <p>Ainda não possuei cadastro ? <Link onClick={()=>{setRegister(true)}}>clique aqui</Link></p>
                
            </form>

        </div>
       

    </div>
      : ''}

    {register ?
             
             <div className={`${styles.user_container} container`}>
             <h1 className='mt-5'>Register - Lista de tarefas</h1>
             <hr />
     
             <div className={styles.user_info_form}>
     
                 <div className={styles.user_info}>
                     <h1>Registre-se</h1>
                     <p>Para acessar a lista de tarefas faça um registro.</p>
                     <p>Uma outra opção seria acessar sem registra-se, clicando no botão ao lado. <Link to="/">Entrar seu fazer login</Link></p>
                 </div>
     
                 <form className={`${styles.form} `}  onSubmit={handleSubmitRegister}>
                 <p id='message'></p>
                 <div className={styles.div_input}>
                     <label className="form-label">Nome</label>
                     <input type="text" id='description' className="form-control"
                     onChange={(e)=>{setName(e.target.value)}} />
                 </div>
                 <div className={styles.div_input}>
                     <label className="form-label">Email</label>
                     <input type="text" id='description' className="form-control"
                     onChange={(e)=>{setEmail(e.target.value)}} />
                 </div>
                 <div className={styles.div_input}>
                     <label className="form-label">Senha</label>
                     <input type="password" id='description' className="form-control"
                     onChange={(e)=>{setPassword(e.target.value)}} />
                 </div>
                 <div className={styles.div_input}>
                     <label className="form-label">Confirma Senha</label>
                     <input type="password" id='description' className="form-control"
                     onChange={(e)=>{setConfirmPassword(e.target.value)}}
                     />
                 </div>
             
                 <input type="submit" className={`btn btn-primary`} value="Registrar" />
                 <p>Ainda não possuei cadastro ? <Link onClick={()=>{setRegister(false)}}>clique aqui</Link></p>
                     
                 </form>
     
             </div>
         
    
         </div>


             :
             ''
        }
    </>
  )
}

export default User