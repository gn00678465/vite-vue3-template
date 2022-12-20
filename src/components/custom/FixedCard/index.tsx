import { defineComponent, computed, ref } from 'vue';
import { ComputedRef, Ref } from 'vue';
import { NCard, NScrollbar } from 'naive-ui';
import { useLayoutStore } from '@/stores';

type TScrollOption = {
  left?: number;
  top?: number;
  behavior?: ScrollBehavior;
};

export type TScrollMethod = (arg0: TScrollOption) => void;

export type FixedCardSlots = {
  contentHeight: ComputedRef<number>;
  scrollTo: TScrollMethod;
  scrollBy: TScrollMethod;
};

export default defineComponent({
  name: 'FixedCard',
  props: {
    fixed: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    const scrollRef: Ref<HTMLElement | null> = ref(null);

    function scrollTo(options: TScrollOption): void {
      scrollRef.value?.scrollTo(options);
    }

    function scrollBy(options: TScrollOption): void {
      scrollRef.value?.scrollBy(options);
    }

    const { useContentInject } = useLayoutStore();
    const containerHeight = useContentInject() as ComputedRef<number>;
    const contentHeight = computed(
      () => containerHeight.value - 24
    ) as ComputedRef<number>;
    return () => (
      <NCard
        size="small"
        style={
          !props.fixed && {
            minHeight: containerHeight.value + 'px',
            height: '100%'
          }
        }
        {...props}
      >
        {props.fixed ? (
          <NScrollbar
            ref={scrollRef}
            style={{
              minHeight: contentHeight.value + 'px',
              height: '100%',
              maxHeight: contentHeight.value + 'px'
            }}
          >
            {slots.default?.({ scrollTo, scrollBy, contentHeight })}
          </NScrollbar>
        ) : (
          slots.default?.({ contentHeight })
        )}
      </NCard>
    );
  }
});
