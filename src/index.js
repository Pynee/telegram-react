/*
 *  Copyright (c) 2018-present, Evgeny Nadymov
 *
 * This source code is licensed under the GPL v.3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import '@ionic/react/css/core.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import TelegramApp from './TelegramApp';
import registerServiceWorker from './registerServiceWorker';
import Cookies from 'universal-cookie';
import { OPTIMIZATIONS_FIRST_START } from './Constants';
import './index.css';

ReactDOM.render(
    <IonApp>
        <IonReactRouter>
            <IonRouterOutlet>
                <Route path='/telegram' component={TelegramApp} />
                <Redirect exact from='/' to='/telegram' />
            </IonRouterOutlet>
        </IonReactRouter>
    </IonApp>,
    document.getElementById('root')
);

if (OPTIMIZATIONS_FIRST_START) {
    const cookieEnabled = navigator.cookieEnabled;
    if (cookieEnabled) {
        const cookies = new Cookies();
        const register = cookies.get('register');
        if (register) {
            registerServiceWorker();
        }
    } else {
        registerServiceWorker();
    }
} else {
    registerServiceWorker();
}
