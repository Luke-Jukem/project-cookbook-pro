package com.example.cookbookpro

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.cookbookpro.databinding.IngredientItemBinding

class IngredientsAdapter(private val ingredients: List<Ingredient>) : RecyclerView.Adapter<IngredientsAdapter.ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {

        val binding = IngredientItemBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return ViewHolder(binding)

    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bind(ingredients[position])
    }

    override fun getItemCount() = ingredients.size

    class ViewHolder(private val binding: IngredientItemBinding) : RecyclerView.ViewHolder(binding.root) {
        fun bind(ingredient: Ingredient) {
            binding.ingredientName.text = ingredient.name
            binding.ingredientQuantity.text = "${ingredient.quantity} ${ingredient.unit}"
        }
    }
}