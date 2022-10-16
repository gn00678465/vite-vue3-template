import { defineComponent, inject } from 'vue';
import { NCard, NScrollbar } from 'naive-ui';
import { useLayoutStore } from '@/stores';

interface IInject {
  value: number;
}

export default defineComponent({
  name: 'ApplicationLicense',
  setup() {
    const { provideContentHeightKey } = useLayoutStore();
    const contentHeight = inject<IInject>(provideContentHeightKey, null);
    return () => (
      <NCard size="small">
        <NScrollbar
          style={{
            maxHeight: contentHeight.value - 24 + 'px'
          }}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id nisi
          magni architecto deleniti itaque quaerat consequatur quod cumque
          asperiores enim, necessitatibus nobis veniam unde quo, fugit odio sint
          soluta non. Deserunt ab obcaecati ipsam explicabo commodi maxime
          dolorem modi asperiores quaerat odio illum, consectetur nam expedita,
          fugiat aliquid laborum. Iure quia velit a delectus consequatur
          suscipit modi inventore officiis facere? Eveniet sunt perferendis
          suscipit perspiciatis quam ex unde ratione numquam fugit est
          consequatur vitae consequuntur minima voluptates facere provident
          quis, nobis asperiores sapiente. Atque modi repellat quidem enim? Sit,
          accusantium. Adipisci provident libero non natus quas iure, eveniet
          dolor. Minus consequuntur autem facilis pariatur fugiat. Sed delectus
          corporis saepe accusantium odio, minus voluptatum a dolores voluptas
          sint neque distinctio consequatur? Nam debitis facere, quisquam vel
          sit quasi molestias nesciunt, necessitatibus alias doloremque
          excepturi earum minus eum quaerat accusamus? Nihil enim culpa
          voluptate, iure exercitationem laudantium corporis magnam doloremque
          non laborum. Ea, incidunt expedita. At sequi quod reprehenderit ut
          laudantium nulla perspiciatis, perferendis fugiat voluptatum qui
          cumque adipisci ex a eum aperiam voluptatibus libero magnam
          consequuntur iure, velit deleniti facere quis! Fuga exercitationem
          dignissimos illo! Voluptate qui consequatur similique. Tempore
          doloremque rerum excepturi facilis ipsam, nobis libero non animi quia
          omnis repellat labore, architecto, quasi in sunt? Voluptatum
          praesentium libero asperiores? Aspernatur aperiam, non voluptatem,
          architecto minima veniam sapiente quam nam facilis amet, perferendis
          labore. Doloremque, rerum nesciunt! At, minima totam quisquam corrupti
          debitis quo. Atque repellendus cumque adipisci earum quae! Ea cumque
          quod, reiciendis earum beatae, nulla natus nam quaerat ab incidunt
          fuga iusto? Odio delectus repellat doloribus ex reiciendis adipisci
          corporis est quae cupiditate, mollitia, dicta repellendus enim quia!
          Ex error totam repellendus labore harum veniam quidem sapiente quis ab
          dolores, nihil doloribus earum quas. Veritatis suscipit, sit sapiente
          fugit animi saepe dolor, quibusdam quaerat sunt minus perspiciatis
          repellat! Quia itaque voluptate molestiae cumque corporis doloribus
          dolorum quae, aperiam obcaecati libero praesentium rerum laudantium
          totam repellendus ex eveniet recusandae illum asperiores nihil!
          Maxime, minima modi eum aliquam hic adipisci? Iure eligendi reiciendis
          voluptatem temporibus quas maiores dolorem commodi repellendus optio,
          doloribus, culpa velit amet nisi porro. Quas rerum, fugit ut quo ipsa
          eos totam tempora repudiandae perspiciatis expedita deleniti.
          Necessitatibus similique dolores reprehenderit sapiente reiciendis quo
          placeat animi eligendi magni, deleniti nemo sequi laudantium ea amet
          modi illum consequuntur, maxime sint alias molestiae esse pariatur
          quisquam repudiandae. Cumque, facere. Dolore in, ea mollitia
          reiciendis necessitatibus enim expedita ducimus aperiam ratione
          corporis recusandae! Similique blanditiis quaerat totam doloremque
          unde cum impedit inventore, facere accusantium quis incidunt excepturi
          quisquam sit enim? Voluptatem inventore laboriosam autem eos magnam
          nihil sunt, eum ex accusantium illum earum aperiam unde fuga culpa
          voluptatum. Vero dicta explicabo est maiores odio non nihil, nesciunt
          necessitatibus nemo modi! Quisquam eum dolorem officia quae voluptatem
          vero molestiae alias mollitia! Esse numquam quibusdam accusantium,
          eaque asperiores officia iure ipsa aspernatur nemo modi pariatur a
          voluptate consectetur explicabo et perferendis quos? Deserunt dolor
          deleniti sed laudantium, tempore nulla hic ab impedit, esse voluptatum
          dolorem aliquam illo. Nulla, enim adipisci? Eveniet voluptatem dolores
          odit ipsam obcaecati autem aliquid sed beatae, minima facere?
          Laboriosam esse quisquam recusandae, nostrum dolorum cum ab, soluta
          asperiores, aut autem saepe eaque ullam quibusdam voluptatum explicabo
          assumenda dicta magnam sapiente. Quidem error, magni dicta numquam
          eius adipisci esse! Fugiat nemo, quibusdam voluptatibus perspiciatis
          repellat quod, placeat est aliquam maiores facere magnam ex ipsam
          numquam iste adipisci similique dicta quos alias tempore maxime quo?
          Nulla consequatur fugiat ipsam rerum! Iusto est, repellendus quia
          error eos doloremque commodi dolorum, aliquam qui blanditiis, iste
          officia natus cum explicabo! Doloremque odio facere, ipsam sequi
          ratione rem officiis quo id inventore, incidunt et! Magnam iure
          consequatur voluptatem! Quae eaque adipisci quisquam a? Error
          temporibus laboriosam itaque. Cumque soluta iste eos adipisci error
          quod iure nobis? Qui cupiditate, voluptas quia sapiente ducimus eaque
          iste? Impedit officiis ratione non eius labore, tenetur odit fugit.
          Minima numquam dolorum ex itaque deleniti corrupti molestiae
          consequuntur odio sapiente enim, sed pariatur magni tempore dolores
          cumque, quia eveniet similique. Minima quas similique molestias
          consequuntur vitae animi nesciunt dolorum nobis rerum, quia hic
          repudiandae aperiam. Explicabo cupiditate quaerat autem iusto
          obcaecati sunt adipisci aperiam quisquam, exercitationem ullam impedit
          dolor nam? Ipsam perspiciatis sed enim non nemo voluptatibus fugit
          aspernatur, asperiores neque provident deleniti iste minima
          accusantium distinctio ea delectus libero nam quae cumque praesentium.
          Tenetur vero eaque minima ab porro? Dicta soluta ad vero, provident
          asperiores nulla, officia vitae fugit corporis similique accusamus
          officiis rerum iste voluptatum voluptate quam culpa praesentium
          eligendi! Odit, atque consequuntur sunt sed quos eligendi cupiditate.
          Ullam praesentium aut labore cum dolores placeat, facilis libero dolor
          ipsum est iure blanditiis ipsa laborum odio adipisci ad animi amet
          voluptatem ex corporis accusamus harum? Quae, praesentium labore.
          Possimus? Veniam at accusamus optio provident, officiis aspernatur
          libero aperiam eligendi voluptatem officia distinctio, quam culpa id
          obcaecati nihil porro odio nisi est dolorum facilis quasi. Iste dolore
          eius culpa dolor. Corporis alias possimus excepturi voluptas?
          Obcaecati culpa eius minus ipsa repellendus minima saepe nesciunt id!
          Minus facere deleniti nisi earum, quos, officiis accusantium aut
          quidem, ipsa eligendi adipisci soluta dolores. Voluptatum ex libero
          maxime, recusandae praesentium soluta autem nisi dicta hic! Dolor aut,
          unde provident, dolorum, ut esse illo magnam cum culpa ex numquam
          quaerat asperiores deleniti incidunt commodi amet? Perferendis
          molestiae voluptate voluptatibus eum illum cupiditate fugiat
          voluptatum minus at iure amet voluptates provident quia sapiente sed
          nihil dolor, blanditiis ab delectus ut ea adipisci optio. Cupiditate,
          quam suscipit. Odio architecto eligendi omnis ab distinctio sequi
          praesentium suscipit sint doloribus eos natus aperiam sit fugit,
          aliquam accusantium eaque. Earum eaque qui voluptates eos temporibus
          totam ipsam dolore quod consectetur? Ratione magnam impedit laudantium
          voluptatibus dicta id a repellendus labore assumenda nam. Temporibus
          reprehenderit sit iusto, nostrum ratione fugiat quas ex fuga
          perspiciatis vel accusamus praesentium nulla odio nemo in.
          Consequuntur accusamus minus explicabo, exercitationem at, consequatur
          aliquid molestias ipsam est soluta, maxime cum eos! Enim sed cumque
          dolorem voluptatem esse ratione incidunt eaque! Reprehenderit vel
          maiores et dolorum ullam! Eos sit maxime corrupti doloremque impedit
          at porro aliquid omnis magnam architecto est autem accusantium ea
          obcaecati dolores itaque officia, repellat velit unde distinctio
          nesciunt sint fuga! Ipsam, quod quia. Pariatur reiciendis temporibus
          nostrum cum rerum voluptatem voluptates magni fuga, impedit officia
          quos est repellendus inventore ea, corporis iure. Natus, fugit! Rem
          exercitationem voluptatem illo deleniti, eos laudantium mollitia
          voluptas! Id ipsam, nobis dolores eius provident obcaecati omnis
          corporis minus error non nemo, aliquam vitae blanditiis quia ut
          molestias expedita voluptates totam, at maiores laudantium in fugit!
          Fugit, recusandae praesentium. Dolore temporibus itaque soluta
          aliquid? Est ad molestiae illo impedit! Tenetur natus a
          necessitatibus, voluptate nisi corporis autem soluta expedita, non
          eligendi ipsam, magnam odio. Ut, dignissimos quas. Sed, optio. Nisi
          perferendis, alias amet accusamus similique facilis nulla illo autem
          nostrum rerum dolorem totam saepe! Aspernatur eum in aliquid voluptas
          amet. Voluptatum dignissimos excepturi, sequi voluptatem harum atque
          unde maiores. Facilis fugit iste incidunt accusantium veritatis
          distinctio deserunt natus odit possimus quam dolorem perspiciatis
          neque alias eum, molestias earum? Voluptate quasi vel, provident
          doloremque error nobis explicabo minima amet saepe? Ab excepturi quam
          mollitia libero nisi quisquam omnis voluptas ipsa magni. Esse aut,
          nisi consectetur obcaecati possimus nulla, molestiae, fugit at eaque
          corporis quaerat unde nemo assumenda itaque. Nesciunt, vel. Ipsam
          corrupti ullam magnam velit cumque doloribus saepe nihil soluta
          temporibus quaerat repudiandae voluptatem voluptatibus iste magni eos
          sint, fuga dolorum iusto perferendis in. Suscipit, repudiandae
          voluptatum. Beatae, aspernatur nulla. Dolorum numquam necessitatibus
          debitis asperiores explicabo optio repellat ratione? Laudantium
          dolorum alias est perspiciatis ea accusantium culpa, praesentium
          deleniti. Minima impedit praesentium magnam consequatur molestias
          deserunt, in similique expedita omnis. Ratione laboriosam debitis
          cumque. Laborum, accusamus. Obcaecati, neque, porro aliquam a quod
          consectetur expedita vel laudantium pariatur minima tempore. Cum,
          consequatur minus. Qui veritatis recusandae quis quaerat quos
          voluptate doloremque! Aut est quisquam illum blanditiis, tempora,
          mollitia dolor libero officia aspernatur enim eveniet beatae! Nostrum
          et possimus ea eos modi laudantium vitae consequatur expedita,
          cupiditate a dicta. Molestias, quas error! Nisi porro culpa enim
          reiciendis molestias, pariatur corporis sunt dolorem blanditiis beatae
          atque at quo repellat, odit sapiente, quasi tenetur commodi illum
          consequuntur aperiam delectus id! Dignissimos sed nobis fugit! Numquam
          quaerat aut nesciunt in, officia tenetur, veritatis debitis vero
          dignissimos assumenda nam! Dolor labore laudantium nostrum voluptatum
          dolores ducimus deserunt suscipit. Commodi ut vitae nisi quo omnis
          facilis perferendis. Autem harum, asperiores animi quisquam suscipit
          eveniet delectus sint nisi cupiditate velit, quas omnis ad laboriosam
          soluta commodi consectetur alias ducimus voluptatum fuga officia nam
          fugiat architecto. Autem, architecto eaque. Officiis voluptas ipsam
          voluptatibus suscipit! Et modi eius dolorum sint illo mollitia, quasi
          vitae velit quos, veniam pariatur, minima ducimus dignissimos error!
          Nisi quibusdam in, delectus nesciunt quidem aspernatur hic! Aliquam
          laboriosam sit quod animi aut ea, magnam labore nemo eum
          necessitatibus. Iste debitis fugit ullam ducimus! Deleniti culpa
          deserunt optio explicabo atque non, voluptates excepturi, debitis nemo
          voluptate fuga. Quisquam, harum suscipit! Odio, ipsum veritatis!
          Voluptas doloribus fugit veritatis, temporibus recusandae velit, ullam
          autem voluptate debitis ad cumque ratione cupiditate reprehenderit,
          modi maiores! Sunt aliquid corporis voluptas itaque consectetur?
          Repellat aut at sed ex. Commodi, tempore. Deleniti qui optio minus, ut
          commodi hic magnam officiis iusto delectus odio adipisci natus
          provident beatae. Laboriosam saepe praesentium similique sint
          voluptates minima. Nemo nulla assumenda obcaecati at, consectetur
          ipsum iusto recusandae natus dolores vel sunt consequuntur provident
          maxime, accusantium ullam. Rerum, quis repudiandae optio harum at ex
          ducimus iste perspiciatis nihil praesentium. Rerum consequuntur soluta
          tenetur consequatur temporibus esse facilis ab et assumenda id. Sint
          obcaecati eligendi odit. Placeat quos reiciendis nobis fuga? Nesciunt
          possimus ducimus perferendis non aspernatur corporis autem eaque. At
          voluptatibus doloremque nisi repudiandae veritatis laborum saepe
          dolorum quaerat harum, eum nobis. Id at adipisci odio, reiciendis
          laudantium excepturi quisquam optio repudiandae ipsa non neque
          architecto dolores natus veritatis! Earum, unde eaque consequuntur
          reprehenderit nisi corporis illo rem quibusdam eius deleniti dolorum
          repudiandae hic minus. Sequi cum aliquid possimus dolor, officiis
          dolorem aspernatur voluptatem unde magni illum pariatur magnam. Animi
          eos praesentium tenetur corporis, blanditiis iusto distinctio omnis,
          aperiam ea accusantium itaque porro sit tempore, laboriosam temporibus
          ducimus quaerat. Exercitationem quam illum, deserunt suscipit expedita
          nesciunt facilis corporis maxime? Perferendis saepe, praesentium neque
          ipsum necessitatibus at id ipsam hic? In architecto, incidunt hic
          temporibus quas provident. Corporis ad, quam porro error iste deserunt
          quisquam optio repudiandae minima, perspiciatis tenetur. Tempora
          deleniti itaque at sapiente quae velit nulla in iusto assumenda
          dolores atque consequuntur voluptate, ipsam incidunt culpa aperiam? Ab
          numquam at vitae veritatis recusandae dicta eveniet magni sed ipsum.
          Atque animi a libero perspiciatis nobis inventore nulla, dicta dolorem
          accusamus iusto voluptas, nostrum in placeat obcaecati maxime laborum
          amet minima similique rerum! Placeat porro earum provident
          necessitatibus autem unde. Eligendi voluptates necessitatibus
          dignissimos omnis, temporibus culpa, harum tenetur error nobis non
          placeat veritatis fugit quam alias, obcaecati voluptatem illo enim
          nulla asperiores similique sint suscipit? Est laudantium veniam ullam.
        </NScrollbar>
      </NCard>
    );
  }
});
