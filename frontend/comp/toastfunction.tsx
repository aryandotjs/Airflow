import { ToastType, useToast } from "./toastprovider";

export interface showToastDataType {
  isError: boolean;
  message: string;
  submessage?: string;
}

export default function useToastSetterRemover(){
    const { setToasts} = useToast()
    function showToast(data:showToastDataType){
        let id : number ;

            setToasts((prev) => {
                id = prev.length > 0 
                    ? prev[prev.length - 1].id + 1
                    : 0;
                return [
                    ...prev,
                    {
                        id,
                        isError: data.isError,
                        isbig: data.submessage ? true : false,
                        message: data.message,
                        submessage: data.submessage ? data.submessage : "" ,
                        show: false
                    }
                ];
            });

            setTimeout(() => {
                setToasts((prev) =>
                    prev.map((toast) =>
                        toast.id === id
                            ? { ...toast, show:true }
                            : toast
                    )
                );
            }, 10);
           

            if (data.submessage) {
                setTimeout(() => {
                setToasts((prev) => {
                    return prev.map((toast) =>
                        toast.id === id
                            ? { ...toast, show:false }
                            : toast
                    )
                });

                setTimeout(() => {
                     setToasts((prev) =>
                    prev.filter((toast) => toast.id !== id));
                }, 300);
               

            }, 15000);
            }
            if (!data.submessage) {
                setTimeout(() => {
                setToasts((prev) => {
                    return prev.map((toast) =>
                        toast.id === id
                            ? { ...toast, show:false }
                            : toast
                    )
                });

                setTimeout(() => {
                     setToasts((prev) =>
                    prev.filter((toast) => toast.id !== id));
                }, 300);
               

            }, 5000);
            }
            

    }
     return showToast;
}