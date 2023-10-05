import { CheckCircleIcon, Cog6ToothIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from "preact/hooks";
import { Page } from '../types/Types';
import { habitsApiUrl } from '../utils/utils';
import Icon from './Icon';
import { Loader } from './Loader';

type Props = {
    id: string
}

export function Habits({ id }: Props) {
    const [page, setPage] = useState<Page | undefined>(undefined)

    useEffect(() => {
        fetch(`${habitsApiUrl}/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response status was ${response.status}`);
                }
                return response.json();
            })
            .then((data: Page) => {
                setPage(data);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    if (!page) {
        return <Loader />
    }

    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", "justifyContent": "space-between" }}>
                <Icon ><Cog6ToothIcon /> </Icon>
                Habits
                <Icon ><PlusCircleIcon /> </Icon>
            </div>
            <div style={{ margin: "1rem 1rem" }}>__________ Day picker goes here __________</div>

            {page.habits.map((habit, index) => (
                <div key={index} style={{ display: "flex" }}>
                    <button><Icon><CheckCircleIcon /></Icon></button><p>{habit.name}</p>
                </div>
            ))}
        </div>
    )
}