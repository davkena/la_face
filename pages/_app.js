// pages/_app.js
import '../styles/global.css';
import Layout from '../components/Layout';
import { AuthProvider } from '../utils/auth';

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AuthProvider>
    );
}

export default MyApp;
