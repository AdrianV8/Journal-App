import { Navigate, Route, Routes } from "react-router-dom"

import { AuthRoutes } from "../auth/routes/AuthRoutes"

import { useCheckAuth } from "../hooks"
import { JournalRoutes } from "../journal/routes/JournalRoutes"
import { CheckingAuth } from "../ui"

export const AppRouter = () => {
  
  const {status} = useCheckAuth();

  if (status == 'checking' ){
    return <CheckingAuth/>
  }
  
  
  return ( 
    
    <Routes>
      {
        status === 'authenticated' 
        ? <Route path="/*" element={ <JournalRoutes/> } /> /* JournalApp */ 
        : <Route path="/auth/*" element={ <AuthRoutes/> } /> /* Login y Registro */
        
      }

      {/* Si el usuario entra en una ruta que no está autenticado */}
      <Route path="/*" element={<Navigate to={"/auth/login"}/>}/>
      
    </Routes>
    
  )
}
