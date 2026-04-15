
import "./App.css"

import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

type FormData = {
  name: string
  date: string
  subject: string
  description: string
}

const schema = yup.object({
  name: yup.string().required("Nome e obrigatorio."),
  date: yup.string().required("Data e obrigatoria."),
  subject: yup.string().required("Selecione um assunto."),
  description: yup
    .string()
    .required("Descricao e obrigatoria.")
    .min(10, "a descricao precisa ter pelo menos 10 digitos")
})

export default function App() {
  const { control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      date: "",
      subject: "",
      description: ""
    },
    resolver: yupResolver(schema),
  })

  function onSubmit(data: FormData) {
    console.log(data)
  }

  return (
    <div>
      <h1>Evento </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <input type="text" placeholder="Nome do evento" {...field} />
          )}
        />

        {errors.subject?.message && <span className="error">{errors.subject.message}</span>}

        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <input
              type="date"
              placeholder="Nome do evento"
              {...field}
            />
          )}
        />
        {errors.date?.message && <span className="error">{errors.date.message}</span>}

        <Controller
          control={control}
          name="subject"
          render={({ field }) => (
            <select {...field}>
              <option value="" disabled>
                Selecione...
              </option>

              <option value="React">React</option>
              <option value="Node.js">Node.js</option>
              <option value="Javascript">Javascript</option>
              <option value="Typescript">Typescript</option>
            </select>
          )}
        />
        {errors.subject?.message && <span className="error">{errors.subject.message}</span>}

        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <textarea placeholder="Descrição" rows={4} {...field} />
          )}
        />
        {errors.description?.message && <span className="error">{errors.description.message}</span>}


        <button type="submit" >Salvar</button>
      </form>
    </div>
  )
}
