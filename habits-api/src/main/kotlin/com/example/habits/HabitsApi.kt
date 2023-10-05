package com.example.habits

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.jetbrains.exposed.sql.*

fun Route.habitsApi(pageRepository: PageRepository) {
    route("/habits") {
        get {
            // Send user to a new instance
            call.respondRedirect("/habits/${Page.newId()}")
        }


        get("/{id}") {
            val id = call.parameters["id"] ?: throw IllegalArgumentException("Invalid ID")
            val page = pageRepository.read(id) ?: examplePage(id)
            call.respond(page)
        }


        put("/{id}") {
            val id = call.parameters["id"] ?: throw IllegalArgumentException("Invalid ID")
            val page = call.receive<Page>()
            pageRepository.update(page)
            call.respond(HttpStatusCode.OK)
        }

        // Delete user
        delete("/users/{id}") {
            // TODO: Replace with some form of garbage collection
            val id = call.parameters["id"] ?: throw IllegalArgumentException("Invalid ID")
            pageRepository.delete(id)
            call.respond(HttpStatusCode.OK)
        }
    }
}

private fun examplePage(id: String) = Page(
    id = id,
    habits = listOf(Habit(name = "Clean"), Habit(name = "Exercise"))
)