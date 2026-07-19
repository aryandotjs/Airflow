import { useToast } from "./toastprovider";

export default function useToastSetterRemover(){
    const { setToasts} = useToast()
    function showToast(data:any){
        console.log(data)
        let id : any;

            setToasts((prev:any) => {
                id = prev.length > 0 
                    ? prev[prev.length - 1].id + 1
                    : 0;
                return [
                    ...prev,
                    {
                        id,
                        isError: data.isError,
                        isbig: data.submsg ? true : false,
                        message: data.msg,
                        submessage: data.submsg ? data.submsg : "" ,
                        show: false
                    }
                ];
            });

            setTimeout(() => {
                setToasts((prev:any) =>
                    prev.map((toast:any) =>
                        toast.id === id
                            ? { ...toast, show:true }
                            : toast
                    )
                );
            }, 10);

            setTimeout(() => {
                    setToasts((prev:any) => {
                    return prev.map((toast:any) =>
                        toast.id === id
                            ? { ...toast, show:false }
                            : toast
                    )
                });

                setTimeout(() => {
                     setToasts((prev:any) =>
                    prev.filter((toast:any) => toast.id !== id));
                }, 300);
               

            }, 5000);

    }
     return showToast;
}