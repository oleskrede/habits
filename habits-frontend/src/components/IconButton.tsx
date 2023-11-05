import { VNode } from "preact";
import styled from "styled-components";


const IconButtonWrapper = styled.button`
    background-color: transparent;
    border: none;
    // color: #1D5B79; 
    cursor: pointer;
    &:hover {
        // color: #468B97; 
        color: darkgrey;
    }
    padding: 0;
`

type Props = {
    icon: VNode
    onClick: () => void
}

export function IconButton({ icon, onClick }: Props) {
    return (
        <IconButtonWrapper>
            <div onClick={onClick} style={{ height: '2rem', width: '2rem' }}>
                {icon}
            </div>
        </IconButtonWrapper>
    )
}