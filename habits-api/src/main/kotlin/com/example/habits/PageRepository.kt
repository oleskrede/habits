package com.example.habits

import com.example.common.fromJson
import com.example.common.toJson
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.json.jsonb
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.transactions.transaction


class PageRepository(database: Database) {
    object DbPage : Table() {
        val id = varchar("id", length = 16)
        val habits = jsonb<List<Habit>>("habits", ::toJson, ::fromJson)

        override val primaryKey = PrimaryKey(id)
    }

    init {
        transaction(database) { SchemaUtils.create(DbPage) }
    }

    private suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    suspend fun create(page: Page): String = dbQuery {
        DbPage.insert {
            it[id] = page.id
            it[habits] = page.habits
        }[DbPage.id]
    }

    suspend fun read(id: String): Page? = dbQuery {
        DbPage.select { DbPage.id eq id }
            .map { Page(id = it[DbPage.id], habits = it[DbPage.habits]) }
            .singleOrNull()
    }

    suspend fun update(page: Page) = dbQuery {
        DbPage.update({ DbPage.id eq page.id }) {
            it[habits] = page.habits
        }
    }

    suspend fun delete(id: String) = dbQuery {
        DbPage.deleteWhere { DbPage.id.eq(id) }
    }
}
