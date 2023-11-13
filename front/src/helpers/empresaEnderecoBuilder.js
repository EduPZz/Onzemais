export const empresaEnderecoBulder = (empresa) => {
  const result = `${empresa?.rua_endereco}, ${empresa?.numero_endereco}, ${empresa?.bairro_endereco}`;  

  return result;
}