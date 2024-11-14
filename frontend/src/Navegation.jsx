import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';

const Navegation = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route />
                <Route />
                <Route path="*" element={<Navigate to={'/'} replace={true} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Navegation;
