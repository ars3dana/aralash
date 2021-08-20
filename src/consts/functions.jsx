export const handleInp = (e,product, setProduct) => {
    if(e.target.name == 'price'){
        let obj = {
            ...product,
            [e.target.name]: Number(e.target.value)
        }
        setProduct(obj);
    }else {
        let obj = {
            ...product,
            [e.target.name]: e.target.value
        }
        setProduct(obj);
    }
};
export const getCurrentPage = () => {
    const search = new URLSearchParams(window.location.search);
  
    if (!search.get('_page')) {
      return 1;
    }
  
    return search.get('_page');
  };