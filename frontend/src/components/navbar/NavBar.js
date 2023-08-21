import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NavBar.module.css'
import { useUser } from '../../hooks/useUser'

const NavBar = () => {
    const {logout, authenticated} = useUser();

  return (
    <>
    {authenticated ?    
        <header className={styles.header}>
        <ul>
            <li>
                <Link onClick={()=>{logout()}}>Sair</Link>
            </li>      
        </ul>
        </header>
    :
    ''
    }
    </>
    
  )
}

export default NavBar