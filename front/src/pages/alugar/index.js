import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../services/api";
import {
  Card,
  Modal,
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  List,
  Popconfirm,
  message,
} from "antd";
import { PlusOutlined, DeleteOutlined, SkinTwoTone } from "@ant-design/icons";
import campo from "../../assets/Soccer-Field.svg";
import Meta from "antd/es/card/Meta";

const { RangePicker } = DatePicker;

export function Alugar() {
  const { id } = useParams();
  const [empresa, setEmpresa] = useState(null);
  const [showAddPartidaModal, setShowAddPartidaModal] = useState(false);
  const [showAddColeteModal, setShowAddColeteModal] = useState(false);
  const [form] = Form.useForm();
  const [dataInicioLocacaoPartida, setDataInicioLocacaoPartida] = useState(null);
  const [dataFinalLocacaoPartida, setDataFinalLocacaoPartida] = useState(null);
  const [dataInicioLocacaoColete, setDataInicioLocacaoColete] = useState(null);
  const [dataFinalLocacaoColete, setDataFinalLocacaoColete] = useState(null);
  const [partidas, setPartidas] = useState([]);
  const [coletes, setColetes] = useState([]);

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
    console.log(empresa)

    if (empresa?.Colete?.length > 0) {
      return true;
    }
    return false;
  };

  const handleClick = () => {
    setShowAddPartidaModal(true);
  };

  const handleOpenAddColeteModal = () => {
    setShowAddColeteModal(true);
  };

  const onFinishPartida = async (values) => {
    const partida = {
      ...values,
      data_inicio_locacao: dataInicioLocacaoPartida,
      data_final_locacao: dataFinalLocacaoPartida,
    };

    partidas.push(partida);

    setShowAddPartidaModal(false);
  };

  const onFinishColete = async (values) => {
    const colete = {
      ...values,
      data_inicio_locacao: dataInicioLocacaoColete,
      data_final_locacao: dataFinalLocacaoColete,
    };
    
    coletes.push(colete);
    setShowAddColeteModal(false);
  }
  const horarioBuilder = (partida) => {
    const dataInicio = new Date(partida.data_inicio_locacao);
    const dataFim = new Date(partida.data_final_locacao);

    const dataInicioStr = dataInicio.toLocaleDateString([], {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
    const dataFimStr = dataFim.toLocaleDateString([], {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });

    const options = { hour12: false, hour: "2-digit", minute: "2-digit" };

    if (dataInicioStr === dataFimStr) {
      return `${dataInicioStr} das ${dataInicio.toLocaleTimeString(
        [],
        options
      )} às ${dataFim.toLocaleTimeString([], options)}`;
    } else {
      return `${dataInicioStr} - ${dataFimStr}`;
    }
  };

  const handleDeletePartida = async (partida) => {
    const newPartidas = partidas.filter((p) => p !== partida);
    setPartidas(newPartidas);
    message.success("Partida deletada com sucesso!");
  };

  console.log(partidas);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Alugar</h1>
      {empresa && (
        <div>
          <h2 style={{ marginTop: 16 }}>Produtos</h2>
          <>
            {hasEmpresaEspaco() && partidas.length === 0 && (
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
            {partidas.length > 0 && (
              <>
                <h3 style={{ marginTop: 32 }}>Partidas</h3>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <List
                    grid={{
                      gutter: 16,
                      xs: 1,
                      sm: 1,
                      md: 3,
                      lg: 3,
                      xl: 5,
                      xxl: 2,
                    }}
                    dataSource={partidas}
                    renderItem={(partida) => (
                      <List.Item>
                        <Card
                          cover={<img alt="example" src={campo} />}
                          style={{
                            width: 240,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div>
                            <p>{horarioBuilder(partida)}</p>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Popconfirm
                              title="Tem certeza que deseja deletar esta partida?"
                              onConfirm={() => handleDeletePartida(partida)}
                              okText="Sim"
                              cancelText="Não"
                            >
                              <Button
                                type="danger"
                                icon={<DeleteOutlined />}
                                style={{ marginTop: 8 }}
                              >
                                Deletar
                              </Button>
                            </Popconfirm>
                          </div>
                        </Card>
                      </List.Item>
                    )}
                  />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: 32,
                      width: 240,
                      borderRadius: 8,
                    }}
                    onClick={handleClick}
                  >
                    <PlusOutlined
                      style={{
                        fontSize: 32,
                        color: "#1890ff",
                        cursor: "pointer",
                      }}
                      onClick={handleClick}
                    />
                  </div>
                </div>
              </>
            )}
            {hasEmpresaColetes() && coletes.length === 0 && (
              <Card
                hoverable
                style={{ width: 240, marginTop: 32 }}
                cover={<SkinTwoTone
                  twoToneColor="#eb2f96"
                  style={{ fontSize: "100px" }}
                />}
                onClick={handleOpenAddColeteModal}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <PlusOutlined />
                  <span style={{ marginLeft: 8 }}>Alugar colete</span>
                </div>
              </Card>
            )}
            {coletes.length > 0 && (
              <>
                <List 
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 1,
                    md: 3,
                    lg: 3,
                    xl: 5,
                    xxl: 2,
                  }}
                  dataSource={coletes}
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
                          description={horarioBuilder(colete)}
                        />
                      </Card>
                    </List.Item>  
                  )}
                />
              </>
            )}
          </>
        </div>
        
      )}
      <Modal
        title="Marcar partida"
        visible={showAddPartidaModal}
        onCancel={() => setShowAddPartidaModal(false)}
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
                setDataInicioLocacaoPartida(dates[0]);
                setDataFinalLocacaoPartida(dates[1]);
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
      <Modal
        title="Alugar colete"
        visible={showAddColeteModal}
        onCancel={() => setShowAddColeteModal(false)}
        footer={null}
      >
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          onFinish={onFinishColete}
        >
          <Form.Item name="espacoId" label="Cor do colete">
            <Select>
              {empresa?.Colete?.map((colete) => (
                <Select.Option value={colete.id} key={colete.id}>
                  <SkinTwoTone
                    twoToneColor={colete.cor}
                    style={{ fontSize: "20px" }}
                  />
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Data de locação">
            <RangePicker
              showTime={{ format: "HH:mm" }}
              onChange={(dates) => {
                setDataInicioLocacaoColete(dates[0]);
                setDataFinalLocacaoColete(dates[1]);
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