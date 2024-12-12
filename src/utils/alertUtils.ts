import Swal, { SweetAlertOptions } from 'sweetalert2';

const showAlert = async (options: SweetAlertOptions) => {
  try {
    return await Swal.fire(options);
  } catch (error) {
    console.error('Error showing alert:', error);
  }
};

const warningAlert = async () => {
  await Swal.fire({
    position: 'top',
    icon: 'warning',
    title: 'Oops!',
    text: 'You must enter a task',
    showConfirmButton: false,
    timer: 1000,
    toast: true,
  });
};

const successAlert = async () => {
  await Swal.fire({
    position: 'top',
    icon: 'success',
    title: 'Added!',
    text: 'Task added',
    showConfirmButton: false,
    timer: 1000,
    toast: true,
  });
};

export { showAlert, successAlert, warningAlert };
