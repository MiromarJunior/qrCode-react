import { useEffect, useState } from 'react';
import Quagga from 'quagga';

import './App.css'

function App() {

  const [qr,setQr] =  useState("");

  const resposta = (value:string)=>{
    alert(value+"Miromar")
  }

 const  openCamera = async() => {
    const videoElement = document.getElementById("camera") as HTMLVideoElement;
  
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // Configuração para câmera traseira
      });
  
      if (videoElement) {
        videoElement.srcObject = stream;
      }
  
      Quagga.init(
        {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: videoElement,
          },
          decoder: {
            readers: ["code_128_reader", "ean_reader"],
          },
        },
        function (err: any) {
          if (err) {
            console.error("Erro ao iniciar Quagga:", err);
            return;
          }
          Quagga.start();
        }
      );
  
      Quagga.onDetected(function (result: any) {
        console.log("Código de barras detectado:", result.codeResult.code);
        alert("teste iuri" + result.codeResult.code);
        alert(result.codeResult.code + "chegou");
        setQr((result.codeResult.code).toString());
        resposta((result.codeResult.code).toString()+"Mirom")
        const resultadoElement = document.querySelector("#resultado") as HTMLElement;
        resultadoElement.innerText = result.codeResult.code;
      });
      
    } catch (error) {
      console.error("Erro ao acessar a câmera:", error);
    }
  }


  useEffect(() => {
 if(qr === ""){
  openCamera();
 }

   
  }, [qr]); // O array vazio [] garante que isso seja executado apenas uma vez, equivalente ao componentDidMount

  
  return (
    <>
    <h1>Abrir Câmera no Navegador!</h1>
    <div id="resultado">
       
    </div>
    
    <video id="camera" autoPlay></video>
     
       
    </>
  )
}

export default App
