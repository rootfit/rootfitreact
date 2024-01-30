import React from 'react'

const Footer = () => {
  return (

    <footer id="footer" className="footer">

      <div className="footer-content">
        <div className="container">

          <div className="row g-5">
            <div className="col-lg-4">
              <h3 className="footer-heading">About ZenBlog</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam ab, perspiciatis beatae autem deleniti voluptate nulla a dolores, exercitationem eveniet libero laudantium recusandae officiis qui aliquid blanditiis omnis quae. Explicabo?</p>
              <p><a href="about.html" className="footer-link-more">Learn More</a></p>
            </div>
            <div className="col-6 col-lg-2">
              <h3 className="footer-heading">Navigation</h3>
              <ul className="footer-links list-unstyled">
                <li><a href="index.html"><i className="bi bi-chevron-right"></i> Home</a></li>
                <li><a href="index.html"><i className="bi bi-chevron-right"></i> Blog</a></li>
                <li><a href="category.html"><i className="bi bi-chevron-right"></i> Categories</a></li>
                <li><a href="single-post.html"><i className="bi bi-chevron-right"></i> Single Post</a></li>
                <li><a href="about.html"><i className="bi bi-chevron-right"></i> About us</a></li>
                <li><a href="contact.html"><i className="bi bi-chevron-right"></i> Contact</a></li>
              </ul>
            </div>
            <div className="col-6 col-lg-2">
              <h3 className="footer-heading">Categories</h3>
              <ul className="footer-links list-unstyled">
                <li><a href="category.html"><i className="bi bi-chevron-right"></i> Business</a></li>
                <li><a href="category.html"><i className="bi bi-chevron-right"></i> Culture</a></li>
                <li><a href="category.html"><i className="bi bi-chevron-right"></i> Sport</a></li>
                <li><a href="category.html"><i className="bi bi-chevron-right"></i> Food</a></li>
                <li><a href="category.html"><i className="bi bi-chevron-right"></i> Politics</a></li>
                <li><a href="category.html"><i className="bi bi-chevron-right"></i> Celebrity</a></li>
                <li><a href="category.html"><i className="bi bi-chevron-right"></i> Startups</a></li>
                <li><a href="category.html"><i className="bi bi-chevron-right"></i> Travel</a></li>

              </ul>
            </div>

            <div className="col-lg-4">
              <h3 className="footer-heading">Recent Posts</h3>

              <ul className="footer-links footer-blog-entry list-unstyled">
                <li>
                  <a href="single-post.html" className="d-flex align-items-center">
                    <img src="images/post-sq-1.jpg" alt="" className="img-fluid me-3" />
                    <div>
                      <div className="post-meta d-block"><span className="date">Culture</span> <span className="mx-1">&bullet;</span> <span>Jul 5th '22</span></div>
                      <span>5 Great Startup Tips for Female Founders</span>
                    </div>
                  </a>
                </li>

                <li>
                  <a href="single-post.html" className="d-flex align-items-center">
                    <img src="images/post-sq-2.jpg" alt="" className="img-fluid me-3" />
                    <div>
                      <div className="post-meta d-block"><span className="date">Culture</span> <span className="mx-1">&bullet;</span> <span>Jul 5th '22</span></div>
                      <span>What is the son of Football Coach John Gruden, Deuce Gruden doing Now?</span>
                    </div>
                  </a>
                </li>

                <li>
                  <a href="single-post.html" className="d-flex align-items-center">
                    <img src="images/post-sq-3.jpg" alt="" className="img-fluid me-3" />
                    <div>
                      <div className="post-meta d-block"><span className="date">Culture</span> <span className="mx-1">&bullet;</span> <span>Jul 5th '22</span></div>
                      <span>Life Insurance And Pregnancy: A Working Mom’s Guide</span>
                    </div>
                  </a>
                </li>

                <li>
                  <a href="single-post.html" className="d-flex align-items-center">
                    <img src="images/post-sq-4.jpg" alt="" className="img-fluid me-3" />
                    <div>
                      <div className="post-meta d-block"><span className="date">Culture</span> <span className="mx-1">&bullet;</span> <span>Jul 5th '22</span></div>
                      <span>How to Avoid Distraction and Stay Focused During Video Calls?</span>
                    </div>
                  </a>
                </li>

              </ul>

            </div>
          </div>
        </div>
      </div>

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
              <div className="social-links mb-3 mb-lg-0 text-center text-md-end">
                <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                <a href="#" className="google-plus"><i className="bi bi-skype"></i></a>
                <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
              </div>

            </div>

          </div>

        </div>
      </div>

    </footer>
  )
}

export default Footer