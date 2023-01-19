import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Button, Grid, TextField, Typography, Link } from '@mui/material'
import { Google } from '@mui/icons-material'

import { AuthLayout } from '../layout/AuthLayout'

import { useForm } from '../../hooks/useForm'
import { checkingAuthentication, startGoogleSingIn } from '../../store/auth/thunks'

export const LoginPage = () => {

  const { status } = useSelector( state => state.auth );
  const isAuthenticating = useMemo( () => status === true, [status] );

  // Dispatch para el login
  const disPatch = useDispatch();

  const { email, password, onInputChange } = useForm({
    email: 'adrian@gmail.com',
    password: 12345,
  });

  const onSubmit = (event) =>{
    event.preventDefault();

    console.log(email, password);
    disPatch( checkingAuthentication() );
  }

  const onGoogleSignIn = () => {
    disPatch(startGoogleSingIn());
  }


  return (
    
      <AuthLayout title='Login'>
        
        <form onSubmit={ onSubmit }>

          <Grid container>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField name='email' value={email} onChange={onInputChange} label="Correo" type={'email'} placeholder="Correo@google.com" fullWidth/>
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField name='password' value={password} onChange={onInputChange} label="Contraseña" type={'password'} placeholder="Contraseña" fullWidth/>
              </Grid>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <Button type='submit' variant='contained' fullWidth disabled={isAuthenticating}>
                    Login
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button onClick={onGoogleSignIn} variant='contained' fullWidth disabled={isAuthenticating}>
                    <Google/>
                    <Typography sx={{ ml: 1 }}>Google</Typography>
                  </Button>
                </Grid>
                
              </Grid>

          </Grid>

          <Grid container direction={'row'} justifyContent={'end'} sx={{ mt: 1 }}>
            
            <Link component={RouterLink} color='inherit' to="/auth/register">Crear una cuenta</Link>
            
          </Grid>

        </form>

      </AuthLayout>
    
  )
}
