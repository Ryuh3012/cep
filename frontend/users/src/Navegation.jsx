import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import ContenidoPage from './page/Cep/ContenidoPage';
import ContactoPage from './page/contacto/ContactoPage';
import ParticipantPage from './page/Participant/ParticipantPage';
import HomePague from './page/Index';

const Navegation = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ParticipantPage />} path='/participant' />
                <Route element={<ContactoPage />} path='/contacto' />
                <Route element={<ContenidoPage />} path='/Extension-Profesional' />
                <Route element={<HomePague />} path='/' />
                <Route path="*" element={<Navigate to={'/'} replace={true} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Navegation;
