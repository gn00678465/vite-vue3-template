import Icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import IconsResolver from 'unplugin-icons/resolver';
import Components from 'unplugin-vue-components/vite';

export default function (srcPath: string) {
  return [
    Icons({
      compiler: 'vue3',
      scale: 1,
      defaultClass: 'inline-block',
      customCollections: {
        custom: FileSystemIconLoader(`${srcPath}/assets/svg-icons`)
      }
    }),
    Components({
      dts: true,
      resolvers: [
        IconsResolver({
          prefix: 'icon',
          customCollections: ['custom']
        })
      ]
    })
  ];
}
