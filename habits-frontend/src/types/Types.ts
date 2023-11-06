

export interface HabitsData {
    id: string
    habits: Habit[]
}

export interface Habit {
    id: string
    name: string
    currentStreak: number
    lastCompleted: Date | undefined
    completedToday: boolean
}

export enum Page {
    MAIN, EDIT
}