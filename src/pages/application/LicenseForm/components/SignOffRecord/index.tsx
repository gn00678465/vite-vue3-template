import { defineComponent, ref } from 'vue';
import { NCollapseTransition } from 'naive-ui';

export default defineComponent({
  name: 'SignOffRecord',
  setup() {
    const show = ref(true);
    return () => (
      <>
        <h3 class="py-3 border-b border-dashed text-lg font-semibold">
          簽核紀錄
        </h3>
        <NCollapseTransition show={show.value}>紀錄</NCollapseTransition>
      </>
    );
  }
});
