package com.example

import com.example.habits.PageRepository
import org.jetbrains.exposed.sql.Database

class Context {
    private val config = loadConfig()
    private val database = Database.connect(
        url = config.dbUrl,
        user = config.dbUser,
        driver = config.dbDriver,
        password = config.dbPassword,
    )

    val pageRepository = PageRepository(database)
}