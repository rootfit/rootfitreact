import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
// bootstrap template 의 index.html 파일에 <link> 로 걸리는 css 를 추가한 것이다.
//이 css 가 각 component 에서 class 로 사용됨으로 global css 로 등록하기 위해서 
//이곳에서 import 한것일 뿐.. 
import './assets/vendor/bootstrap-icons/bootstrap-icons.min.css'
import './assets/vendor/animate.css/animate.min.css'
import './asscdets/css/style.css'
import './assets/vendor/swiper/swiper-bundle.min.css'

import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
