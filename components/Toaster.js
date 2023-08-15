import Toast from 'react-native-toast-message';

export const successToast = message => {
  Toast.show({
    type: 'success',
    text1: message,
    position: 'bottom',
  });
};

export const errorToast = () => {
  Toast.show({
    type: 'error',
    text1: 'Something went wrong',
    position: 'bottom',
  });
};

export const infoToast = () => {
  Toast.show({
    type: 'info',
    text1: 'Information ',
    position: 'bottom',
  });
};
