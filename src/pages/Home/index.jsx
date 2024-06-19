import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FiPlus, FiSearch } from 'react-icons/fi'
import { Container, Brand, Menu, Search, Content, NewNote } from './styles'

import { Note } from '../../components/Note'
import { Header } from '../../components/Header'
import { Section } from '../../components/Section'
import { Input } from '../../components/InputText'
import { ButtonText } from '../../components/ButtonText'
import { api } from '../../services/api'
export function Home() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [tags, setTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [notes, setNotes] = useState([])

  function handleTagSelected(tagName) {
    if (tagName === 'all') {
      return setSelectedTags([])
    }
    const alreadySelected = selectedTags.includes(tagName)
    if (alreadySelected) {
      const filteredTags = selectedTags.filter(tag => tag !== tagName)
      setSelectedTags(filteredTags)
    } else {
      setSelectedTags(prevState => [...prevState, tagName])
    }
  }

  function handleDetailsNotes(id) {
    navigate(`/details/${id}`)
  }
  useEffect(() => {
    async function fetchTags() {
      const response = await api.get('/tags')

      setTags(response.data)
    }
    fetchTags()
  }, [])
  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(`/notes?title=${search}&tags=${selectedTags}`)
      setNotes(response.data)
    }
    fetchNotes()
  }, [selectedTags, search])
  return (
    <Container>
      <Brand>
        <h1>RocketNotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
          <ButtonText title="Todos" isActive={selectedTags.length === 0} onClick={() => handleTagSelected('all')} />
        </li>
        {
          tags && tags.map(tag => (
            <li key={tag.id}>
              <ButtonText title={tag.name} onClick={() => handleTagSelected(tag.name)} isActive={selectedTags.includes(tag.name)} />
            </li>
          ))
        }

      </Menu>

      <Search>
        <Input placeholder="pesquisar pelo titulo" icon={FiSearch} onChange={e => setSearch(e.target.value)} />
      </Search>

      <Content>
        <Section title={'Minhas Notas'}>
          {
            notes.length > 0 ? notes.map(note => (
              <Note key={String(note.id)} data={note} onClick={() => handleDetailsNotes(note.id)} />
            )) : <h3>Nenhuma nota cadastra ainda !</h3>
          }
        </Section>
      </Content>

      <NewNote to="/new">
        <FiPlus />
        Criar nota
      </NewNote>
    </Container>
  )
}