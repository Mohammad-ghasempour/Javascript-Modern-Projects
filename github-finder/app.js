
const github = new Github;
const ui = new UI;
const searchInput = document.getElementById('searchUser');

searchInput.addEventListener('keyup' , (e)=>{

    const userText = e.target.value;

    if (userText !==''){
        github.getUser(userText)
        .then(data=>{
            if (data.profile.message === 'Not Found'){
               ui.showAlert('User not found!' , 'alert alert-danger')
              // ui.clearAlert('alert-danger');
            }else{
               ui.showProfile(data.profile);
            }
        })
    }
    else{
        ui.clearProfile();
    }
})