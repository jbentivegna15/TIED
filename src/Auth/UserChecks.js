import { getUserIdentifier } from './AuthService';
import axios from 'axios';
import {APICONST} from '../urlConst';
const GROUPURL = 'http://localhost:3001/api/groups';


//checks whether a user is an admin of a given group
export function isAdmin(groupId,callback){
  console.log(groupId);
  getUserIdentifier(function(userId){
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
  });
}

export function isRSVP(groupId,eventId,callback){
  getUserIdentifier(function(userId){
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
  })
}

export function isRQAdmin(groupId,callback){
  getUserIdentifier(function(userId){
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
  })
}



export function rsvp(groupId,eventId){
  getUserIdentifier(function(userId){
    axios.put(`${APICONST}/groups/${groupId}/${eventId}`,{userId: userId})
      .catch(err => {
        console.log(err);
      });
  })
}

//export function isRSVP()
