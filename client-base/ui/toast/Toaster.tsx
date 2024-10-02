import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            'group border-2 toast group-[.toaster]:bg-background-primary group-[.toaster]:text-xs group-[.toaster]:text-general-light group-[.toaster]:border-brand-primary group-[.toaster]:shadow-md',
          description: 'group-[.toast]:text-xs text-general-light',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
