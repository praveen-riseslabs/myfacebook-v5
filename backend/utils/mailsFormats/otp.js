export const getOtpHtml = (otp) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
        body {
            margin: 2rem;
        }
        .content {
            font-size: 1rem;
        }
        .otp {
            font-weight: bold;
        }
	    .container{
	        margin-top:2rem;
	        display:flex;
	        justify-content:center
	    }
      .otp-container{
          background-color: #e2e2e279;
	        padding:1rem;
	        font-size:1.2rem;
	        letter-spacing:0.5rem;
	        font-weight:bold;
	        border-radius:0.5rem;
	        border:2px solid #f0a8a8;
	        display:inline;
        }
      .otp-container:hover{
          user-select:none;
          cursor:pointer;
        }
        </style>
      </head>
      <body>
        <p class="content">
          your one time password (OTP) is <span class="otp">${otp}</span>
        </p>
        <div class="container">
        <p class="otp-container" title="copy otp" role="button">
        ${otp}
        </p>
        </div>
        
        <script>
        const copyField = document.querySelector(".otp-container")
        copyField.addEventListener("click", async (e) => {
          const textToCopy = copyField.innerText;
          await navigator.clipboard.writeText(textToCopy);
        });
        </script>
      </body>
    </html>
`;
};
