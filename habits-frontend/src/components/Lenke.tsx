type Props = {
    url: string
    text: string
    style: {}
}

export function Lenke({ url, text, style }: Props) {
    return (
        <a href={url} style={{ textDecoration: 'inherit', ...style }}>
            {text}
        </a>
    )
}

export default Lenke