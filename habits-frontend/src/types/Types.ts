

export interface Page {
    id: number
    habits: Habit[]
}

export interface Habit {
    id: string
    name: string
    completions: Date[]
}