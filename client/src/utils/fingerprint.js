import FingerprintJS from '@fingerprintjs/fingerprintjs';
//import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

// // Initialize the agent on application start.
// export const fpPromise = FingerprintJS.load({
//   apiKey: "fIQ0zvPMwJWeSPFHv0xe",
//   region: "eu"
// })

// // Get the visitorId when you need it.
// fpPromise
//   .then(fp => fp.get())
//   .then(result => console.log(result.visitorId))

export const getDeviceId =  async () => {
    try {
        const uniqueDevice = await FingerprintJS.load({});
        const result  = await uniqueDevice.get();
        console.log("Device ID generated:", result.visitorId);
        return result.visitorId;


    } catch (error) {
        console.error("Error generating device ID:", error);
        return null;
        
    }
}