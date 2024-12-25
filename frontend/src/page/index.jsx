import { useEffect, useState } from 'react';

import Cookies from 'universal-cookie';
import axios from 'axios';
import CryptoJS from "crypto-js";

import Layout from './layout';


const Index = () => {


    useEffect(() => {
        const cookis = new Cookies()
        const user = cookis.get('user')
        const bytes = CryptoJS.AES.decrypt(user, 'users');
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        return async () => {

        }
    }, []);

    return (

        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Index</h1>
                    </div>
                </div>
            </div>
        </Layout>

    );
}

export default Index;
