
const github = new Github;
const ui = new UI;
const searchInput = document.getElementById('searchUser');

searchInput.addEventListener('keyup' , (e)=>{

    const userText = e.target.value;

    if (userText !==''){
        github.getUser(userText)
        .then(data=>{
            if (data.profile.message === 'Not Found'){
               // show alert
            }else{
               ui.shoeProfile(data.profile);
            }
        })
    }
    else{
        //clear profile
    }
})