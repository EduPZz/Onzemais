import React, { useEffect, useState } from "react";

import { EnvironmentOutlined, LoadingOutlined } from '@ant-design/icons';

import { Card, List } from "antd";
import { Link } from "react-router-dom";

import api from "../../services/api";
import { empresaEnderecoBulder } from "../../helpers/empresaEnderecoBuilder";

export default function Empresas() {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    document.title = "Empresas";
    const fetchData = async () => {
      try {
        const { data } = await api.get('/empresas');
        setEmpresas(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <LoadingOutlined style={{ fontSize: 64 }} />
      </div>
    );
  }

  return (
    <>
      {empresas.length >= 0 ? (
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
          dataSource={empresas}
          renderItem={(empresa) => (
            <List.Item>
              <Card
                title={empresa.nome}
                extra={
                <Link to={`/empresas/${empresa.id}`}>
                  Mais
                </Link>
                }
                style={{
                  width: 300,
                }}
              >
                <div>
                  <EnvironmentOutlined />
                  {empresaEnderecoBulder(empresa)}
                </div>
              </Card>
            </List.Item>)}
          />  
      ) : (
        <h1>Nenhuma empresa cadastrada!</h1>
      )}
    </>
  );
}