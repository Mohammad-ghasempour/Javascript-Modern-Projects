class Github {
    constructor(){
        this.CLIENT_ID = 'dba31de56a5fbac0e1fc';
        this.CLIENT_SECRET = '20daa95896ca0c46ce79140de4b75468e858f9d7';
    }
    async getUser(user){
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.CLIENT_ID}&client_secret=${this.CLIENT_SECRET}`);
        const profile = await profileResponse.json();
        return {
            profile
        }
    }
}