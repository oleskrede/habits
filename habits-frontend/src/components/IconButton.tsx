import styled from "styled-components";
import Icon from "./Icon";
import { VNode } from "preact";


const IconButtonWrapper = styled.button`
    background-color: transparent;
    border: none;
    color: #1D5B79; 
    cursor: pointer;
    &:hover {
        color: #468B97; 
    }
`

type Props = {
    icon: VNode
}

export function IconButton({icon}: Props) {
    return (
        <IconButtonWrapper>
            <Icon>
                {icon}
            </Icon>
        </IconButtonWrapper>
    )
}