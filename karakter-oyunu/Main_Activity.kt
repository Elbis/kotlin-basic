package com.example.kutai.kotlin_android

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.view.inputmethod.EditorInfo
import kotlinx.android.synthetic.main.activity_main.*
import org.jetbrains.anko.act

class Main_Activity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val char = karakter("", 50, 10, 20)
        tW_action.setText("Oyuna hoşgeldiniz! Lütfen bir aksiyon seçin!")
        fun goster() {


            tW_bilgi.setText(char.bilgiGetir())
        }
        goster()
        btn_yemek.setOnClickListener {
            tW_action.setText(char.yemek())
            goster()
        }
        btn_saldir.setOnClickListener {
            tW_action.setText(char.savas())
            tW_bilgi.setText(char.bilgiGetir())
        }
        btn_uyu.setOnClickListener {
            tW_action.setText(char.uyu())
            tW_bilgi.setText(char.bilgiGetir())
        }
        edt_char.setOnEditorActionListener() { v, actionId, event ->

            char.isim = edt_char.text.toString()
            goster()
            true


        }


    }
}
