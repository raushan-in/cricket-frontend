const base = "http://127.0.0.1:8000"

const responseError = (status) =>{
  Swal.fire({
    icon: 'error',
    title: 'Error in fetching information.',
    text: `STATUS: ${status}`
  })
}

const connectionError = (status) =>{
  Swal.fire({
    icon: 'error',
    title: 'Connection Error',
    text: `Make sure server is running.`
  })
}

const getData = async (path='', options={}) => {
  url = base + path
  let response = await fetch(url, options)
  .catch(err => { connectionError()})
  if (response.status == 200){
    let data = await response.json()
    return data;
  }else{
    responseError(response.status);
  }
};