

let options = {
    name: "解放鞋"
};

function setDefaultInfo(user: any) {
    if (user) {
        if (!user.name) {
            user.name = options.name;
        }
    }
}



const mUtils = {
    setDefaultInfo: setDefaultInfo
};

export default mUtils;
