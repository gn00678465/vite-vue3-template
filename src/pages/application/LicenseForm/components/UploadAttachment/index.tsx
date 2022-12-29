import { defineComponent, ref, watchEffect, PropType } from 'vue';
import { NFormItem, NUpload, NModal } from 'naive-ui';
import type { UploadFileInfo } from 'naive-ui';
import { useFileReader, useRandomId, useDownloadFile } from '@/hooks';

export default defineComponent({
  name: 'UploadAttachment',
  emits: ['update:value'],
  props: {
    value: {
      type: String as PropType<string | null>,
      default: ''
    },
    defaultValue: {
      type: String as PropType<string | ''>,
      default: ''
    }
  },
  setup(props, { emit }) {
    const showModalRef = ref(false);
    const previewImageUrlRef = ref('');
    const defaultFileList = ref<UploadFileInfo[]>([]);
    const contentType = ref('image/png');

    const { downloadBase64File } = useDownloadFile();

    watchEffect(() => {
      handleDefaultFileList(props.defaultValue);
    });

    function updateValue(image: string) {
      emit('update:value', image.replace(/^data:.*;base64,/, ''));
    }

    function handleFile(value: string): UploadFileInfo {
      return {
        id: useRandomId(4),
        name: `${useRandomId(10)}.png`,
        status: 'finished',
        url: value
      };
    }

    function handleDefaultFileList(value: string) {
      if (!value) return;
      defaultFileList.value.push(handleFile(value));
    }

    function handlePreview(file: UploadFileInfo) {
      previewImageUrlRef.value = file.url as string;
      showModalRef.value = true;
    }

    const handleDownload = (file: UploadFileInfo) => {
      downloadBase64File(
        previewImageUrlRef.value,
        contentType.value,
        '申請單.png'
      );
    };

    return () => (
      <>
        <NFormItem path="Images" label="上傳申請單" required>
          <NUpload
            listType="image-card"
            max={1}
            accept="image/png"
            show-download-button={true}
            default-file-list={defaultFileList.value}
            on-before-upload={({
              file,
              fileList
            }: {
              file: UploadFileInfo;
              fileList: UploadFileInfo[];
            }) => {
              const { readAsDataURL } = useFileReader(file?.file as File);
              readAsDataURL(updateValue);
            }}
            on-remove={({ file }: { file: UploadFileInfo }) => {
              updateValue('');
            }}
            on-preview={handlePreview}
            on-download={handleDownload}
          ></NUpload>
        </NFormItem>
        <NModal
          show={showModalRef.value}
          preset="card"
          style="width: 600px"
          title="申請單預覽"
          on-update:show={(value: boolean) => {
            showModalRef.value = value;
          }}
        >
          <img
            src={`data:${contentType.value};base64,${previewImageUrlRef.value}`}
            style="width: 100%"
          />
        </NModal>
      </>
    );
  }
});
