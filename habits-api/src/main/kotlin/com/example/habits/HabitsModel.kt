package com.example.habits

import com.example.common.randomString
import java.time.LocalDate
import java.time.LocalDateTime

data class Page(
    val id: String = newId(),
    val lastUpdated: LocalDateTime = LocalDateTime.now(),
    val habits: List<Habit>,
) {
    companion object {
        fun newId() = randomString()
    }
}

data class Habit(
    val id: String = randomString(),
    val name: String,
    val completions: List<LocalDate> = emptyList(),
)

