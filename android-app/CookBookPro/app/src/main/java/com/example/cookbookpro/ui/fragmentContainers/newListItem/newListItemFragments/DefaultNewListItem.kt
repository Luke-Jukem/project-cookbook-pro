package com.example.cookbookpro.ui.fragmentContainers.newListItem.newListItemFragments

import androidx.lifecycle.ViewModelProvider
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import com.example.cookbookpro.databinding.FragmentDefaultNewListItemBinding

class DefaultNewListItem : Fragment() {

    companion object {
        fun newInstance() = DefaultNewListItem()
    }
    private var _binding: FragmentDefaultNewListItemBinding? = null
    private val binding get() = _binding!!

    private lateinit var viewModel: DefaultNewListItemViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val defaultNewListItemViewModel =
            ViewModelProvider(this).get(DefaultNewListItemViewModel::class.java)

        _binding = FragmentDefaultNewListItemBinding.inflate(inflater, container, false)
        val root: View = binding.root
        val textView: TextView = binding.textNewListItem
        defaultNewListItemViewModel.text.observe(viewLifecycleOwner) {
            textView.text = it
        }
        return root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        viewModel = ViewModelProvider(this).get(DefaultNewListItemViewModel::class.java)
        // TODO: Use the ViewModel
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

}