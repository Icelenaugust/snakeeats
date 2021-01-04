import React, { Component } from 'react';
import fire from './config/Fire';

var user = fire.auth().currentUser;
var name, email, uid;

if (user != null) {
    name = user.displayName;
    email = user.email;
    uid = user.uid;
}

