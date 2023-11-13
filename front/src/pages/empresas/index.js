import React, { useEffect, useState } from "react";

import { EnvironmentOutlined } from '@ant-design/icons';

import { Card, List, Space } from "antd";
import { Link } from "react-router-dom";

import api from "../../services/api";
import { empresaEnderecoBulder } from "../../helpers/empresaEnderecoBuilder";

export default function Empresas() {
  const [empresas, setEmpresas] = useState([]); 

  useEffect(() => {
    document.title = "Empresas";
    const fechData = async () => {
      try {
        const { data } = await api.get('/empresas');
        setEmpresas(data);
      } catch (error) {
        console.log(error);
      }
    }
    fechData();
  }, []);

  return (
    <>
      {empresas.length >= 0 ? (
          <List
            grid={{ gutter: 16, column: 5 }}
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