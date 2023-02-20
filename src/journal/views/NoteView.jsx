import { useMemo, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { SaveOutlined, UploadFile, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'

import { useForm } from "../../hooks"
import { ImageGallery } from "../components"
import { setActiveNote, startSavingNote, startUploadingFiles } from "../../store/journal"
import { useRef } from "react"

export const NoteView = () => {

    const dispatch = useDispatch();

    // Rescatar la nota activa para usarla en el useForm
    const { active:note, messageSave, isSaving, active } = useSelector( state => state.journal ); 
    const { body, title, date, onInputChange, formState } = useForm(note);
    
    // Obtener la fecha de la nota
    const dateString = useMemo(() => {
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const newDate = new Date(date).toLocaleDateString('es-ES', options)
        return newDate;
    },[date]);

    // Referencia al input para subir archivos
    const fileInputRef = useRef();

    // Cuando cualquier propiedad del formState cambie, despachamos la nota activa
    useEffect(() => {
        dispatch( setActiveNote(formState) )
    }, [formState]) 

    // Mensaje de actualizacion de nota
    useEffect(() => {
        if(messageSave.length > 0){
            Swal.fire('Nota actualizada', messageSave, 'success');
        }
    }, [messageSave])
    
    // Función para capitalizar la primera letra de la fecha o de cualquier string
    const capitalizarPrimeraLetra = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    const onSaveNote = () => {
        dispatch( startSavingNote() )
    }

    const onFileInputChange = ({target}) => {
        if(target.files === 0) return;
        dispatch(startUploadingFiles( target.files ))
    }

  return (
    <Grid container direction={'row'} justifyContent='space-between' alignItems={'center'} sx={{mb: 1}}>
        <Grid item>
            <Typography fontSize={32} fontWeight='light'> { capitalizarPrimeraLetra(dateString) } </Typography>
        </Grid>
        <Grid item>

            <input
                type={'file'}
                multiple
                ref={fileInputRef}
                onChange={ onFileInputChange }
                style={{ display:'none' }}
            />

            <IconButton
                color="primary"
                disabled={isSaving}
                onClick={ () => fileInputRef.current.click() }
            >
                <UploadOutlined/>
            </IconButton>

            <Button 
                disabled={ isSaving }
                onClick={onSaveNote} 
                color="primary" 
                sx={{p: 2}}> 
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

        <ImageGallery photoUpload={note.imageUrls}/>

    </Grid>
  )
}
