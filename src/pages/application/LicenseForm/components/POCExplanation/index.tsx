import { defineComponent, Teleport, ref } from 'vue';
import { NDatePicker, NInput, NButton, NFormItem } from 'naive-ui';
import { useI18n } from 'vue-i18n';

interface ExplanationItem {
  date: number | null;
  target: string;
}

export default defineComponent({
  name: 'POCExplanation',
  setup() {
    const { t } = useI18n();

    const explanations = ref([{}]);

    function handleAddExplanation() {}

    function updateExplanations(
      k: keyof ExplanationItem,
      v: number | string,
      i: number
    ) {}

    function handleRemoveExplanation(i: number) {}

    return () => (
      <>
        {/* <Teleport to="#explanationBtn">
          <NButton type="primary" size="small" onClick={handleAddExplanation}>
            新增目標
          </NButton>
        </Teleport> */}
        <NFormItem label={t('components.licenseForm.label.POCExplanation')}>
          {{
            default: () => (
              <div class="flex flex-col gap-y-2 w-full">
                {explanations.value.map((item, index) => {
                  return (
                    <label key={index} for="" class="flex items-center gap-x-2">
                      <span class="w-[55px] shrink-0">目標</span>
                      <NDatePicker class="w-[150px] shrink-0"></NDatePicker>
                      <NInput on-update:value={(v: string) => {}}></NInput>
                      {index !== 0 && (
                        <NButton onClick={() => handleRemoveExplanation(index)}>
                          Remove
                        </NButton>
                      )}
                    </label>
                  );
                })}
              </div>
            )
          }}
        </NFormItem>
      </>
    );
  }
});
