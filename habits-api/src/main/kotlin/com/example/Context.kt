package com.example

import com.example.habits.HabitsService
import com.example.habits.HabitsRepository
import org.jetbrains.exposed.sql.Database

class Context {
    private val config = loadConfig()
    private val database = Database.connect(
        url = config.dbUrl,
        user = config.dbUser,
        driver = config.dbDriver,
        password = config.dbPassword,
    )

    val habitsRepository = HabitsRepository(database)
    val habitsService = HabitsService(habitsRepository)
}