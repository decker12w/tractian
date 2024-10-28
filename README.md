# Hackathon TRACTIAN 2024 - WorkOrder App

## Integrantes
- Eduardo Malagutti
- João Vitor de Oliveira Lima
- João Paulo Morais Rangel
- José Maia

## Descrição do Projeto

Este projeto foi desenvolvido durante o Hackathon TRACTIAN 2024 e visa solucionar o problema enfrentado por técnicos de manutenção ao receber ordens de serviço em áudio, tornando a execução das tarefas mais rápida e eficiente. A aplicação permite que planejadores enviem Work Orders (ordens de serviço) em áudio ou texto, assegurando que técnicos possam acessar informações detalhadas, inclusive em PDF. Além disso, os técnicos recebem recomendações de ferramentas e são alocados com base em critérios justos, para evitar muitos técnicos trabalharem sempre nos mesmos dias.

### Motivação

Baseado nas histórias do técnico José e do planejador Renato, identificamos a necessidade de uma ferramenta que facilite a comunicação e organização de ordens de serviço, otimizando o tempo e reduzindo as chances de erro. Nosso foco principal foi solucionar o problema específico do técnico José, que enfrenta dificuldades ao receber ordens em áudio.

## Funcionalidades Principais

- **Envio de Work Orders**: Planejadores podem enviar ordens de serviço em formato de áudio ou texto.
- **Visualização e Download em PDF**: Técnicos têm a opção de acessar e baixar as ordens de serviço detalhadas.
- **Gestão de Status**: As ordens de serviço podem transitar entre os estados "em aberto", "em progresso" e "finalizadas", permitindo um acompanhamento preciso das tarefas.

## Stack Utilizada

- **Frontend**: React
- **Backend**: Node.js
- **Banco de Dados**: PostgreSQL
- **Containers**: Docker para encapsulamento e gerenciamento de ambientes de desenvolvimento e produção
- **Design e Prototipagem**: Figma
- **API para Conversão de Áudio em Texto**: ChatGPT API Key (fornecida pelos organizadores)

## Critérios de Avaliação

Nosso projeto foi desenvolvido considerando os seguintes critérios:

1. **Impacto / Proposta de Valor**: Facilita e agiliza o fluxo de trabalho para técnicos de manutenção.
2. **Implementação Técnica**: Construído com tecnologias modernas, como containers e banco de dados PostgreSQL, para garantir escalabilidade.
3. **Inovação**: Implementa uma abordagem inovadora ao permitir o envio e processamento de ordens de serviço em áudio.

## Instruções para Execução

### Pré-requisitos

- **Node.js** e **Docker**: Certifique-se de ter o Node.js e Docker instalados em sua máquina.
- **Instalação de Dependências**: Após clonar o repositório, navegue até a pasta do projeto e execute `npm install` para instalar as dependências do projeto.
