
function userDefault(user: any, args: string, value: string) {
    if (user) {
        if (!user[args] && value) {
            user[args] = value;
        }
    }
}



const mUtils = {
    userDefault: userDefault
};

export default mUtils;
