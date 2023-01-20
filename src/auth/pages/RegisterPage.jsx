import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Grid, TextField, Typography, Link } from '@mui/material'

import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks'

const formData = {
  email: 'adrian@gmail.com',
  password: '1234567',
  displayName: 'Adrian Lopera'
}

const formValidation = {
  email: [ (value) => value.includes('@') , 'El correo debe de contener una @.'],
  password: [ (value) => value.length >= 6 , 'La contraseña debe de tener 6 o más caracteres.'],
  displayName: [ (value) => value.length > 1 , 'Ingrese un nombre correcto.'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false)

  const { 
      formState, displayName, email, password, onInputChange, 
      isFormValid, displayNameValid, emailValid, passwordValid,
    } = useForm(formData, formValidation);

  const onSubmit = (event) =>{
    event.preventDefault();
    setFormSubmitted(true);

    if(!isFormValid) return;
    
    // 'Despachamos' y enviamos los datos (formState)
    dispatch( startCreatingUserWithEmailPassword(formState) );
  }

  return (
    
      <AuthLayout title='Crear una cuenta'>

        <form onSubmit={onSubmit}>

          <Grid container>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField name='displayName' value={displayName} onChange={onInputChange} 
                label="Nombre completo" type={'text'} placeholder="Nombre completo" fullWidth
                error={ !!displayNameValid } helperText={displayNameValid} />
              </Grid>
              
              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField name='email' value={email} onChange={onInputChange}
                label="Correo" type={'email'} placeholder="Correo@google.com" fullWidth
                error={ !!emailValid } helperText={emailValid} />
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField name='password' value={password} onChange={onInputChange}
                 label="Contraseña" type={'password'} placeholder="Contraseña" fullWidth
                 error={ !!passwordValid } helperText={passwordValid} />
              </Grid>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} >
                  <Button type='submit' variant='contained' fullWidth>
                    Crear cuenta
                  </Button>
                </Grid>
                
              </Grid>

          </Grid>

          <Grid container direction={'row'} justifyContent={'end'} sx={{ mt: 1 }}>
            
            <Link component={RouterLink} color='inherit' to="/auth/login">¿Ya tienes un usuario?</Link>
            
          </Grid>

        </form>

      </AuthLayout>
    
  )
}
