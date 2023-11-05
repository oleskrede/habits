package com.example.habits

import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.habitsApi(habitsService: HabitsService) {
    route("/habits") {
        get {
            // Send user to a new instance
            call.respondRedirect("/habits/${randomId()}")
        }


        get("/{id}") {
            val id = Id(call.parameters["id"] ?: throw IllegalArgumentException("Invalid ID"))
            val page = habitsService.getPage(id)
            call.respond(page)
        }

        // Complete task
        post("/complete-habit") {
            val dto = call.receive<CompleteHabitDto>()
            val page = habitsService.completeHabit(Id(dto.pageId), Id(dto.habitId))
            call.respond(page)
        }
    }
}

data class CompleteHabitDto(
    val pageId: String,
    val habitId: String,
)