package com.example.cookbookpro.ui.fragmentContainers.newListItem.newListItemFragments

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class DefaultNewListItemViewModel : ViewModel() {
    // TODO: Implement the ViewModel
    private val _text = MutableLiveData<String>().apply {
        value = "This is NewListItem Fragment"
    }
    val text: LiveData<String> = _text
}