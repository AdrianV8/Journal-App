import { Link as RouterLink } from 'react-router-dom'
import { Google } from '@mui/icons-material'
import { Button, Grid, TextField, Typography, Link } from '@mui/material'
import React from 'react'
import { AuthLayout } from '../layout/AuthLayout'

export const RegisterPage = () => {
  return (
    
      <AuthLayout title='Crea una cuenta'>
        
        <form>

          <Grid container>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField label="Nombre completo" type={'text'} placeholder="Nombre completo" fullWidth/>
              </Grid>
              
              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField label="Correo" type={'email'} placeholder="Correo@google.com" fullWidth/>
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField label="Contraseña" type={'password'} placeholder="Contraseña" fullWidth/>
              </Grid>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} >
                  <Button variant='contained' fullWidth>
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
