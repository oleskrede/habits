package com.example.habits

import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.habitsApi(habitsService: HabitsService) {
    route("/habits") {
        get {
            // Send user to a new instance
            call.respondRedirect("/habits/${randomId()}")
        }

        post {
            val dto = call.receive<CreateHabitDto>()
            val page = habitsService.createHabit(Id(dto.pageId), dto.habitName)
            call.respond(page)
        }

        get("/{id}") {
            val id = Id(call.parameters["id"] ?: throw IllegalArgumentException("Invalid ID"))
            val page = habitsService.getPage(id)
            call.respond(page)
        }

        post("/complete-habit") {
            val dto = call.receive<HabitDto>()
            val page = habitsService.completeHabit(Id(dto.pageId), Id(dto.habitId))
            call.respond(page)
        }

        post("/delete-habit") {
            val dto = call.receive<HabitDto>()
            val page = habitsService.deleteHabit(Id(dto.pageId), Id(dto.habitId))
            call.respond(page)
        }
    }
}

data class HabitDto(
    val pageId: String,
    val habitId: String,
)

data class CreateHabitDto(
    val pageId: String,
    val habitName: String,
)