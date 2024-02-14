const KakaoLogin = () => {

  //http://localhost:5173/user/kakaoLogin?
  //code=IUhSy1hAmymdm168MfirSDZ1aG6WWA5CN-nziaNUXzFKPN7eDKofhsZbCBsKPXSXAAABjYKTkl1SGUcvaFb1Eg
  const searchParams = new URLSearchParams(document.location.search)


  return (
    <div>
      <h1>카카오 로그인 후에 보이면 땡큐하고.. {searchParams.get('code')}</h1>
    </div>
  )
}
export default KakaoLogin