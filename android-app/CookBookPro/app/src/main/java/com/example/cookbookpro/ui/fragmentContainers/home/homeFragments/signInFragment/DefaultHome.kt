package com.example.cookbookpro.ui.fragmentContainers.home.homeFragments.signInFragment

import androidx.lifecycle.ViewModelProvider
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import com.example.cookbookpro.databinding.FragmentDefaultHomeBinding

class DefaultHome : Fragment() {

    companion object {
        fun newInstance() = DefaultHome()
    }

    private var _binding: FragmentDefaultHomeBinding? = null
    private val binding get() = _binding!!

    private lateinit var viewModel: DefaultHomeViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val defaultHomeViewModel =
            ViewModelProvider(this).get(DefaultHomeViewModel::class.java)

        _binding = FragmentDefaultHomeBinding.inflate(inflater, container, true)
        val root: View = binding.root
        val textView: TextView = binding.textHome
        defaultHomeViewModel.text.observe(viewLifecycleOwner) {
            textView.text = it
        }
        return root
/*  Used to return
        inflater.inflate(R.layout.fragment_default_home, container, false)
*/
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        viewModel = ViewModelProvider(this).get(DefaultHomeViewModel::class.java)
        // TODO: Use the ViewModel
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}