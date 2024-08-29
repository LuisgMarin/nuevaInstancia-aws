let functions={
    header()
    {
        const token = localStorage.getItem('jwt')
        if (token) 
        {
            let res=JSON.parse(localStorage.getItem('user'));
            axios.defaults.headers.common['Authorization'] = token;
            axios.defaults.headers.common['source']        = res.id;
        }
        else{
            axios.defaults.headers.common['Authorization'] = null;
            axios.defaults.headers.common['source']        = null;
        }
    }
}
module.exports=functions.header;