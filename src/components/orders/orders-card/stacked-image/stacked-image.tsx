import React, { FC } from 'react';
import styles from './stacked-image.module.css';

type TStackedImage = {
	image: string;
	alt: string;
}

export const StackedImage: FC<TStackedImage> = ({ image, alt }) => {

	return (
		<div className={styles.border}>
			<div className={styles.item}>
				<img className={styles.img} src={image} alt={alt} />
			</div>
		</div>
	)
}
