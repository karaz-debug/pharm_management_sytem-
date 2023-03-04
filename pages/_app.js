import '../styles/globals.css'
import '../styles/Header.modules.css'

import { store } from '../redux/store'
import { Provider } from 'react-redux'


// import AdminLayout from '../components/AdminLayout'

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}



export default MyApp
