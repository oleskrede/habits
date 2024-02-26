package com.example.habits

import com.example.common.randomString
import java.time.LocalDate

data class Page(
    val habits: List<Habit> = emptyList(),
    val id: Id = randomId(),
)

data class Habit(
    val name: String,
    val lastCompleted: LocalDate? = null,
    val id: Id = randomId(),
    private val lastMonthlyStreak: Int = 0,
    private val lastYearlyStreak: Int = 0,
) {
    private val completedYesterday = LocalDate.now().minusDays(1) == lastCompleted

    val completedToday = LocalDate.now() == lastCompleted
    val monthlyStreak = calculateMonthlyStreak()
    val yearlyStreak =calculateYearlyStreak()

    fun complete(): Habit {
        if (completedToday) return this
        return this.copy(
            lastCompleted = LocalDate.now(),
            lastMonthlyStreak = monthlyStreak + 1,
            lastYearlyStreak = yearlyStreak + 1
        )
    }

    private fun calculateMonthlyStreak() = when {
        lastCompleted == null -> 0
        lastCompleted.month != LocalDate.now().month -> 0
        completedToday || completedYesterday -> lastMonthlyStreak
        else -> 0
    }

    private fun calculateYearlyStreak() = when {
        lastCompleted == null -> 0
        lastCompleted.year != LocalDate.now().year -> 0
        completedToday || completedYesterday -> lastYearlyStreak
        else -> 0
    }
}

const val idMaxLength = 16
const val idMinLength = 8

@JvmInline
value class Id(val value: String) {
    init {
        require(value.length in idMinLength..idMaxLength) {
            "id must have between $idMinLength and $idMaxLength characters"
        }
    }
}


fun randomId() = Id(randomString(idMaxLength))