package com.example.kutai.kotlin_android

/**
 * Created by kutai on 19.10.2017.
 */
class karakter(var isim: String?, var kilo : Int, var hareketSayisi: Int, var saldiriGucu: Int)  {

    fun yemek(): String{
        if(hareketSayisi>0){
            kilo+=1
            hareketSayisi-=1
            if(isim!="") return ("$isim yemek yedi, kilosu arttı!")
            else return "Karakter yemek yedi, kilosu arttı!"

        }
        else return ("Hareket Hakkınız Yok!")
    }
    fun uyu(): String{
        if(hareketSayisi>0){
            hareketSayisi-=1
            saldiriGucu+=1
            if (isim!="")return ("$isim Uyudu.")
            else return ("Karakter uyudu.")

        }
        else return ("Hareket Hakkınız Yok!")
    }
    fun savas(): String{
        if (hareketSayisi>0){
            hareketSayisi-=1
            if (isim!="") return "$isim savaştı!"
            else return "Karakter savaştı!"


        }
        else return "Hareket Hakkınız Yok!"
    }
    fun bilgiGetir(): String{
        if (isim!=""){
            return "Karakter Adı: ${isim}\n" +
                    "Kalan Hareket Sayısı: ${hareketSayisi}\n" +
                    "Kilo : ${kilo}\n" +
                    "Saldırı Gücü: ${saldiriGucu}"
        }
        else return  "Kalan Hareket Sayısı: ${hareketSayisi}\n" +
                    "Kilo : ${kilo}\n" +
                    "Saldırı Gücü: ${saldiriGucu}"

    }

}
