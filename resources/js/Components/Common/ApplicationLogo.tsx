export default function ApplicationLogo(props: React.ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            {...props}
            src="/images/logo.webp"
            alt="Application Logo"
        />
    );
}
