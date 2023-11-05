package com.example.habits

import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.javatime.date
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.transactions.transaction

class HabitsRepository(database: Database) {

    object DbHabit : Table() {
        val id = varchar("id", length = idMaxLength)
        val pageId = varchar("page_id", length = idMaxLength)
        val name = varchar("name", length = 60)
        val currentStreak = integer("current_streak")
        val lastCompleted = date("last_completed").nullable()

        override val primaryKey = PrimaryKey(pageId, id)
    }

    init {
        transaction(database) {
            SchemaUtils.create(DbHabit)
        }
    }

    private suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    suspend fun createHabit(pageIdParam: Id, habit: Habit): String = dbQuery {
        DbHabit.insert {
            it[pageId] = pageIdParam.value
            it[id] = habit.id.value
            it[name] = habit.name
            it[currentStreak] = habit.currentStreak
            it[lastCompleted] = habit.lastCompleted
        }[DbHabit.id]
    }

    suspend fun updateHabit(pageIdParam: Id, habit: Habit): Int = dbQuery {
        DbHabit.update({ (DbHabit.pageId eq pageIdParam.value) and (DbHabit.id eq habit.id.value) }) {
            it[name] = habit.name
            it[currentStreak] = habit.currentStreak
            it[lastCompleted] = habit.lastCompleted
        }
    }

    suspend fun getHabit(pageId: Id, habitId: Id): Habit = dbQuery {
        DbHabit.select { (DbHabit.pageId eq pageId.value) and (DbHabit.id eq habitId.value) }
            .map { it.toHabit() }
            .single()
    }

    suspend fun getHabits(pageId: Id): List<Habit> = dbQuery {
        DbHabit.select { DbHabit.pageId eq pageId.value }
            .map { it.toHabit() }
    }
}

private fun ResultRow.toHabit() = Habit(
    id = Id(this[HabitsRepository.DbHabit.id]),
    name = this[HabitsRepository.DbHabit.name],
    lastStreak = this[HabitsRepository.DbHabit.currentStreak],
    lastCompleted = this[HabitsRepository.DbHabit.lastCompleted],
)