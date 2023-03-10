
export const fileUpload = async( file ) => {
    // if(!file) throw new Error('No hay ningún archivo para subir.')
    if(!file) return null;

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dtfudgpoh/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'react_journal');
    formData.append('file', file);

    try {

        const resp = await fetch(cloudUrl, { 
            method: 'POST',
            body: formData
        });

        // console.log(resp);
        if( !resp.ok ) throw new Error('No se ha podido subir la imagen');

        const cloudResp = await resp.json();
        // console.log( cloudResp );
        
        return cloudResp.secure_url

    } catch (error) {
        // throw new Error(error.message);
        return null;
    }

}