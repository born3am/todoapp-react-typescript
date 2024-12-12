import Swal, { SweetAlertOptions } from 'sweetalert2';

export const showAlert = async (options: SweetAlertOptions) => {
  try {
    return await Swal.fire(options);
  } catch (error) {
    console.error('Error showing alert:', error);
  }
};