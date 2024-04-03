package com.example.cookbookpro.signin

data class SignInState(
        val isSignInSuccessful: Boolean = false,
        val signInError: String? = null
)
