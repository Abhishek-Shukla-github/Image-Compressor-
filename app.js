function process() {
  const file = document.querySelector("#upload").files[0];
  let sizeOP = document.querySelector(".sizeOP");
  let sizeIP = document.querySelector(".sizeIP");

  if (!file) return;

  //Define a file-reader to read the input file
  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = function (event) {
    const imgElement = document.createElement("img");
    imgElement.src = event.target.result;
    //Allows preview of image
    document.querySelector("#input").src = event.target.result;

    imgElement.onload = async (e) => {
      const canvas = document.createElement("canvas");
      const MAX_WIDTH = 400;
      //TO maintain the aspect ratio of height we will define a max width and then to
      //get height we will divide the max width by target width
      const scaleSize = MAX_WIDTH / e.target.width;
      canvas.width = MAX_WIDTH;
      canvas.height = e.target.height * scaleSize;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);

      //srcEncoded is our O/P image url which can then be passed on to the 
      //server for storage in DB or other purposes.
      const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpeg");

      // Displaying the compression rates
      document.querySelector("#output").src = srcEncoded;
      const IPfileImg = await fetch(event.target.result).then(r => r.blob());
      sizeIP.innerText = `Input Size -> ${IPfileImg.size / 1024} Kb`;
      const fileImg = await fetch(srcEncoded).then(r => r.blob());
      console.log(fileImg.size);
      sizeOP.innerText = `Output Size-> ${fileImg.size / 1024}KB`;
    };
  };
}
