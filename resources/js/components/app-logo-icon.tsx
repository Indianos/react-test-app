import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(
    props: ImgHTMLAttributes<HTMLImageElement>,
) {
    return <img {...props} src="/ARVATO.png" alt="App Logo" />;
}
