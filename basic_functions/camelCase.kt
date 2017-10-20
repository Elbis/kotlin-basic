/**
 *     Created by Mehmet Kutay ASAN on {20.10.2017}
 *     Have fun!
 */


fun main(args: Array<String>) {
    print("camelCase cümlenizi giriniz: ")
        val cumle= readLine()
        if(cumle!=null)println(camelCase(cumle))
        else{
        kotlin.NullPointerException("Boş giriş yaptınız.")
    }
}

fun camelCase(input : String): Int{
    var kelime=1 //ilk kelime'yi otomatik ekliyoruz.
    for (a in input){
        if(a.isUpperCase()) kelime+=1
    }
    return kelime
}
