package com.example

import com.example.habits.HabitsService
import com.example.habits.HabitsRepository
import org.jetbrains.exposed.sql.Database

class Context {
    private val database = Database.connect(
        url = Config.dbUrl,
        user = Config.dbUser,
        driver = Config.dbDriver,
        password = Config.dbPassword,
    )

    val habitsRepository = HabitsRepository(database)
    val habitsService = HabitsService(habitsRepository)
}