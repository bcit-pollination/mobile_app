// Gets user's voting token
import AsyncStorage from "@react-native-async-storage/async-storage";

const VOTING_STORAGE = "voting_token";

let org_ids = [];
let elections = [];

const getVotingToken = (user_token) => {
  fetch("http://pollination.live/api/user/voting_token", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  })
    .then((response) => {
      // console.log(response.status);
      if (response.status === 200) return response.json();
      else throw new Error("status != 200 in getting voting token");
    })
    .then((responseData) => {
      // responseData contains voting_token
      console.log("checking type: " + typeof responseData.voting_token[0]);
      onValueChange(VOTING_STORAGE, responseData.voting_token[0]);
    })
    .catch((error) => {
      console.log("Error");
      console.error(error);
    });
};

// Gets user's voting_token from AsyncStorage
const getVotingTokenFromStorage = async () => {
  let VOTING_TOKEN = await AsyncStorage.getItem("voting_token");
  return VOTING_TOKEN.toString();
};

// fill in array of org_ids
const getOrgIds = (org_list) => {
  org_ids = org_list.map((org) => {
    return org.org_id;
  });
};

// get all elections in elections array
const getElections = (orgs, token) => {
  let arr = [];
  for (let i = 0; i < orgs.length; i++) {
    console.log("orgs[i]: " + parseInt(orgs[i]));
    fetch(`http://pollination.live/api/org/elections/list?org_id=${orgs[i]}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) return response.json();
        else throw new Error("status != 200");
      })
      .then((responseData) => {
        // responseData contains elections
        console.log(responseData.elections);
        for (let j = 0; j < responseData.elections.length; j++) {
          // cheesed
          const len = elections.length;
          arr[len] = responseData.elections[j];
          console.log("cur elections");
          console.log(arr[len]);
        }
        console.log("returning arr from getElections()");
        return arr;
      });
  }
};

const getOrg = (user_token, electionsArr) => {
  fetch("http://pollination.live/api/org/list", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  })
    .then((response) => {
      console.log("response status: " + response.status);
      if (response.status === 200) return response.json();
      else throw new Error("status != 200");
    })
    .then((responseData) => {
      // responseData contains orgs list
      console.log(responseData.orgs);
      getOrgIds(responseData.orgs);
      return org_ids;
    })
    .then((orgs) => {
      // return getElections(orgs, user_token);
      const arr = getElections(orgs, user_token);
      return arr;
    })
    .then((arr) => {
      electionsArr = arr;
      console.log("electionsArr = arr");
      console.log("arr: ");
      console.log(electionsArr);
    })
    .catch((error) => {
      console.log("Error");
      console.error(error);
    });
};

// Gets user's jwt_token from AsyncStorage
const getUserToken = async () => {
  let USER_TOKEN = await AsyncStorage.getItem("jwt_token");
  return USER_TOKEN;
};

const onValueChange = async (item, selectedValue) => {
  try {
    console.log("selected value: " + selectedValue);
    await AsyncStorage.setItem(item, selectedValue);
  } catch (error) {
    console.log("AsyncStorage error: " + error.message);
  }
};

module.exports = {
  getVotingToken,
  getOrgIds,
  getElections,
  getOrg,
  getUserToken,
  onValueChange,
  getVotingTokenFromStorage,
};
