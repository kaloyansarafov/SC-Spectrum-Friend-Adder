const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const headers = {
    'Content-Type': 'application/json',
    'x-rsi-token': process.env.RSITOKEN,
    'x-tavern-id': process.env.TAVERNID,
    'user-agent': process.env.USERAGENT,
    'cookie': process.env.COOKIE
}

const usernameList = fs.readFileSync('input.txt', 'utf8').split(' ');

async function getUserId(username) {
    let user;
    let data = {
        "nickname": username
    }

    //finding ID
    await axios.post('https://robertsspaceindustries.com/api/spectrum/member/info/nickname',
        data, {headers: headers}
    ).then(function (response) {
        user = response.data.data.member;


    }).catch(function (error) {
        console.log(error);
    });

    return user.id;
}


async function addUserAsFriend(userid) {
    let data = {
        "member_id": userid.toString()
    }
    let resp;

    await axios.post('https://robertsspaceindustries.com/api/spectrum/friend-request/create',
        data, {headers: headers}
    ).then(function (response) {
        console.log(JSON.stringify(response.data));
        resp = response.data;
    }).catch(function (error) {
        console.log(error);
    });
    return resp;
}

const sleep = ms => new Promise(res => setTimeout(res, ms));

(async () => {
    fs.writeFile('results.txt', '', function () {console.log('beginning to write')})

    for (let i = 0; i < usernameList.length; i++) {

        let userId = await getUserId(usernameList[i]);
        if (userId == undefined || userId == "") {
            console.log(`User ${usernameList[i]} not found, must be added manually`);
            fs.writeFile('results.txt', usernameList[i] + ' - Failed to add (User not found)' + '\n', {flag: 'a'}, function (err) {
                if (err) {
                    return console.error(err);
                }
            })
        }
        console.log(userId);

        let result = await addUserAsFriend(userId);

        if (result.code !== "OK"){
            fs.writeFile('results.txt', usernameList[i] + ' - Failed to add (Code: ' + result.code + ')' + '\n', {flag: 'a'}, function (err) {
                if (err) {
                    return console.error(err);
                }
            })
        } else {
            fs.writeFile('results.txt', usernameList[i] + ' - Added successfully' + '\n', {flag: 'a'}, function (err) {
                if (err) {
                    return console.error(err);
                }
            })
        }

        await sleep(1000);
    }
})();