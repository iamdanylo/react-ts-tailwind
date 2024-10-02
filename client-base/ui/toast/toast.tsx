import { ExternalToast, toast } from 'sonner';

type ToastOptions = ExternalToast & {
  type?: 'success' | 'info' | 'error';
};

export const showToast = (message: string, options?: ToastOptions) => {
  toast(message, { duration: 3000, ...options });
};
