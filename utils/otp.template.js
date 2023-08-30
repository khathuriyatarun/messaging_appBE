exports.otpTemplate = (name, pin) => {
    return `
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
        <p style="font-size:1.1em">Hi, ${name}</p>
        <p>Use the following OTP to complete your signup procedures. OTP is valid for 2 minutes</p>
        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${pin}</h2>
        <p style="font-size:0.9em;"><b>Keep Messaging</b></p>
        </div>
    </div>`
}