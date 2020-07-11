import Head from 'next/head';
import Content from '../components/page-layout/Content';
import Footer from '../components/page-layout/Footer';
import MainView from '../components/page-layout/MainView';
import '../css/main.css';
import Backend from 'react-dnd-mouse-backend'
import { DndProvider } from 'react-dnd'

const App = ({ Component, pageProps }) => (
  <DndProvider backend={Backend}>
    <Head>
      <title>{'MAPP'}</title>
    </Head>
    <Content>
      <MainView>
        <Component {...pageProps} />
      </MainView>
      <Footer />
    </Content>
  </DndProvider>
);

export default App;
