import FingerprintJS from '@fingerprintjs/fingerprintjs';
//import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

// Initialize the agent on application start.

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


export const getDeviceIdPaid =  async () => {
    try {
        const uniqueDevice = await FingerprintJS.load({
            apiKey: "fIQ0zvPMwJWeSPFHv0xe",
            region: "eu"
        });
        const result  = await uniqueDevice.get();
        console.log("Device ID generated:", result.visitorId);
        return result.visitorId;


    } catch (error) {
        console.error("Error generating device ID:", error);
        return null;
        
    }
}