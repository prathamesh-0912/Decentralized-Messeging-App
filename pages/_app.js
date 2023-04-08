import '../styles/globals.css'

//Internal Import
import { ChatappProvider } from '../context/chatapp';
import {Navbar} from '../components/index';

const MyApp = ({ Component, pageProps }) =>(
  <div>
    <ChatappProvider>
      <Navbar  />
    <Component {...pageProps} />
    </ChatappProvider>
  </div>
);



export  default MyApp;