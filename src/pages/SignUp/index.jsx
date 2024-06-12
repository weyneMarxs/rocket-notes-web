import { useState } from 'react'
import { Toaster, toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Form, Background } from './styles'
import { FiUser, FiMail, FiLock } from 'react-icons/fi'

import { Input } from '../../components/InputText'
import { Button } from '../../components/Button'

import { api } from '../../services/api'
import { ButtonText } from '../../components/ButtonText'
export function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  function handleSignUp() {
    if (!name || !email || !password) {
      toast.warning('preencha todos os campos')
      return
    }
    api.post('/users', { name, email, password }).then(() => {
      toast.success('Usuário cadastrado com sucesso !')
      setTimeout(() => {
        handleBack()
      }, 1000)
    }).catch((error) => {
      if (error.response) {
        toast.error(error.response.data.message)
      } else {
        toast.error('não foi possivel cadastrar')
      }
    })
  }

  function handleBack() {
    navigate(-1)
  }
  return (
    <Container>
      <Background></Background>
      <Form>
        <h1>Rocket Notes</h1>
        <p>Aplicação para salver e gerenciar seus links úteis.</p>
        <h2>Crie sua conta</h2>
        <Input placeholder="Nome" type="text" icon={FiUser} onChange={e => setName(e.target.value)}></Input>
        <Input placeholder="E-mail" type="text" icon={FiMail} onChange={e => setEmail(e.target.value)}></Input>
        <Input placeholder="Senha" type="password" icon={FiLock} onChange={e => setPassword(e.target.value)}></Input>
        <Button title="Cadastrar" onClick={handleSignUp}></Button>

        <ButtonText title='voltar' onClick={handleBack} />
      </Form>
      <Toaster position="top-center" richColors toastOptions={{ style: { padding: '20px', } }} />
    </Container>
  )
}