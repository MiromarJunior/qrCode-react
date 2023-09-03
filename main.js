
// let scanerCode = null; //iniciando variavel null
async function openCamera() {
    const videoElement = document.getElementById("camera");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // Configuração para câmera traseira
      });
      videoElement.srcObject = stream;

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
        function (err) {
          if (err) {
            console.error("Erro ao iniciar Quagga:", err);
            return;
          }
          Quagga.start();
        }
      );
      
      Quagga.onDetected(function (result) {
        console.log("Código de barras detectado:", result.codeResult.code);
        alert("teste iuri"+result.codeResult.code)
        alert(result.codeResult.code + "chegou");
        teste(result.codeResult.code);//passando valor para variavel local
        document.querySelector("#resultado").innerText = result.codeResult.code;
        sendBarcodeToServer(result.codeResult.code); // Envia o código de barras ao servidor
        
        
      });
    } catch (error) {
      console.error("Erro ao acessar a câmera:", error);
    }
    
}
// module.exports = scanerCode;  
