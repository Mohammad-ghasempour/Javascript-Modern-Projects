const searchInput = document.getElementById('searchUser');

searchInput.addEventListener('keyup' , (e)=>{

    const userText = e.target.value;

    if (userText !==''){
        console.log(userText)
    }
})