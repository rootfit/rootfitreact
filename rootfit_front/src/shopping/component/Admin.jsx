import React, { useState } from 'react';
import axios from 'axios';


const Admin = () => {

  const [name, setName] = useState('');
  const [kind, setKind] = useState('');
  const [price, setPrice] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState();

  const upload = async (e) => {
    e.preventDefault()
    console.log(name, kind, price, content, file)
    if (file) {
      //사진이 포함되면 서버에 FormData 로 넘기는 것은 맞습니다.
      //나머지 입력한 데이터는 아래처럼 하나하나 별개로 append 시켜도 되고.. 
      //json 으로 한꺼번에 넘겨도 되고..
      const formData = new FormData();
      formData.append('name', name)
      formData.append('kind', kind)
      formData.append('price', price)
      formData.append('content', content)
      formData.append('image', file)

      console.log(content, file)

      const resp = await axios.post('http://localhost:8000/shopping/product', formData)

      if (resp.data.status === 200) {
        alert('upload ok')
        window.location.reload(); // 페이지 새로고침
      }
    } else {
      alert('데이터를 입력하지 않았습니다.')
    }
  }

  return (
    <div>

      <h2>관리자 페이지(상품추가)</h2>
      <form id="form" action="#" method="post" encType="multipart/form-data">
        <label>
          Name:
          <input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Kind:
          <input type='text' name='kind' value={kind} onChange={(e) => setKind(e.target.value)} />
        </label>
        <br />
        <label>
          Price:
          <input type='text' name='price' value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <br />
        <label>
          Content:
          <input type='file' name='content' onChange={(e) => setContent(e.target.files[0])} />
        </label>

          <br />
        <label>
          Image:
          <input type="file" name="image" onChange={(e) => setFile(e.target.files[0])} />
        </label>
        <br />
        <input type="button" value="상품추가" onClick={upload} />
      </form>
      <br />

    </div>
  );
};

export default Admin;
