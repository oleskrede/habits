package com.example.common

private val charPool: List<Char> = ('a'..'z') + ('A'..'Z') + ('0'..'9')

fun randomString(length: Int) = List(length) { charPool.random() }.joinToString("")
