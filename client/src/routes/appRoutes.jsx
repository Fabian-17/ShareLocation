import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserView from '../components/user';
import ChoferView from '../components/chofer';


export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/user" element={<UserView />} />
                <Route path="/chofer" element={<ChoferView />} />
            </Routes>
        </BrowserRouter>
    );
}