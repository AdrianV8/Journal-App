import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"

export const NotView = () => {
  return (
    <Grid container direction={'row'} justifyContent='space-between' alignItems={'center'} sx={{mb: 1}}>
        <Grid item>
            <Typography fontSize={39} fontWeight='light'> 23 </Typography>
        </Grid>
        <Grid item>
            <Button color="primary" sx={{p: 2}}> 
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
            </Button>
        </Grid>
        <Grid container>
            <TextField 
                type={'text'}
                variant="filled"
                fullWidth
                placeholder="Título"
                label="Titulo"
                sx={{border: 'none', mb: 1}}
            />
            <TextField 
                type={'text'}
                variant="filled"
                fullWidth
                multiline
                placeholder="Cuéntame tu día"
                sx={{border: 'none', mb: 1}}
                minRows={5}
            />
        </Grid>

        {/* Img gallery */}

        <ImageGallery/>

    </Grid>
  )
}
