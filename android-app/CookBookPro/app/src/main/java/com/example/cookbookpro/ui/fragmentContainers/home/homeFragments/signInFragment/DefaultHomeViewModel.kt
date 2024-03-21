package com.example.cookbookpro.ui.fragmentContainers.home.homeFragments.signInFragment

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class DefaultHomeViewModel : ViewModel() {
    // TODO: Implement the ViewModel
    private val _text = MutableLiveData<String>().apply {
        value = "This is home Fragment"
    }
    val text: LiveData<String> = _text
}