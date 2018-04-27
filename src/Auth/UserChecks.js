import { getUserIdentifier } from './AuthService';
import axios from 'axios';
import {APICONST} from '../urlConst';
const GROUPURL = 'http://localhost:3001/api/groups';


//checks whether a user is an admin of a given group
export function isAdmin(userId,groupId,callback){
  console.log(groupId);
    console.log(userId);
    var admins = [];
    axios.get(`${APICONST}/groups/${groupId}`)
      .then((res) => {
        admins = res.data.admins;
        if( admins.indexOf(userId) == -1){
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

export function isRSVP(userId,groupId,eventId,callback){
    var attendees = [];
    axios.get(`${APICONST}/groups/${groupId}/${eventId}`)
      .then((res) => {
        attendees = res.data.attendees;
        if( attendees.indexOf(userId) == -1){
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
        if( requests.indexOf(userId) == -1){
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



export function rsvp(userId,groupId,eventId){
    axios.put(`${APICONST}/groups/${groupId}/${eventId}`,{userId: userId})
      .catch(err => {
        console.log(err);
      });
}

export function unrsvp(userId,groupId,eventId){
  axios.put(`${APICONST}/groups/${groupId}/${eventId}/unrsvp`,{userId: userId})
    .catch(err => {
      console.log(err);
    });
}

//export function isRSVP()
