package com.example.cookbookpro.ui.fragmentContainers.profile.profileFragments

import androidx.lifecycle.ViewModelProvider
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import com.example.cookbookpro.databinding.FragmentDefaultProfileBinding

class DefaultProfile : Fragment() {
    private var _binding: FragmentDefaultProfileBinding? = null
    private val binding get() = _binding!!
    companion object {
        fun newInstance() = DefaultProfile()
    }

    private lateinit var viewModel: DefaultProfileViewModel

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        val defaultProfileViewModel =
            ViewModelProvider(this).get(DefaultProfileViewModel::class.java)

        _binding = FragmentDefaultProfileBinding.inflate(inflater, container, false)
        val root: View = binding.root

        val textView: TextView = binding.textProfile
        defaultProfileViewModel.text.observe(viewLifecycleOwner) {
            textView.text = it
        }
        return root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        viewModel = ViewModelProvider(this).get(DefaultProfileViewModel::class.java)
        // TODO: Use the ViewModel
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

}