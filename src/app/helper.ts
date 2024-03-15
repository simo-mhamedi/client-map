import Swal from 'sweetalert2';

export class Helper {
    errorMessage;
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }

    showAlert() {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: this.errorMessage || "Default Error Message"
        });
    }


}
