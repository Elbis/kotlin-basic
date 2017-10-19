# kotlin-basic
Kotlin ve Android hakkında öğrenme aşamasında geliştirdiğim ufak çaplı projeleri burada yayınlayacağım.

Lütfen projelerdeki <b>Kotlin</b> kodlarını iyileştirme konusunda bana yardımcı olun. 

Öncelikle projelerimizde <b>ANKO Toolbox</b>'ını kullandığımızı belirtmek isterim.

İlgili projeye erişebilmek için lütfen <a href="https://github.com/Kotlin/anko/blob/master/README.md">TIKLAYINIZ</a>

Kotlin kurulumunu Android Studio üzerinden sırasıyla;
<ul>
  <li>Plugins</li>
  <li>Jetbrains Plugins</li>
  <li>Kotlin</li> 
</ul> üzerinden sağlayabilirsiniz. 

<a href="https://kotlinlang.org/"><b>Kotlin'i</b></a> başarıyla kurduktan sonra ANKO Toolbox kurulumu için aşağıdaki adımları izlemeniz yeterlidir. 

<ul>
  <li>Studio üzerinden oluşturduğunuz proje altında Gradle Scripts kısmına geliniz.</li>
  <li>build.gradle (Module:app) dosyasını açınız.</li>
  <li>Dosyaya <b>apply plugin: 'kotlin-android-extensions'</b> ifadesini ekleyin.</li>
  <li>Dependencies kısmına gelerek <b>compile "org.jetbrains.anko:anko-commons:SÜRÜM!?!?"</b> satırını ekleyiniz.
  <li><b>SÜRÜM</b> yerine ANKO Toolbox'ın güncel sürümünü giriniz.
  <li>ANKO güncel sürümü öğrenmek için daha önce verdiğim <a href="https://github.com/Kotlin/anko/blob/master/README.md">github sayfasına</a> uğrayabilirsiniz!


<b>Enjoy Kotlin!</b>
