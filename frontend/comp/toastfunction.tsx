export default function toastsetterremover(settoasts:any,data:any){
            let id : any;
      settoasts((prev:any) => {
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
                settoasts((prev:any) =>
                    prev.map((toast:any) =>
                        toast.id === id
                            ? { ...toast, show:true }
                            : toast
                    )
                );
            }, 10);
            
            

            setTimeout(() => {
                    settoasts((prev:any) => {
                    return prev.map((toast:any) =>
                        toast.id === id
                            ? { ...toast, show:false }
                            : toast
                    )
                });

                setTimeout(() => {
                     settoasts((prev:any) =>
                    prev.filter((toast:any) => toast.id !== id));
                }, 300);
               

            }, 5000);
}