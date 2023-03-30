
import React, { FC } from 'react';
import { Slide } from 'react-slideshow-image';
import styles from './ProductSlideShow.module.css';

interface Props {
  slideImages: string[]
}

export const ProductSlideshow: FC< Props > = ({ slideImages }) => {
  return (
    <Slide
      easing='ease'
      duration={ 7000 }
      indicators
    >
         {
          slideImages.map((image, index) => {

            const urlImage = `/products/${ image }`;

            return (
              <div 
                className={ styles['each-slide'] }
                key={ index }
                >
                  <div 
                  style={{
                    backgroundImage: `url(${ urlImage })`,
                    backgroundSize: 'cover',
                    // backgroundRepeat: 'no-repeat'
                  }} />

              </div>
            )
          }
          )
          } 
    </Slide>
  )
}
