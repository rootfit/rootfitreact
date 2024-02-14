import React from 'react'
import imgURL from './icon/rootfit_logo.png'

const Footer = () => {
  return (

    <footer id="footer" className="footer">
      <div className="footer-content">
        <div className="container">
          <div className="row g-5">

            {/* About Root fit */}
            <div className="col-lg-4">
              <h3 className="footer-heading">About Root Fit</h3>
              <p>저희는 건강을 최고의 가치로 생각합니다. 여러분들의 건강을 체계적으로 관리하고 더 나은 삶의 질을 선물해 드리겠습니다.</p>

            </div>
            <div className="col-lg-1"></div>


            {/* Create Team */}
            <div className="col-6 col-lg-3">
              <h3 className="footer-heading">Create Team : 건강강조</h3>
              <ul className="footer-links list-unstyled">
                <li>Leader : 권보경</li>
                <li>User Info : 강민서</li>
                <li>Health List : 권보경, 이지은</li>
                <li>Board : 신혜인, 최지성</li>
                <li>Shopping mall : 박종섭</li>
                <li><span style={{ marginRight: '20px' }}>Git Hub :</span><a href="https://github.com/rootfit/rootfitreact.git" className="github" target="_blank"><i className="bi bi-github"></i></a></li>
              </ul>
            </div>


            {/* 뭘 넣을까 */}
            <div className="col-6 col-lg-4">
            <h3 className="footer-heading">Logo</h3>
              <div ><img src={imgURL} alt="RootFit" style={{ width: '350px', height: 'auto' }} /></div>
              
            </div>


          </div>
        </div>
      </div>


      {/* Footer 하단 검정라인 */}
      <div className="footer-legal">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <div className="copyright">
                © Copyright <strong><span>ZenBlog</span></strong>. All Rights Reserved
              </div>
              <div className="credits">
                {/* <!-- All the links in the footer should remain intact. -->
                <!-- You can delete the links only if you purchased the pro version. -->
                <!-- Licensing information: https://bootstrapmade.com/license/ -->
                <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/herobiz-bootstrap-business-template/ --> */}
                Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
              </div>
            </div>
            <div className="col-md-6">
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer