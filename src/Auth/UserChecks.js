import axios from 'axios';
import {APICONST} from '../urlConst';


//checks whether a user is an admin of a given group
export function isAdmin(userId,groupId,callback){
    console.log(groupId);
    console.log(userId);
    var admins = [];
    axios.get(`${APICONST}/groups/${groupId}`)
      .then((res) => {
        admins = res.data.admins;
        if( admins.indexOf(userId) === -1){
          callback(false);
        }
        else{
          callback(true);
        }
      })
      .catch(err => {
        console.error(err);
      });
}



export function isRQAdmin(userId,groupId,callback){
    var requests = [];
    axios.get(`${APICONST}/groups/${groupId}`)
      .then((res) => {
        requests = res.data.rqadmins;
        if( requests.indexOf(userId) === -1){
          callback(false);
        }
        else{
          callback(true);
        }
      })
      .catch(err => {
        console.error(err);
      });
}

export function rqAdmin(userId,groupId){
  axios.put(`${APICONST}/groups/${groupId}/requestAdmin`,{userId: userId})
    .catch(err => {
      console.log(err);
    });
}

export function approveAdmin(userId,groupId){
  axios.put(`${APICONST}/groups/${groupId}/approveAdmin`,{userId: userId})
    .catch(err => {
      console.log(err);
    });
}

export function rejectAdmin(userId,groupId){
  axios.put(`${APICONST}/groups/${groupId}/rejectAdmin`,{userId: userId})
    .catch(err => {
      console.log(err);
    });
}

export function rsvp(userId,groupId,eventId){
    axios.put(`${APICONST}/groups/${groupId}/${eventId}`,{userId: userId})
      .catch(err => {
        console.log(err);
      });
    axios.put(`${APICONST}/users/${userId}/rsvp`,{groupId: groupId,eventId: eventId})
      .catch(err => {
        console.log(err);
      });
}

export function unrsvp(userId,groupId,eventId){
  axios.put(`${APICONST}/groups/${groupId}/${eventId}/unrsvp`,{userId: userId})
    .catch(err => {
      console.log(err);
    });
  axios.put(`${APICONST}/users/${userId}/unrsvp`,{groupId: groupId,eventId: eventId})
    .catch(err => {
      console.log(err);
    });
}

export function eventdeleteunrsvp(userId,groupId,eventId){
  axios.put(`${APICONST}/users/${userId}/unrsvp`, {groupId: groupId,eventId: eventId})
    .catch(err => {
      console.log(err);
    });
}

export function groupdeleteunrsvp(userId,groupId){
  axios.put(`${APICONST}/users/${userId/groupdeleteunrsvp}`, {groupId: groupId})
    .catch(err => {
      console.log(err);
    });
}
