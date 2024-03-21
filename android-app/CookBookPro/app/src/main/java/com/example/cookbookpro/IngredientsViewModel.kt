package com.example.cookbookpro

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class IngredientsViewModel : ViewModel() {
    private val ingredientsLists = MutableLiveData<List<List<Ingredient>>>()

    // Add functions here to add, update, delete ingredients/lists
}