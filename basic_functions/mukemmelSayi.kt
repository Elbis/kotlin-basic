/**
 *     Created by Mehmet Kutay ASAN on {20.10.2017}
 *     Have fun!
 */

fun main(args: Array<String>) {
    println(mukemmel(1,9999)) //1 ile 9999 arasındaki mükemmel sayılar
}

fun mukemmel(ilk: Int, son:Int) {
    for (sayi in ilk..son){
        if(topla(tambolen(sayi))==sayi*2) println("$sayi bir mükemmel sayıdır!")
// eğer tambölen toplamı, sayının iki katına eşitse, mükemmel sayı olarak buluyor ve yazdırıyoruz.
    }

}
fun tambolen(bolek: Int): MutableList<Int> {
    val list = mutableListOf<Int>()
    for (a in 1..bolek){
        if(bolek%a==0) list.add(a) //tambölenlerini listeye ekliyoruz.
    }
    return list
}
fun topla(ary: MutableList<Int>): Int{
    var toplam=0
    for (a in ary){
        toplam+=a //tambölen listesi içindekileri topluyoruz
    }
    return toplam
}
