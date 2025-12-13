import { ref } from 'vue';

export const usePageState = () => {
  const pageState = useState('pageState', () => ref({
    exists: false,
    path: '',
    filename: null as string | null
  }));

  return pageState;
};
