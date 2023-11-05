

export interface Page {
    id: number
    habits: Habit[]
}

export interface Habit {
    id: string
    name: string
    currentStreak: number
    lastCompleted: Date | undefined
    completedToday: boolean
}