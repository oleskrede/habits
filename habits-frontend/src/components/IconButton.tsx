import { PlusCircleIcon } from "@heroicons/react/24/solid";
import Icon from "./Icon";
import styled from "styled-components";


const IconButtonWrapper = styled.button`
    background-color: transparent;
    border: none;
    color: red; 
    cursor: pointer;
    &:hover {
        color: darkred; 
    }
`

export function IconButton() {
    return (
        <IconButtonWrapper>
            <Icon>
                <PlusCircleIcon />
            </Icon>
        </IconButtonWrapper>
    )
}