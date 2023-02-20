import {Grid, ImageList, ImageListItem} from '@mui/material';

export const ImageGallery = ({ photoUpload = [] }) => {

  return (
    <Grid container display={'flex'} justifyContent='center' alignItems={'center'} sx={{mt: 2}}>
        <ImageList sx={{ width: '95%', height: 450, borderRadius: 1 }} cols={4} rowHeight={200}>
        {photoUpload.map((image) => (
            <ImageListItem key={image}>
            <img
                src={`${image}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={image}
                loading="lazy"
            />
            </ImageListItem>
        ))}
        </ImageList>
    </Grid>
  );
}


