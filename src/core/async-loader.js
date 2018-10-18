/**
 * @param  { string } chunkPath views 文件夹下的页面路径
 * @return { function } 返回 promise<component> 的匿名函数
 */
import spinner from '@/vue/components/spinner';

export default (chunkPath, loading = true) => {
  const AsyncHandler = () => ({
    component: new Promise(resolve => {
      setTimeout(() => {
        resolve(
          import(/* webpackChunkName: "[request]" */ `@/views/${chunkPath}`)
        );
      }, 1000);
    }),
    loading: loading ? spinner : null,
    error: {
      render(h) {
        return h('div', {}, ['异步组件加载失败']);
      }
    },
    timeout: 10000
  });
  return () =>
    Promise.resolve({
      data() {
        return {
          component: null
        };
      },
      created() {
        this.component = AsyncHandler;
      },
      render(h) {
        return h(this.component, { props: this.$attrs });
      }
    });
};
