import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Container, Form, Avatar } from './styles'
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi'
import { api } from '../../services/api'
import { useAuth } from '../../hooks/auth'

import { Input } from '../../components/InputText'
import { Button } from '../../components/Button'
import avatarUser from '../../assets/avatar_placeholder.svg'
import { ButtonText } from '../../components/ButtonText'

export function Profile() {
  const navigation = useNavigate()
  const { user, updateProfile } = useAuth()
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [passwordOld, setPasswordOld] = useState()
  const [passwordNew, setPasswordNew] = useState()
  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarUser
  const [avatar, setAvatar] = useState(avatarUrl)
  const [avatarFile, setAvatarFile] = useState(null)


  async function handleUpdate() {
    const updated = { name, email, password: passwordNew, old_password: passwordOld }
    const userUpdate = Object.assign(user, updated)
    // return console.log(userUpdate)
    await updateProfile({ user: userUpdate, avatarFile })
  }
  function handleBack() {
    navigation(-1)
  }
  function handleChangeAvatar(event) {
    const file = event.target.files[0]
    setAvatarFile(file)
    const imagePreview = URL.createObjectURL(file)
    setAvatar(imagePreview)
  }
  return (
    <Container>
      <header>
        <ButtonText title={<FiArrowLeft />} onClick={handleBack} />
      </header>

      <Form>
        <Avatar>
          <img src={avatar} alt="Foto do Usuário" />
          <label htmlFor="avatar">
            <FiCamera />
            <input id='avatar' type='file' onChange={handleChangeAvatar} />
          </label>
        </Avatar>
        <Input placeholder="Nome" type="text" value={name} icon={FiUser} onChange={e => setName(e.target.value)}></Input>
        <Input placeholder="E-mail" type="text" value={email} icon={FiMail} onChange={e => setEmail(e.target.value)}></Input>
        <Input placeholder="Senha atual" type="password" autoComplete="on" icon={FiLock} onChange={e => setPasswordOld(e.target.value)}></Input>
        <Input placeholder="Nova senha" type="password" autoComplete="on" icon={FiLock} onChange={e => setPasswordNew(e.target.value)}></Input>
        <Button title="Atualizar" onClick={handleUpdate}></Button>
      </Form>
      <Toaster position="top-center" richColors toastOptions={{ style: { padding: '20px', } }} />
    </Container>
  )
}