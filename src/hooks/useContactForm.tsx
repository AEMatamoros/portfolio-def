import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Notify } from "notiflix/build/notiflix-notify-aio";
export default function useContactForm() {
  //handle Send
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [disable, setDisable] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    setDisable(true);
    axios
      .post("https://portfolio-api-ten-sage.vercel.app/sendmail", {
        html: `
                <body>
                  <p>Querido Alexis,</p>
                
                  <p>Espero que estés bien. Soy ${data.name} de la compañia ${data.company} con numero de telefono ${data.phone} y correo ${data.email}. 
                
                  <p>${data.message}</p>
                </body>`,
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then(function (response: any) {
        if (response.status == 200) {
          Notify.success(
            "Gracias, por escribirme me pondre en contacto contigo."
          );
          reset({ name: "", email: "", subject: "" });
          return;
        }
        throw new Error("Error");
      })
      .catch(function () {
        // handle error
        Notify.failure("Lastimosamente ocurrio un error :c");
      })
      .finally(() => {
        setDisable(false);
      });
  };
  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    disable,
  };
}
