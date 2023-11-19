package com.example.habits

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import java.time.LocalDate


class HabitsService(
    private val habitsRepository: HabitsRepository
) {

    suspend fun getPage(pageId: Id): Page {
        val habits = habitsRepository.getHabits(pageId)
        return Page(habits, pageId)
    }

    suspend fun createHabit(pageId: Id, habitName: String): Page {
        habitsRepository.createHabit(pageId, Habit(name = habitName) )
        val habits = habitsRepository.getHabits(pageId)
        return Page(habits, pageId)
    }

    suspend fun deleteHabit(pageId: Id, habitId: Id): Page {
        habitsRepository.deleteHabit(pageId, habitId )
        val habits = habitsRepository.getHabits(pageId)
        return Page(habits, pageId)
    }

    suspend fun completeHabit(pageId: Id, habitId: Id): Page {
        return newSuspendedTransaction(Dispatchers.IO) {
            val habit = habitsRepository.getHabit(pageId, habitId)
            val completedHabit = habit.complete()
            val updated = habitsRepository.updateHabit(pageId, completedHabit)
            if (updated != 1) {
                // TODO use logger
                println("Unexpected number of updates: $updated")
            }
            getPage(pageId)
        }
    }
}

