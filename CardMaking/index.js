function drawImage(ctx, imageFile, x, y, imageWidth, imageHeight) {
    // Check if the imageFile is not null before reading it
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const imageUrl = event.target.result;
        const img = new Image();
        img.onload = function () {
          ctx.drawImage(img, x - (imageWidth * 0.5), y - (imageHeight * 0.5), imageWidth, imageHeight);
        };
        img.src = imageUrl;
      };
        reader.readAsDataURL(imageFile);
    }
  }

function drawUpsideDown(ctx, imageFile, x, y, imageWidth, imageHeight) {
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const imageUrl = event.target.result;
          const img = new Image();
          img.onload = function () {
            ctx.save();
            ctx.scale(1,-1);
            ctx.drawImage(img, x - (imageWidth * 0.5), -1 * (y - (imageHeight * 0.5)), imageWidth, -imageHeight);
            ctx.restore();
          };
          img.src = imageUrl;
        };
          reader.readAsDataURL(imageFile);
      }

}

function generateCard(symbol, value) {
    //825 x 1125
    const canvas = document.getElementById("card1");
    const ctx = canvas.getContext("2d");

    const heartImg = document.getElementById("heartImage").files[0];
    const clubImg = document.getElementById("clubImage").files[0];
    const diamondImg = document.getElementById("diamondImage").files[0];
    const spadeImg = document.getElementById("spadeImage").files[0];

    const jackImg = document.getElementById("jackImage").files[0];
    const kingImg = document.getElementById("kingImage").files[0];
    const queenImg = document.getElementById("queenImage").files[0];

    const bgColor = document.getElementById("bgColor").value;
    const heartsColor = document.getElementById("heartsColor").value;
    const clubsColor = document.getElementById("clubsColor").value;
    const diamondsColor = document.getElementById("diamondsColor").value;
    const spadesColor = document.getElementById("spadesColor").value;

    var fontSize = document.getElementById("fontSizeInput").value;
    if(symbol == "USEFORM") {
        var cardValue = document.getElementById("cardValue").value;
        var cardSymbol = document.getElementById("cardSymbol").value;
    } else {
        var cardValue = value;
        var cardSymbol = symbol;
    }
    

    //selecting font
    const fontOptions = document.querySelectorAll('input[name="inlineRadioOptions"]');
    let selectedFont;
    fontOptions.forEach((option) => {
      if (option.checked) {
        selectedFont = option.value;
      }
    });

    ctx.font = fontSize + "px " + selectedFont;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear initially
    ctx.fillStyle = bgColor;
    ctx.fillRect(0,0,825,1125);
    ctx.fillStyle = "#000000";
    ctx.textBaseline = "top";
    
    //SYMBOL: H,D,C,S
    //TYPE: A,2,3,4,5,6,7,8,9,10,K,Q,J
    function drawCard(symbol, type) {

        let symbolImg;
        let cardColor;
      
        if (symbol === "H") {
            symbolImg = heartImg;
            cardColor = heartsColor;
          } else if (symbol === "D") {
            symbolImg = diamondImg;
            cardColor = diamondsColor;
          } else if (symbol === "S") {
            symbolImg = spadeImg;
            cardColor = spadesColor;
          } else {
            symbolImg = clubImg;
            cardColor = clubsColor;
          }

       //make 10 SMALL
       ctx.font = fontSize + "px " + selectedFont;
        if(type == "10") {
            ctx.font = fontSize * (0.5) + "px " + selectedFont;            
        }

        //first draw numbers and symbol under it
        ctx.fillStyle = cardColor; var tempM = ctx.measureText(type);
        

        ctx.fillText(type, 88,88); // top left
        drawImage(ctx, symbolImg, 88 + (tempM.width * 0.5), 88 + parseInt(fontSize) * ((type=="10" ? 0.5 : 1) + 1/3) , 75,75);

        ctx.save();
        ctx.rotate(Math.PI);
        ctx.fillText(type, -736, -1036);
        ctx.restore();

        drawUpsideDown(ctx, symbolImg, 736 - (tempM.width * 0.5), 1036 - parseInt(fontSize) * ((type=="10" ? 0.5 : 1) + 1/3), 75,75);
        
        
        if(type == "A") {
            //draw A
            drawImage(ctx, symbolImg, canvas.width * 0.5, canvas.height * 0.5, 125, 125);
        } else if(type == "2") {
            //draw 2
            drawImage(ctx, symbolImg, canvas.width * 0.5, canvas.height * 0.5 - 370, 125, 125);
            drawUpsideDown(ctx, symbolImg, canvas.width * 0.5, canvas.height * 0.5 + 370, 125, 125);
        } else if(type == "3") {
            //draw 3
            drawImage(ctx, symbolImg, canvas.width * 0.5, canvas.height * 0.5, 125, 125);
            drawImage(ctx, symbolImg, canvas.width * 0.5, canvas.height * 0.5 - 370, 125, 125);
            drawUpsideDown(ctx, symbolImg, canvas.width * 0.5, canvas.height * 0.5 + 370, 125, 125);
        } else if(type == "4") {
            //draw 4
            drawImage(ctx, symbolImg, canvas.width * 0.5 - 125, canvas.height * 0.5 - 370, 125, 125);
            drawUpsideDown(ctx, symbolImg, canvas.width * 0.5 - 125, canvas.height * 0.5 + 370, 125, 125);
            drawImage(ctx, symbolImg, canvas.width * 0.5 + 125, canvas.height * 0.5 - 370, 125, 125);
            drawUpsideDown(ctx, symbolImg, canvas.width * 0.5 + 125, canvas.height * 0.5 + 370, 125, 125);
        } else if(type == "5") {
            //draw 5
            drawImage(ctx, symbolImg, canvas.width * 0.5, canvas.height * 0.5, 125, 125);
            drawImage(ctx, symbolImg, canvas.width * 0.5 - 125, canvas.height * 0.5 - 370, 125, 125);
            drawUpsideDown(ctx, symbolImg, canvas.width * 0.5 - 125, canvas.height * 0.5 + 370, 125, 125);
            drawImage(ctx, symbolImg, canvas.width * 0.5 + 125, canvas.height * 0.5 - 370, 125, 125);
            drawUpsideDown(ctx, symbolImg, canvas.width * 0.5 + 125, canvas.height * 0.5 + 370, 125, 125);
        } else if(type == "6") {
            //draw 6
            drawImage(ctx, symbolImg, canvas.width * 0.5 - 125, canvas.height * 0.5, 125, 125);
            drawImage(ctx, symbolImg, canvas.width * 0.5 + 125, canvas.height * 0.5, 125, 125);
            drawImage(ctx, symbolImg, canvas.width * 0.5 - 125, canvas.height * 0.5 - 370, 125, 125);
            drawUpsideDown(ctx, symbolImg, canvas.width * 0.5 - 125, canvas.height * 0.5 + 370, 125, 125);
            drawImage(ctx, symbolImg, canvas.width * 0.5 + 125, canvas.height * 0.5 - 370, 125, 125);
            drawUpsideDown(ctx, symbolImg, canvas.width * 0.5 + 125, canvas.height * 0.5 + 370, 125, 125);
        } else if(type == "7") {
            //draw 7
            drawImage(ctx, symbolImg, canvas.width * 0.5, canvas.height * 0.5 - 185, 125, 125);
            drawImage(ctx, symbolImg, canvas.width * 0.5 - 125, canvas.height * 0.5, 125, 125);
            drawImage(ctx, symbolImg, canvas.width * 0.5 + 125, canvas.height * 0.5, 125, 125);
            drawImage(ctx, symbolImg, canvas.width * 0.5 - 125, canvas.height * 0.5 - 370, 125, 125);
            drawUpsideDown(ctx, symbolImg, canvas.width * 0.5 - 125, canvas.height * 0.5 + 370, 125, 125);
            drawImage(ctx, symbolImg, canvas.width * 0.5 + 125, canvas.height * 0.5 - 370, 125, 125);
            drawUpsideDown(ctx, symbolImg, canvas.width * 0.5 + 125, canvas.height * 0.5 + 370, 125, 125);
        } else if(type == "8") {
            //draw 8
            drawUpsideDown(ctx, symbolImg, canvas.width * 0.5, canvas.height * 0.5 + 185, 125, 125);
            drawImage(ctx, symbolImg, canvas.width * 0.5, canvas.height * 0.5 - 185, 125, 125);
            drawImage(ctx, symbolImg, canvas.width * 0.5 - 125, canvas.height * 0.5, 125, 125);
            drawImage(ctx, symbolImg, canvas.width * 0.5 + 125, canvas.height * 0.5, 125, 125);
            drawImage(ctx, symbolImg, canvas.width * 0.5 - 125, canvas.height * 0.5 - 370, 125, 125);
            drawUpsideDown(ctx, symbolImg, canvas.width * 0.5 - 125, canvas.height * 0.5 + 370, 125, 125);
            drawImage(ctx, symbolImg, canvas.width * 0.5 + 125, canvas.height * 0.5 - 370, 125, 125);
            drawUpsideDown(ctx, symbolImg, canvas.width * 0.5 + 125, canvas.height * 0.5 + 370, 125, 125);
        } else if(type == "9") {
            //draw 9
            drawImage(ctx, symbolImg, canvas.width * 0.5, canvas.height * 0.5, 125, 125);
            drawUpsideDown(ctx, symbolImg, canvas.width * 0.5 - 125, canvas.height * 0.5 + 123.33, 125, 125);
            drawUpsideDown(ctx, symbolImg, canvas.width * 0.5 + 125, canvas.height * 0.5 + 123.33, 125, 125);
            drawImage(ctx, symbolImg, canvas.width * 0.5 + 125, canvas.height * 0.5 - 123.33, 125, 125);
            drawImage(ctx, symbolImg, canvas.width * 0.5 - 125, canvas.height * 0.5 - 123.33, 125, 125);
            drawImage(ctx, symbolImg, canvas.width * 0.5 - 125, canvas.height * 0.5 - 370, 125, 125);
            drawUpsideDown(ctx, symbolImg, canvas.width * 0.5 - 125, canvas.height * 0.5 + 370, 125, 125);
            drawImage(ctx, symbolImg, canvas.width * 0.5 + 125, canvas.height * 0.5 - 370, 125, 125);
            drawUpsideDown(ctx, symbolImg, canvas.width * 0.5 + 125, canvas.height * 0.5 + 370, 125, 125);
        } else if(type == "10") {
            //draw 10
            drawImage(ctx, symbolImg, canvas.width * 0.5, canvas.height * 0.5 - 246.66, 125, 125);
            drawUpsideDown(ctx, symbolImg, canvas.width * 0.5, canvas.height * 0.5 + 246.66, 125, 125);
            drawUpsideDown(ctx, symbolImg, canvas.width * 0.5 - 125, canvas.height * 0.5 + 123.33, 125, 125);
            drawUpsideDown(ctx, symbolImg, canvas.width * 0.5 + 125, canvas.height * 0.5 + 123.33, 125, 125);
            drawImage(ctx, symbolImg, canvas.width * 0.5 + 125, canvas.height * 0.5 - 123.33, 125, 125);
            drawImage(ctx, symbolImg, canvas.width * 0.5 - 125, canvas.height * 0.5 - 123.33, 125, 125);
            drawImage(ctx, symbolImg, canvas.width * 0.5 - 125, canvas.height * 0.5 - 370, 125, 125);
            drawUpsideDown(ctx, symbolImg, canvas.width * 0.5 - 125, canvas.height * 0.5 + 370, 125, 125);
            drawImage(ctx, symbolImg, canvas.width * 0.5 + 125, canvas.height * 0.5 - 370, 125, 125);
            drawUpsideDown(ctx, symbolImg, canvas.width * 0.5 + 125, canvas.height * 0.5 + 370, 125, 125);
        } else if(type == "J") {
            drawImage(ctx, jackImg, canvas.width * 0.5, canvas.height * 0.5, 825 * 0.8, 1125 * 0.8);
        } else if(type =="K") {
            drawImage(ctx, kingImg, canvas.width * 0.5, canvas.height * 0.5, 825 * 0.8, 1125 * 0.8);
        } else if(type == "Q") {
            drawImage(ctx, queenImg, canvas.width * 0.5, canvas.height * 0.5, 825 * 0.8, 1125 * 0.8);
        } else {
            ctx.fillText("ERROR", 100, 300);
        } 
    }

    drawCard(cardSymbol, cardValue);

}

function generateForm() {
    generateCard("USEFORM", "X");
}

function generateCardWithDelay(symbol, value, delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            generateCard(symbol, value);
            console.log("Done with " + symbol + value);
            resolve();
        }, delay);
    });
}


// WARNING: doesn't work :(
async function generateZip() {
    const cardBlobs = [];

    const symbols = ["H", "D", "C", "S"];
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "K", "Q"];

    const cardCanvas = document.getElementById("card1");

    for(const symbol of symbols) {
        for(const value of values) {
            
            await generateCardWithDelay(symbol, value, 10);
            
            cardCanvas.toBlob(function (blob) {
                cardBlobs.push(blob);
                if(cardBlobs.length === 52) {
                    console.log("Done!");
                    const cardZip = new JSZip();

                    cardBlobs.forEach((blob, index) => {
                        //gen filename
                        const filename = `${symbols[Math.floor(index / 13)]}${values[index % 13]}.png`;
                        //add BLOB
                        cardZip.file(filename, blob, { binary: true });
                    });
                    
                    cardZip.generateAsync({ type: "blob" })
                        .then(function (content) {
                            // once ZIP is ready, prompt user to download it
                            const downloadLink = document.createElement('a');
                            downloadLink.href = URL.createObjectURL(content);
                            downloadLink.download = "cards.zip";
                            downloadLink.textContent = "Download All Cards";
                            document.body.appendChild(downloadLink);
                            downloadLink.click();
                        });

                }
            });
        }
    }
}