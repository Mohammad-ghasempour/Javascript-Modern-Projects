
const github = new Github;
const searchInput = document.getElementById('searchUser');

searchInput.addEventListener('keyup' , (e)=>{

    const userText = e.target.value;

    if (userText !==''){
        github.getUser(userText)
        .then(user=>{
            if (user.profile.message === 'Not Found'){
                console.log('Not Found!!!!!!')
            }else{
                console.log(user.profile);
            }
        })
    }
    else{
        console.log('cleared profile')
    }
})