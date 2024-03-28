package com.example.cookbookpro.ui.fragmentContainers.home.homeFragments.signInFragment

import android.graphics.Color
import androidx.lifecycle.ViewModelProvider
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import com.example.cookbookpro.MainActivity
import com.example.cookbookpro.R

    class SignIn : Fragment() {

        companion object {
            fun newInstance() = SignIn()
        }

        private lateinit var viewModel: SignInViewModel

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

            val editTextEmail: EditText = view.findViewById(R.id.editTextTextEmailAddress)
            val editTextPassword: EditText = view.findViewById(R.id.editTextTextPassword)
            val buttonSignIn: Button = view.findViewById(R.id.signInButton)
            val googleSignIn: TextView = view.findViewById(R.id.googleSignIn)

            buttonSignIn.setOnClickListener {
                val email = editTextEmail.text.toString()
                val password = editTextPassword.text.toString()
                if(validateFields(email)){
                    (activity as? MainActivity)?.attemptSignIn(email, password)
                }
                else {
                    editTextEmail.setText("")
                    editTextEmail.setHintTextColor(Color.rgb(255, 66, 66));
                    editTextEmail.hint = "Invalid Email"
                }
            }

            googleSignIn.setOnClickListener {

            }
        }

        private fun validateFields(email: String): Boolean{
            val emailPattern = "^[A-Za-z0-9+_.-]+@(.+)$"
            return !(email.isEmpty() || !email.matches(emailPattern.toRegex()))
        }
    }