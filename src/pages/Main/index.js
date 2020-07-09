import React, { useState, useEffect, useCallback } from 'react';
import { FaListAlt } from 'react-icons/fa';

import api from '../../services/api';

import {
  Input,
  Button,
  ListToDo,
  InfoHeader,
  ImageComponent,
} from '../../components';

import { Container, Content, FormComponent, FormContent } from './styles';

function Main() {
  const [tasks, setTasks] = useState([]);
  const [checked, setChecked] = useState(0);

  const toggleCheck = useCallback(() => {
    const checkedValue = checked;

    return checkedValue === 0 ? setChecked(1) : setChecked(0);
  }, [checked, tasks]);

  const handleSubmit = (data, { reset }) => {
    // try {
    //   api.post('api/tarefas', data);
    // } catch (error) {
    //   console.log('Error', error);
    // }

    console.log(data);
    setTasks([...tasks, data]);

    reset();
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await api.get('api/tarefas');

        setTasks(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Container>
        <InfoHeader />

        <Content>
          <ImageComponent />

          <div>
            <FormContent>
              <h1>
                <FaListAlt color="#5e68c3" size={24} />
                Lista de tarefas
              </h1>
              <FormComponent onSubmit={handleSubmit}>
                <Input
                  name="titulo"
                  type="text"
                  placeholder="Titulo da tarefa"
                />

                <Input
                  name="descricao"
                  type="text"
                  placeholder="Descrição da tarefa"
                  textarea
                  maxLength="190"
                />

                <span>
                  <Input
                    name="concluido"
                    type="checkbox"
                    value={checked}
                    onChange={toggleCheck}
                  />

                  <Button />
                </span>
              </FormComponent>
            </FormContent>

            <ListToDo data={tasks} />
          </div>
        </Content>
      </Container>
    </>
  );
}

export default Main;
