import React , { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import '../CSS/WebcamComponent.css';

import { Storage } from 'aws-amplify';

//npm install react-webcam

const WebcamComponent = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [width, setWidth] = useState(480);
  const [height, setHeight] = useState(340);
  const [widthImg, setWidthImg] = useState(480);
  const [heightImg, setHeightImg] = useState(340);
  const [ratio, setRatio] = useState(1.7777777778);

  const [file, setFile] = useState({ fileUrl: '', file: '', filename: '' });
  const [image, setImage] = useState('');

  const capture = useCallback(() => {
    const image = webcamRef.current.getScreenshot();    
    setImgSrc(image);
  }, [webcamRef, setImgSrc]);

  const close = () => {
    setImgSrc(null);
  };

  const handleCapSize = (event) => {
    event.preventDefault();
    setWidth(event.target.largura.value);
    setHeight(event.target.altura.value);
    setWidthImg(event.target.larguraImg.value);
    setHeightImg(event.target.alturaImg.value);
    setRatio(event.target.ratio.value);
  }

  const videoConstraints = {
    width: { width },
    height: { height },
    facingMode: "user",
    aspectRatio: { ideal: `${ratio}` }
  };

  const handleChange = e => {
    const currentFile = e.target.files[0];
    setFile(
      {
        fileUrl: URL.createObjectURL(currentFile),
        file: currentFile,
        filename: currentFile.name
      }
    );
  }

  const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }
  const uploadImg = () => {   
    const file = dataURLtoFile(imgSrc, 'upload.jpg');
    Storage.put("2021/11/0047606003310246563_003.jpg", file)  // public/teste/
      .then(() => {
        console.log('successfully uploading file!');
        setFile({ fileUrl: '', file: '', filename: '' });
        setImgSrc(null);
      })
      .catch(err => {
        console.error('error uploading file!', err);
      })
  };

  const downloadImg = () => {
    Storage.get('2021/11/0047606003310246563_003.jpg')
      .then((url) => {
        console.log('successfully downloaded file!');
        setImgSrc(url);
      })
      .catch(err => {
        console.error('error downloading file!', err);
      })
  };

  const saveFile = () => {
    Storage.put("2021/11/0047606003310246563_002.jpg", file.file)  // public/teste/
      .then(() => {
        console.log('successfully saved file!');
        setFile({ fileUrl: '', file: '', filename: '' });
      })
      .catch(err => {
        console.error('error saving file!', err);
      })
  };

  const getFile = () => {
    Storage.get('2021/11/0047606003310246563_002.jpg')
      .then((url) => {
        console.log('successfully downloaded file!');
        setImage(url);
      })
      .catch(err => {
        console.error('error downloading file!', err);
      })
  };

  return (
    <div className='webcams' style={{ marginTop: '10px' }}>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={widthImg}
        height={heightImg}
        videoConstraints={videoConstraints}
      />
      <div>
        <form onSubmit={handleCapSize}>
          <label>Definicao</label>
          <input type="text" name="largura" placeholder="Largura" alt="Largura" defaultValue={width} />
          <input type="text" name="altura" placeholder="Altura" alt="Altura" defaultValue={height} />
          <br></br>
          <label>Quadro Size</label>
          <input type="text" name="larguraImg" placeholder="Largura da Img" alt="Largura da Img" defaultValue={widthImg} />
          <input type="text" name="alturaImg" placeholder="Altura da Img" alt="Altura da Img" defaultValue={heightImg} />
          <label>Quadro Size</label><br></br>
          <input type="text" name="ratio" placeholder="Ratio" alt="Ratio" defaultValue={ratio} />
          <button type="submit">Alterar Definicoes</button>
        </form>
        <button onClick={capture}>Capture photo</button>
        <button onClick={close}>Close photo</button>
      </div>
      <div>
        {imgSrc && (
          <img
            src={imgSrc}
            alt=""
          />
        )}
        <div>
          <button onClick={uploadImg}>Upload image</button>
          <button onClick={downloadImg}>Download image</button>
        </div>
      </div>
      <div>
        <h1 className="App-title">Welcome to AWS S3</h1>
        <input type='file' onChange={handleChange} />
        <React.Fragment>
          <img src={file.fileUrl} alt="" />
        </React.Fragment>
        <button onClick={saveFile}>Save File</button>
        <button onClick={getFile}>Download Image</button>
        <div>
          {image !== '' && <img src={image} alt="" />}
        </div>
      </div>
    </div>
  )
};
export default WebcamComponent;