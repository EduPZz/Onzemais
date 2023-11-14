import React, { useEffect, useState, useContext } from "react";

import { DollarCircleOutlined, DeleteOutlined } from '@ant-design/icons';

import { Card, List, Modal, Button } from "antd";
import { Link } from "react-router-dom";

import { Context } from "../../Context/AuthContext";

import api from "../../services/api";

export default function Locacoes() {
  const [locacoes, setLocacoes] = useState([]); 
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [locacaoToDelete, setLocacaoToDelete] = useState(null);

  const { user } = useContext(Context);

  useEffect(() => {
    document.title = "Minhas locacões";
    const fetchData = async () => {
      try {
        const { data } = await api.get(`/locacoes/usuario/${user.id}`);
        setLocacoes(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user.id]);

  const itemExiste = (item) =>{
    if (item?.length > 0){
      return true
    }
    return false;
  }

  
  const horaioBuilder = (locacao) => {
    let item = null;

    if (itemExiste(locacao.AluguelColete)){
      item = locacao.AluguelColete[locacao.AluguelColete.length - 1]
    }
    else if (itemExiste(locacao.Partida)){
      item = locacao.Partida[locacao.Partida.length - 1]
    }
    if (item === null) return ''

    const dataInicio = new Date(item.data_inicio_locacao);
    const dataFim = new Date(item.data_final_locacao);

    const dataInicioStr = dataInicio.toLocaleDateString([], {year: '2-digit', month: '2-digit', day: '2-digit'});
    const dataFimStr = dataFim.toLocaleDateString([], {year: '2-digit', month: '2-digit', day: '2-digit'});

    const options = { hour12: false, hour: '2-digit', minute: '2-digit' };

    if (dataInicioStr === dataFimStr) {
      return `${dataInicioStr} das ${dataInicio.toLocaleTimeString([], options)} às ${dataFim.toLocaleTimeString([], options)}`;
    } else {
      return `${dataInicioStr} - ${dataFimStr}`;
    }
  }

  const handleDeleteLocacao = async () => {
    try {
      await api.delete(`/locacoes/${locacaoToDelete.id}`);
      setLocacoes(locacoes.filter(locacao => locacao.id !== locacaoToDelete.id));
      setDeleteModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handlePagarLocacao = async (locacao) => {
    try {
      await api.patch(`/locacoes/${locacao.id}`, { foi_pago: true });
      setLocacoes(locacoes.map(l => l.id === locacao.id ? { ...l, foi_pago: true } : l));
    } catch (error) {
      console.log(error);
    }
  }

  const date = new Date();
  const year = date.getFullYear().toString().substr(-2);
  console.log(year); // Output: 21 (if the current year is 2021)

  return (
    <>
      {locacoes.length >= 0 ? (
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
          }}
          dataSource={locacoes}
          renderItem={(locacao) => (
            <List.Item>
              <Card
                title={`${horaioBuilder(locacao)}`}
                style={{
                  width: 300,
                }}
              >
                <div>
                  {itemExiste(locacao.AluguelColete) && (
                    <>
                      <span style={{opacity: 0.5,fontStyle: 'italic'}} >x{locacao.AluguelColete.length}</span> Coletes 
                    </>
                  )}
                </div>
                <div>
                  {itemExiste(locacao.Partida) && (
                    <>
                      <span style={{opacity: 0.5, fontStyle: 'italic'}} >x{locacao.Partida.length}</span> Partidas 
                    </>
                  )}
                </div>
                <DollarCircleOutlined style={{marginTop:"8px", fontSize: '12px', marginRight: '4px'}} />
                <span>{`${locacao.valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`}</span>
                <div style={{marginTop:"8px", display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div style={{display: 'flex', alignItems: 'center'}}> 
                    {locacao.foi_pago ? <div style={{marginTop: '4px', color: 'green'}}>Pago</div> : <div style={{marginTop: '4px', color: 'green'}}>Não pago</div>}
                  </div>
                  <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                    {!locacao.foi_pago && (
                      <Button type="primary" onClick={() => handlePagarLocacao(locacao)}>Pagar</Button>
                    )}
                    <DeleteOutlined style={{marginLeft: '10px'}} onClick={() => {
                      setLocacaoToDelete(locacao);
                      setDeleteModalVisible(true);
                    }} />
                  </div>
                </div>
               
              </Card>
            </List.Item>)}
          />  
      ) : (
        <h1>Nenhuma empresa cadastrada!</h1>
      )}
      <Modal
        title="Excluir locação"
        visible={deleteModalVisible}
        onOk={handleDeleteLocacao}
        onCancel={() => setDeleteModalVisible(false)}
      >
        <p>Deseja realmente excluir esta locação?</p>
      </Modal>
    </>
  );
}