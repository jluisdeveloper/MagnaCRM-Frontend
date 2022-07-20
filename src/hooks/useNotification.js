import { toast } from 'react-toastify';

const useNotification = () => {
  const setToast = (_data) => {    
    if (_data.status === 'ok') {
      toast.success(_data.message, {theme: "dark"})
    } else {
      toast.error(_data.message, {theme: "dark"})
    }
  }
  return { setToast }
}

export default useNotification


// , {theme: "dark"}
// , {theme: "dark"}