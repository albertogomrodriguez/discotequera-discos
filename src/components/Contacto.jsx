import React from "react";
import { Card } from "react-bootstrap";
import { useForm } from "react-hook-form";

function Contacto() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {

    console.log("Datos del formulario:", data);
  };

  return (
    <div className="card d-flex-center m-4 big-form">
      <h5 className="card-title">Formulario de Contacto</h5>
      <div className="card-body contact-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Nombre:</label>
            <input
              {...register("nombre", { required: "Nombre requerido" })}
              className="form-control"
            />
            {errors.nombre && (
              <span className="text-danger">{errors.nombre.message}</span>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Apellidos:</label>
            <input
              {...register("apellidos", { required: "Apellidos requeridos" })}
              className="form-control"
            />
            {errors.apellidos && (
              <span className="text-danger">{errors.apellidos.message}</span>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Teléfono:</label>
            <input
              {...register("telefono", { required: "Teléfono requerido" })}
              className="form-control"
            />
            {errors.telefono && (
              <span className="text-danger">{errors.telefono.message}</span>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Correo Electrónico:</label>
            <input
              {...register("correo", {
                required: "Correo electrónico requerido",
                pattern: /^\S+@\S+$/i,
              })}
              className="form-control"
            />
            {errors.correo && (
              <span className="text-danger">{errors.correo.message}</span>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Mensaje:</label>
            <textarea
              {...register("mensaje", { required: "Mensaje requerido" })}
              className="form-control"
            />
            {errors.mensaje && (
              <span className="text-danger">{errors.mensaje.message}</span>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contacto;
