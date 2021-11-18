import React from 'react'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
/* import 'animate.css'; */

const Notification = () => {
    return (
       
 <div className="app-container">
      <ReactNotification />
      <NotificationContenu />
    </div>
            
      
    )
}

const NotificationContenu =()=>{
    const handleClickDefault=()=>{
        store.addNotification({
           /* content:MyNotify, */
           title:'titre1',
           message:'you manager valid your task',
            type:'info',
            container:'top-right',
            insert:'top',
            animationIn:['animated','fadeIn'],
            animationOut:['animated','fadeout'],
             dismiss:{
                 duration:8000,
              showIcon:true
            }, 
            width:600
        })
    }
return(
    <div>

        <button onClick={handleClickDefault}>default</button>
    </div>

)

}
/* const MyNotify=()=>{
    return(
        <div>
            <h3>darine ! tu as une notification</h3>
        </div>
    )
} */

export default Notification

