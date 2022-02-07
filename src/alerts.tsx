import * as React from "react";
import Swal from "sweetalert2";

const warningAlert = () => {
  Swal.fire({
    position: "top",
    icon: "warning",
    title: "Oops!",
    text: "You must enter a task",
    showConfirmButton: false,
    timer: 1000,
    toast: true,
  });
};

const successAlert = () => {
  Swal.fire({
    position: "top",
    icon: "success",
    title: "Added!",
    text: "Task added",
    showConfirmButton: false,
    timer: 1000,
    toast: true,
  });
};

export { warningAlert, successAlert };
