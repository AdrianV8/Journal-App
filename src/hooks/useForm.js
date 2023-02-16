import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [formValidation, setFormValidation] = useState({});
    
    useEffect(() => {
      createValidator();
    }, [formState])

    //Este useEffect se usará para cambiar el contenido del formulario al escoger una nota u otra.
    useEffect(() => {
        // Si el formulario cambia, que vuelva a llamar al formulario
        setFormState(initialForm)
    }, [initialForm])

    const isFormValid = useMemo( () => {
        /**
         * Si algunos de los campos es distinto a null (null = no hay errores)
         * devolverá un 'no válido', sino, será válido
         */
        for (const formValue of Object.keys( formValidation )) {
            if( formValidation[formValue] !== null ) return false;
        }
        return true;
    }, [formState] )
    
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidator = () =>{
        
        const formCheckedValues = {};

        // Validar cada campo del formulario
        for (const formField of Object.keys(formValidations)) {
            // console.log(formField);

            const [fn, errorMessage = 'Error desconocido.'] = formValidations[formField];
            
            formCheckedValues[`${formField}Valid`] = fn( formState[formField] ) ? null : errorMessage;

            setFormValidation( formCheckedValues );
            // console.log(formCheckedValues);
        }
        
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid
    }
}