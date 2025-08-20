
import { useState, useEffect } from 'react';
import { getDeviceId } from '../utils/fingerprint.js';
import { getOrCreateUserProfile } from '../api/posterApi.js';

export const uniqueDevice = () => {
  const [deviceId, setDeviceId] = useState('');
  const [nickName, setNickName] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const init = async () => {
      let localDeviceId = localStorage.getItem('deviceId');

      if (!localDeviceId) {
        const id = await getDeviceId();
        localDeviceId = id || '';
        if (localDeviceId) localStorage.setItem('deviceId', localDeviceId);
      }

      setDeviceId(localDeviceId);

      // get OR create user now
      let profile = null;
      if (localDeviceId) {
        profile = await getOrCreateUserProfile(localDeviceId);
      }

      const safeNick = profile?.nickName ?? '';
      const safeUserId = profile?.userId ?? ''; // server returns userId alias

      setNickName(safeNick);
      setUserId(safeUserId);

      if (safeNick) localStorage.setItem('nickName', safeNick);
      if (safeUserId) localStorage.setItem('userId', safeUserId);

      console.log('Device ID:', localDeviceId);
      console.log('Nickname:', safeNick);
      console.log('User ID:', safeUserId);
    };

    init();
  }, []);

  return { deviceId, nickName, userId };
};
