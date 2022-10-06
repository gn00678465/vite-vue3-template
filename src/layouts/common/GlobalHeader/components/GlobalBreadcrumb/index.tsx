import { defineComponent } from 'vue';
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'GlobalBreadcrumb',
  setup() {
    return () => (
      <NBreadcrumb>
        {useRoute().matched.map(({ meta }) => (
          <NBreadcrumbItem>{meta.title}</NBreadcrumbItem>
        ))}
      </NBreadcrumb>
    );
  }
});
