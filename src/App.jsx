import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import styles from './form.module.css'

const schema = yup.object({
  nome: yup.string().required('O nome é obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres').max(10, 'No máximo 10 caracteres'),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password')
  ], 'As senhas precisam ser iguais')
}).required();


function App() {


  const [isSucess, setIsSucess] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data) =>{
    setIsSucess(true)
    console.log('Formulário submitido!')
    console.log(data)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.contentForm}>
        <div className={styles.formGroup}>
            <input type="text"
            placeholder='Seu nome'
            {...register('nome')}
            className={(errors.nome) ? styles.inputError : ''}
          />
          <span className={styles.labelError}>{errors.nome?.message}</span>
        </div>
        <div className={styles.formGroup}>
            <input type="email"
            placeholder='Seu e-mail'
            {...register('email')}
            className={(errors.email) ? styles.inputError : ''}
          />
          <span className={styles.labelError}>{errors.email?.message}</span>
        </div>
        <div className={styles.formGroup}>
            <input type="password"
            placeholder='Sua senha'
            {...register('password')}
            className={(errors.password) ? styles.inputError : ''}
          />
          <span className={styles.labelError}>{errors.password?.message}</span>
        </div>
        <div className={styles.formGroup}>
            <input type="password"
            placeholder='Confirme sua senha'
            {...register('password_confirmation')}
            className={(errors.password_confirmation) ? styles.inputError : ''}
          />
          <span className={styles.labelError}>{errors.password_confirmation?.message}</span>
        </div>
        <button type='submit'>Enviar formulário</button>
        
        {
          isSucess && <p className={styles.sucessMessage}>Formulário enviado com sucesso!</p>
        }

      </form>
    </>
  )
}

export default App
