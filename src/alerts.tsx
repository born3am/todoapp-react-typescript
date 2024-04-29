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

// const born3amFooter = () => {
//   Swal.fire({
//     title: "Custom width, padding, color, background.",
//     imageHeight: 1500,

//     width: 600,
//     padding: "3em",
//     color: "#716add",
//     background: "#fff url(/images/trees.png)",
//     backdrop: `
//     rgba(0,0,123,0.4)
//     url("/images/nyan-cat.gif")
//     left top
//     no-repeat
//   `,
//   });
// };


export { warningAlert, successAlert };
