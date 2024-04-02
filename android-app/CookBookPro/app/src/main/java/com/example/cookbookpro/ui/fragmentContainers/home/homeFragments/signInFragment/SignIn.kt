package com.example.cookbookpro.ui.fragmentContainers.home.homeFragments.signInFragment

import android.R.attr.bitmap
import android.R.attr.src
import android.app.Activity
import android.content.Intent
import android.graphics.BitmapFactory
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.lifecycleScope
import com.example.cookbookpro.R
import com.example.cookbookpro.signin.GoogleAuthUiClient
import com.example.cookbookpro.signin.SignInResult
import com.example.cookbookpro.signin.UserData
import com.google.android.gms.auth.api.identity.Identity
import kotlinx.coroutines.launch
import java.io.IOException
import java.net.HttpURLConnection
import java.net.URL


class SignIn : Fragment() {
    companion object {
        fun newInstance() = SignIn()
        private const val REQUEST_CODE_GOOGLE_SIGN_IN = 1001
    }

    private lateinit var viewModel: SignInViewModel
    private lateinit var googleAuthUiClient: GoogleAuthUiClient

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {


        return inflater.inflate(R.layout.fragment_sign_in, container, false)
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        viewModel = ViewModelProvider(this).get(SignInViewModel::class.java)
        // TODO: Use the ViewModel
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        // Initialize GoogleAuthUiClient
        googleAuthUiClient = GoogleAuthUiClient(
            context = requireContext(),
            oneTapClient = Identity.getSignInClient(requireContext())
        )

        val editTextEmail: EditText = view.findViewById(R.id.editTextTextEmailAddress)
        val editTextPassword: EditText = view.findViewById(R.id.editTextTextPassword)
        val buttonSignIn: Button = view.findViewById(R.id.signInButton)
        val googleSignIn: TextView = view.findViewById(R.id.googleSignIn)
        val signOut: Button = view.findViewById(R.id.signOutButton)
        if(googleAuthUiClient.getSignedInUser() == null){
            signOut.visibility = View.INVISIBLE
        }
        welcomeMessage()
        signOut.setOnClickListener {
            googleAuthUiClient.signOut()
            welcomeMessage()
        }

        buttonSignIn.setOnClickListener {
            signInWithGoogle()
            var userData = googleAuthUiClient.getSignedInUser()
            if (userData != null) {
                signOut.visibility = View.VISIBLE
            }

                    /*val email = editTextEmail.text.toString()
                val password = editTextPassword.text.toString()
                if(validateFields(email)){
                    (activity as? MainActivity)?.attemptSignIn(email, password)
                }
                else {
                    editTextEmail.setText("")
                    editTextEmail.setHintTextColor(Color.rgb(255, 66, 66));
                    editTextEmail.hint = "Invalid Email"
                }*/
        }

        googleSignIn.setOnClickListener {
            signInWithGoogle()
        }
    }
    fun welcomeMessage(){
        val welcomeMessage: TextView? = view?.findViewById(R.id.welcomeMessage)
        val userData = googleAuthUiClient.getSignedInUser()
        if (welcomeMessage != null) {
            if (userData != null) {
                welcomeMessage.text = "Welcome ${userData.userName}"
            }
            else {
                welcomeMessage.text = "Please Sign In"
            }
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == REQUEST_CODE_GOOGLE_SIGN_IN) {
            if (resultCode == Activity.RESULT_OK) {
                lifecycleScope.launch {
                    val signInResult = googleAuthUiClient.signInWithIntent(data ?: return@launch)
                    handleSignInResult(signInResult)
                }
            }
        }
    }

    private fun handleSignInResult(signInResult: SignInResult) {
        // Handle the sign-in result
    }

    private fun signInWithGoogle() {
        lifecycleScope.launch {
            val signInIntentSender = googleAuthUiClient.signIn()
            signInIntentSender?.let {
                startIntentSenderForResult(
                    it, REQUEST_CODE_GOOGLE_SIGN_IN, null, 0, 0, 0, null
                )
            }
        }
    }


    private fun validateFields(email: String): Boolean{
        val emailPattern = "^[A-Za-z0-9+_.-]+@(.+)$"
        return !(email.isEmpty() || !email.matches(emailPattern.toRegex()))
    }
}