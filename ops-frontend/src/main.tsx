import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/components.css'
import App from './App.tsx';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  // <StrictMode>
  //   <App />
  // </StrictMode>  
)

{/* <StrictMode> */ }
{/* <p>pppppppppppppppppp</p> */ }
// <App />
// </StrictMode>,
