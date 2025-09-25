import React from 'react';

interface ProductImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    width: number;
    height: number;
    random?: string | number;
    alt?: string;
    className?: string;
    style?: React.CSSProperties;
}

export default function ProductImage({
    width,
    height,
    random,
    alt = 'Product image',
    ...props
}: ProductImageProps) {
    const rnd =
        typeof random !== 'undefined'
            ? random
            : Math.floor(Math.random() * 100000);
    const src = `https://picsum.photos/${width}/${height}.webp?blur&random=${rnd}`;
    return (
        <img
            src={src}
            width={width}
            height={height}
            alt={alt}
            loading="lazy"
            {...props}
        />
    );
}
