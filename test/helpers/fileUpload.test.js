import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "../../src/helpers/fileUpload"

cloudinary.config({
    cloud_name:'dtfudgpoh',
    api_key: '494242451331497',
    api_secret: 'imSJLQC40NWXm0tMgT6iuk2Z8q0',
    secure: true

})


describe('Prueba de fileUpload', () => {

    test('Should upload correctly file to Cloudinary and delete afeter', async() => { 
    
        const imgUrl = 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/29vfowhNB6MLBBkIMyvWmG/a8cc72ded8efe648be8463460571cb90/R6M_Stamp-Banner_960x540-Blog.jpg'
        const resp = await fetch(imgUrl);
        const blop = await resp.blob();
        const file = new File([blop], 'foto.png');

        const url = await fileUpload( file )
        expect(typeof url).toBe('string');
        
        // Obtener el id de la imágen para posteriormente borrarla
        const segments = url.split('/');
        const imgId = segments[ segments.length - 1 ].replace('.jpg','');
        
        // Apuntar directamente al directorio del proyecto
        await cloudinary.api.delete_resources([ 'journal-app/' + imgId ]);
        
    });

    test('Should return null', async() => { 
    
        const file = new File([], 'foto.png');
        const url = await fileUpload( file )
        expect( url ).toBe(null);
        
    });



})