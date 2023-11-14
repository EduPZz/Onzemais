import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../services/api";
import { Card, Modal, Form, Input, Button, DatePicker, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import campo from "../../assets/Soccer-Field.svg";

const { RangePicker } = DatePicker;

export function Alugar() {
  const { id } = useParams();
  const [empresa, setEmpresa] = useState(null);
  const [produtos, setProdutos] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [dataInicioLocacao, setDataInicioLocacao] = useState(null);
  const [dataFinalLocacao, setDataFinalLocacao] = useState(null);
  const [partida, setPartida] = useState(null);

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

  const hasEmpresaEspaco = () => {
    if (empresa?.EspacoEsportivo?.length > 0) {
      return true;
    }
    return false;
  };

  const hasEmpresaColetes = () => {
    if (empresa?.Coletes?.length > 0) {
      return true;
    }
    return false;
  };

  const handleClick = () => {
    setShowModal(true);
  };

  const onFinishPartida = async (values) => {
    setPartida({
      ...values,
      data_inicio_locacao: dataInicioLocacao,
      data_final_locacao: dataFinalLocacao,
    });

    setShowModal(false);

    // try {
    //   const { data } = await api.post(`/partida`, {
    //     ...values,
    //     data_inicio_locacao: dataInicioLocacao,
    //     data_final_locacao: dataFinalLocacao,
    //   });
    //   console.log(data);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  console.log(hasEmpresaColetes());

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Alugar</h1>
      {empresa && (
        <div>
          <h2>Produtos</h2>
          {produtos === null && (
            <>
              {hasEmpresaEspaco() && (
                <Card
                  hoverable
                  style={{ width: 240, marginTop: 32 }}
                  cover={<img alt="example" src={campo} />}
                  onClick={handleClick}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <PlusOutlined />
                    <span style={{ marginLeft: 8 }}>Marcar partida</span>
                  </div>
                </Card>
              )}
            </>
          )}
        </div>
      )}
      <Modal
        title="Marcar partida"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          onFinish={onFinishPartida}
        >
          <Form.Item name="espacoId" label="Espaço esportivo">
            <Select>
              {empresa?.EspacoEsportivo?.map((espaco) => (
                <Select.Option value={espaco.id} key={espaco.id}>
                  <p>{espaco.tipo_espaco}</p>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="RangePicker">
            <RangePicker
              showTime={{ format: "HH:mm" }}
              onChange={(dates) => {
                setDataInicioLocacao(dates[0]);
                setDataFinalLocacao(dates[1]);
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Enviar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
