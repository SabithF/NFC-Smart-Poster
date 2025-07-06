import { useState, useEffect } from 'react';
import { getDeviceId } from '../utils/fingerprint.js';
import { getUserProfile } from '../api/posterApi.js';

export const uniqueDevice = () => {
  const [deviceId, setDeviceId] = useState('');
  const [nickName, setNickName] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const init = async () => {
      let localDeviceId = localStorage.getItem('deviceId');
      let localNickName = localStorage.getItem('nickName');
      let localUserId = localStorage.getItem('userId');

      // 1. Generate device ID if not set
      if (!localDeviceId) {
        const id = await getDeviceId();
        localDeviceId = id;
        localStorage.setItem('deviceId', id);
      }

      setDeviceId(localDeviceId);

      // 2. Try getting user profile if already exists
      const profile = await getUserProfile(localDeviceId);

      if (profile) {
        localNickName = profile.nickName;
        localUserId = profile.userId;

        localStorage.setItem('nickName', localNickName);
        localStorage.setItem('userId', localUserId);
      }

      setNickName(localNickName || 'Thinking a name for you...');
      setUserId(localUserId || '');

      console.log('Device ID:', localDeviceId);
      console.log('Nickname:', localNickName);
      console.log('User ID:', localUserId);
    };

    init();
  }, []);

  return { deviceId, nickName, userId };
};
