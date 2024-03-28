package com.example.cookbookpro

import android.content.ContentValues.TAG
import android.content.Intent
import android.content.IntentSender
import android.os.Bundle
import android.util.Log
import com.google.android.material.bottomnavigation.BottomNavigationView
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.setupWithNavController
import com.example.cookbookpro.databinding.ActivityMainBinding
import com.google.android.gms.auth.api.identity.BeginSignInRequest
import com.google.android.gms.auth.api.identity.Identity
import com.google.android.gms.auth.api.identity.SignInClient
//import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.firebase.Firebase
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import com.google.firebase.auth.GoogleAuthProvider
import com.google.firebase.auth.auth
import com.google.firebase.initialize

class MainActivity : AppCompatActivity() {
    //git commit test
    private lateinit var binding: ActivityMainBinding
    private lateinit var auth: FirebaseAuth
    private lateinit var oneTapClient: SignInClient
    private lateinit var signInRequest: BeginSignInRequest
    private val REQ_ONE_TAP = 2  // Can be any integer unique to the Activity
    private var showOneTapUI = true

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val navView: BottomNavigationView = binding.navView
        val navController = findNavController(R.id.nav_host_fragment_activity_main)
        // Passing each menu ID as a set of Ids because each
        // menu should be considered as top level destinations.
        val appBarConfiguration = AppBarConfiguration(
            setOf( //set of the containerFragmentViews
                R.id.navigation_home, R.id.navigation_profile, R.id.navigation_notifications
            )
        )
        //setupActionBarWithNavController(navController, appBarConfiguration)
        navView.setupWithNavController(navController)
        Firebase.initialize(this)
        // Initialize Firebase Auth
        auth = Firebase.auth

    }

    fun navigateToList(){
        val navController = findNavController(R.id.nav_host_fragment_activity_main)
        navController.navigate(R.id.navigation_ingredient_list)
    }

    fun checkAuthentication(): Boolean {
        val currentUser = auth.currentUser
        println("PRE-AUTHENTICATION")
        if (currentUser != null) {
            println("Authenticated!!!")
            return true
        }
        else{
            println("UnAuthenticated!!!")
            return false
        }
    }
    public override fun onStart() {
        super.onStart()
        attemptSignIn("","")
        // Check if user is signed in (non-null) and update UI accordingly.
        /*if(!checkAuthentication()){
            val navController = findNavController(R.id.nav_host_fragment_activity_main)
            navController.navigate(R.id.navigation_sign_in)
        }*/
    }
    private fun reload(user: FirebaseUser?) {
    }

    fun attemptSignIn(email: String, password: String): Boolean {
        return true
    }
}