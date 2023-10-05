import { ComponentChildren } from "preact"
import { CSSProperties } from "preact/compat"

type Props = {
    style?: CSSProperties
    children: ComponentChildren
}

export function Icon({ style, children }: Props) {
    return (
        <div style={{ ...style, height: '2rem', width: '2rem' }}>
            {children}
        </div>
    )

}

export default Icon