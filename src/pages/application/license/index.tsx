import { defineComponent } from 'vue';
import FixedCard from '@/components/custom/FixedCard';
import type { TScrollMethod } from '@/components/custom/FixedCard';

interface ISlots {
  scrollTo: TScrollMethod;
}

export default defineComponent({
  name: 'ApplicationLicense',
  setup() {
    return () => (
      <FixedCard fixed={false}>
        {{
          default: ({ scrollTo }: ISlots) => (
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
              quo dolores, soluta sequi enim, ab ullam fugit impedit nobis
              quidem debitis iste quos doloribus molestiae cum ipsa vitae velit
              veritatis! Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Qui adipisci error architecto possimus libero sit, nam ipsum
              rerum iste. Voluptates maxime omnis incidunt cupiditate qui quo
              quasi, similique, minus ipsum veniam est at quis doloremque iure
              praesentium facilis ut excepturi rerum? Repellendus tempora nam,
              officiis nobis accusantium odio. Ipsa eveniet hic rerum soluta
              error. Adipisci veniam ipsa aspernatur? Fugit cum sit quibusdam
              qui! Sapiente sit molestias, neque iure harum nostrum! Illo
              debitis similique quibusdam, sit, consequuntur maiores aut
              deserunt eius voluptates quasi quam sapiente libero eaque sed
              animi praesentium hic sequi dicta? Possimus accusamus ipsa
              molestias, soluta delectus earum vitae deleniti quae, ad molestiae
              enim sint ut. Dignissimos aliquam provident aspernatur doloremque
              quod adipisci dolorem laudantium, blanditiis similique.
              Consectetur, deleniti ducimus, iure odit sunt porro adipisci
              voluptatum, hic possimus culpa minus? Iure, expedita at eaque
              tempore consequatur, sint ducimus rerum eveniet corporis quasi
              doloribus esse, aperiam pariatur animi libero! Laboriosam
              veritatis assumenda incidunt eius ipsum et, impedit repudiandae,
              consequuntur adipisci recusandae, error est cum. Doloribus
              voluptas odio amet soluta iste. Officia distinctio quibusdam, quae
              tenetur qui cupiditate at, natus repellendus dolorem recusandae
              sit, dolore ex accusamus temporibus. Necessitatibus facere
              dignissimos, maiores perferendis architecto qui deserunt nihil.
              Harum nam commodi nulla.
            </div>
          )
        }}
      </FixedCard>
    );
  }
});
