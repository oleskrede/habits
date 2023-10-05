import { ComponentChildren } from "preact"

type Props = {
    children: ComponentChildren
}

export function Icon({ children }: Props) {
    return (
        <div style={{ height: '2rem', width: '2rem' }}>
            {children}
        </div>
    )

}

export default Icon