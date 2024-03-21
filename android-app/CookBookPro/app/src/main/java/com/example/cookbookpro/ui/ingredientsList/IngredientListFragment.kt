package com.example.cookbookpro.ui.ingredientsList

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.cookbookpro.Ingredient
import com.example.cookbookpro.IngredientsAdapter
import com.example.cookbookpro.R
import com.example.cookbookpro.databinding.FragmentIngredientListBinding

class IngredientListFragment : Fragment() {

    private var _binding: FragmentIngredientListBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    private lateinit var recyclerView: RecyclerView
    private lateinit var adapter: IngredientsAdapter
    private var ingredients: List<Ingredient> = listOf() // The ingredient list
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
//        return super.onCreateView(inflater, container, savedInstanceState)

        _binding = FragmentIngredientListBinding.inflate(inflater, container, false)
        val root: View = binding.root
        val recyclerView: RecyclerView = binding.ingredientsRecyclerView
        createList(recyclerView, this)
        return root
    }

    private fun createList(
        recyclerView: RecyclerView,
        ingredientListFragment: IngredientListFragment
    ) {

        this.recyclerView = recyclerView //find the view from the xml
        this.recyclerView.layoutManager = LinearLayoutManager(ingredientListFragment.context) //set a layout manager

        //Create a list of ingredients to display
        ingredients = listOf(
            Ingredient("Tomato", 2.0, "pcs"),
            Ingredient("Salt", 1.0, "tbsp")
        )

        adapter = IngredientsAdapter(ingredients) //find the custom adapter
        this.recyclerView.adapter = adapter //set the custom adapater to the view
    }


    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}