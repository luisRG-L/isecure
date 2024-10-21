import Home from '../../home/Home';
import Pgenerator from '../../pgenerator/Pgenerator';
import Pvalidator from '../../pvalidator/Pvalidator';
import URLSecure from '../../urlsecure/URLSecure';

import RouterTemplate from './RouterTemplate';

const BaseRouter =() => (
    <RouterTemplate routes={
        [
            {
                path: '/*',
                component: Home
            },
            {
                path: '/pvalidator',
                component: Pvalidator
            },
            {
                path: '/pgenerator',
                component: Pgenerator
            },
            {
                path: '/urlsecure',
                component: URLSecure,
                dev: true
            }
        ]
    } />
)

export default BaseRouter;