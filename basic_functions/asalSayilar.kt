

/**
 *     Created by Mehmet Kutay ASAN on {10.10.2017}
 *     Have fun!
 */
fun asalBuldur(x: Int):List<Int>{
    var c= mutableListOf<Int>(2,3) // 2 ve 3'ü algoritma kolaylaştırmak için önce ekliyoruz.
    var top=0


    for (a in 4..x){ //2 ve 3 zaten ekli olduğu için 4'ten itibaren sorgulama başlıyor.

        if(a%2!=0){

            top=0 //top denilen değişken, sayı başka sayıya bölünürse artacak ve asal olmadığını bize gösterecek

            for ( q in 3..(a-1)){

                if(a%q==0) top+=1

            }

            if(!c.contains(a)&&top==0){
                c.add(a) // eğer listede zaten bu integer değeri yoksa ve hiç tam bölünmemişse c listesine ekleme yapılacak.

            }
        }
    }
    return c
}

fun main(args: Array<String>) {
    println(asalBuldur(100)) //100'e kadar olan asal sayılar.
}
