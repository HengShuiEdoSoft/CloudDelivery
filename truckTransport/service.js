// 管理账号信息
const USERS_KEY = 'USERS_KEY';
const STATE_KEY = 'STATE_KEY';

const getUsers = function () {
    let ret = '';
    ret = uni.getStorageSync(USERS_KEY);
    if (!ret) {
        ret = '[]';
    }
    return JSON.parse(ret);
}

const addUser = function (userInfo) {
    let users = getUsers();
    users.push({
        phone: userInfo.phone,
        user_type:	userInfo.user_type,	
        wxapp_id: userInfo.wxapp_id,
        minwxapp_id:userInfo.minwxapp_id,	
        avatar:userInfo.avatar,	
		idcard_photos:userInfo.idcard_photos,	
        idcard_number:userInfo.idcard_number,	
        sex:userInfo.sex,
        realname:userInfo.realname,	
        user_level_id:userInfo.user_level_id,
        status:userInfo.status,	
        wallet:userInfo.wallet,	
        token:userInfo.token,	
        user_id:userInfo.user_id
    });
    uni.setStorageSync(USERS_KEY, JSON.stringify(users));
}

export default {
    getUsers,
    addUser
}
