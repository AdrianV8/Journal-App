import { useMemo, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"

import { useForm } from "../../hooks"
import { ImageGallery } from "../components"
import { setActiveNote, startSavingNote } from "../../store/journal"

export const NoteView = () => {

    const dispatch = useDispatch();

    // Rescatar la nota activa para usarla en el useForm
    const { active:note } = useSelector( state => state.journal );
    
    const { body, title, date, onInputChange, formState } = useForm(note);

    // Obtener la fecha de la nota
    const dateString = useMemo(() => {
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const newDate = new Date(date).toLocaleDateString('es-ES', options)
        return newDate;
    },[date]);

    // Cuando cualquier propiedad del formState cambie, despachamos la nota activa
    useEffect(() => {
        dispatch( setActiveNote(formState) )
    }, [formState]) 
    
    const onSaveNote = () => {
        dispatch( startSavingNote() )
    }

  return (
    <Grid container direction={'row'} justifyContent='space-between' alignItems={'center'} sx={{mb: 1}}>
        <Grid item>
            <Typography fontSize={39} fontWeight='light'> { dateString } </Typography>
        </Grid>
        <Grid item>
            <Button onClick={onSaveNote} color="primary" sx={{p: 2}}> 
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
                name='title'
                value={title}
                onChange={onInputChange}
            />
            <TextField 
                type={'text'}
                variant="filled"
                fullWidth
                multiline
                placeholder="Cuéntame tu día"
                sx={{border: 'none', mb: 1}}
                minRows={5}
                name='body'
                value={body}
                onChange={onInputChange}
            />
        </Grid>

        {/* Img gallery */}

        <ImageGallery/>

    </Grid>
  )
}
