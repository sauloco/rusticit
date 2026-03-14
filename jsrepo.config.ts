import {defineConfig} from 'jsrepo';

export default defineConfig({
    registries: [],
    paths: {
        "components": 'src/components/vue/bits',
        "utils": 'src/components/vue/bits/lib/utils',
        "ui": 'src/components/vue/bits/ui',
        "lib": 'src/components/vue/bits/lib',
        "hooks": 'src/components/vue/bits/hooks',
		component: './src/components/vue/bits'
    },
});