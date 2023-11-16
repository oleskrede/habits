package com.example.habits

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import java.time.LocalDate


class HabitsService(
    private val habitsRepository: HabitsRepository
) {

    init {
        runBlocking {
            // TODO dummy data on new page instead
            val tasks = listOf("Clean", "Read book", "Exercise", "Work on project", "Read email", "Call mom")
            val pageId = Id("VjfvTaWpa0GzaIaa")
            println("random id: $pageId")
            val habits = tasks
                .shuffled()
                .take(3)
                .map {
                    Habit(
                        name = it,
                        lastCompleted = LocalDate.now().minusDays(1),
                        lastStreak = (1..10).random()
                    )
                }
            habits.forEach { habitsRepository.createHabit(pageId, it) }
            habitsRepository.updateHabit(pageId, habits.random().complete())
        }
    }

    suspend fun getPage(pageId: Id): Page {
        val habits = habitsRepository.getHabits(pageId)
        return Page(habits, pageId)
    }

    suspend fun createHabit(pageId: Id, habitName: String): Page {
        habitsRepository.createHabit(pageId, Habit(name = habitName) )
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

