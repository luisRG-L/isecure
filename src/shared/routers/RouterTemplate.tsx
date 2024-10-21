import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';

interface IRoute {
    path: string;
    component: React.ComponentType;
    dev?: boolean;
}

interface Props {
    routes: IRoute[];
}

export default function RouterRouter(props: Props) {
    return (
        <>
            <Router>
                <Routes>
                    {props.routes
                        .map((route) => route.dev === undefined ? route : {...route, dev: false})
                        .map((route, index) => !route.dev
                        ?
                        <Route key={index} path={route.path} element={<route.component />}/>
                        :
                        <div/>
                    )}
                </Routes>
            </Router>
        </>
    );
}