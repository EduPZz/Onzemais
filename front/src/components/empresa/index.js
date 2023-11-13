import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Divider, Typography } from "antd";
import { Card, List } from "antd";

import { empresaEnderecoBulder } from "../../helpers/empresaEnderecoBuilder";
import api from "../../services/api";
import map from "../../assets/map.jpg";
import { SkinTwoTone } from "@ant-design/icons";
import { FloatButton } from "antd";

const { Meta } = Card;
const { Title, Paragraph } = Typography;

const Empresa = () => {
  const { id } = useParams();
  const [empresa, setEmpresa] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(`/empresas/${id}`);
        setEmpresa(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  console.log(empresa);

  return (
    <>
      <Title level={2}>{empresa?.nome}</Title>
      <Paragraph>{empresa?.descricao}</Paragraph>
      <Paragraph>{empresaEnderecoBulder(empresa)}</Paragraph>
      <Paragraph>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            empresaEnderecoBulder(empresa)
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver no Google Maps
        </a>
      </Paragraph>

      {empresa?.EspacoEsportivo?.length > 0 && (
        <>
          <Divider />
          <Title level={3}>Espaços esportivos</Title>
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
            dataSource={empresa?.EspacoEsportivo}
            renderItem={(espacoEsportivo) => (
              <List.Item>
                <Card style={{ width: "100%" }} title={espacoEsportivo.tipo_espaco}>
                  <p>Tamanho: {espacoEsportivo.tamanho} m²</p>
                  <p>Capacidade: {espacoEsportivo.capacidade} pessoas</p>
                  <p>
                    Valor por hora: R$ {espacoEsportivo.valor_hora.toFixed(2)}
                  </p>
                </Card>
              </List.Item>
            )}
          />
        </>
      )}

      {empresa?.Colete?.length > 0 && (
        <>
          <Divider />
          <Title level={3}>Coletes</Title>
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
            dataSource={empresa?.Colete}
            renderItem={(colete) => (
              <List.Item>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={
                    <SkinTwoTone
                      twoToneColor={colete.cor}
                      style={{ fontSize: "100px" }}
                    />
                  }
                >
                  <Meta
                    description={`Valor por quantidade: R$ ${colete.valor_quantidade}`}
                  />
                </Card>
              </List.Item>
            )}
          />
        </>
      )}

      {empresa?.EspacoEsportivo.length > 0 || empresa?.Colete.length > 0 ? (
        <>
          <Button
            size="large"
            style={{
              position: "fixed",
              bottom: "20px",
              right: "32px",
              backgroundColor: "#8FDF70",
              borderColor: "#8FDF70",
              color: "#fff",
            }}
          >
            Alugar
          </Button>
        </>
      ) : null}
    </>
  );
};

export default Empresa;
