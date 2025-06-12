import { useState, useEffect } from 'react';
import { getDeviceId, getDeviceIdPaid } from '../utils/fingerprint.js';
import { randomNickName } from '../utils/randonNameGenerator.js';

export default function uniqueDevice() {
  const [deviceId, setDeviceId] = useState('');
  const [nickName, setNickName] = useState('');

  useEffect(() => {
    const init = async () => {
      let localDeviceId = localStorage.getItem('deviceId');
      let localNickName = localStorage.getItem('nickName');

      if (!localDeviceId) {
        const id = await getDeviceId();
        if (id) {
          localDeviceId = id;
          localStorage.setItem('deviceId', id);
        }
      }

      if (!localNickName) {
        localNickName = randomNickName();
        localStorage.setItem('nickName', localNickName);
      }

      setDeviceId(localDeviceId);
      setNickName(localNickName);

      console.log('Device ID:', localDeviceId);
      console.log('Nickname:', localNickName);
    };

    init();
  }, []);

  return { deviceId, nickName };
}
