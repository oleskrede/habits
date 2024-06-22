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
    private val lastStreak: Int = 0,
) {
    val currentStreak = updatedStreak()

    fun complete(): Habit {
        if (hasBeenCompletedToday()) {
            return this
        }
        return this.copy(lastCompleted = LocalDate.now(), lastStreak = currentStreak + 1)
    }

    private fun hasBeenCompletedToday() = LocalDate.now() == lastCompleted

    private fun updatedStreak(): Int {
        val now = LocalDate.now()
        val lastCompletedThisMonth = now.year == lastCompleted?.year && now.month == lastCompleted.month
        return if (lastCompletedThisMonth) lastStreak else 0
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