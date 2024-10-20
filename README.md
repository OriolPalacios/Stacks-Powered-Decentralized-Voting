# 🗳️ Stacks-Powered Decentralized Voting
> "La seguridad, transparencia y confianza pública al alcance de todos."

## Descripción
Stacks-Powered Decentralized Voting es una aplicación descentralizada (dApp) que aprovecha la tecnología blockchain para ofrecer un sistema de votación transparente y seguro. Utilizando Stacks para la interacción con contratos inteligentes y la blockchain de Bitcoin, esta dApp permite a los usuarios votar de manera confiable y ver los resultados en tiempo real. La votación y los resultados están garantizados por la inmutabilidad de la blockchain, fortaleciendo el proceso democrático.

El sistema incluye una interfaz visual amigable, construida con ReactJS, y un backend impulsado por StacksJS y contratos inteligentes escritos en Clarity. Los usuarios pueden votar y ver los resultados de manera transparente, con gráficos de barras y pastel que ilustran los resultados de las elecciones en tiempo real.

## Características Principales
1. **Sistema de votación descentralizado:**

- Los usuarios pueden votar por los candidatos disponibles en la plataforma.
Los votos son registrados y almacenados en la blockchain de Stacks mediante contratos inteligentes escritos en Clarity.

2. **Resultados en tiempo real:**

- Los resultados de las votaciones se muestran en gráficos interactivos utilizando ChartJS, proporcionando una visión clara y precisa de las tendencias de voto.
3. **Autenticación de usuario:**

- Los usuarios pueden autenticarse y realizar transacciones utilizando billeteras compatibles con Stacks.

4. **Transparencia garantizada:**

- Toda la información sobre las votaciones y los resultados es accesible públicamente en la blockchain, asegurando que los datos sean inmutables y auditable por cualquier persona.
## Tecnologías Utilizadas
- Frontend: TypeScript + ReactJS + ChartJS
- Backend: TypeScript + StacksJS + Clarity (Stacks Smart Contracts)
- Deploy: GitHub Pages para la interfaz y Stacks Testnet para los contratos inteligentes.
## Arquitectura
1. Frontend: ReactJS y TypeScript
- La interfaz de usuario está implementada en ReactJS, asegurando una experiencia fluida y accesible.
- Visualización de los resultados de votación en tiempo real con ChartJS.
2. Backend: StacksJS y Clarity
- El backend está diseñado para interactuar con la blockchain de Stacks, utilizando StacksJS para gestionar las transacciones de votación.
- Los contratos inteligentes están escritos en Clarity, asegurando la seguridad y transparencia en la lógica de votación y el almacenamiento de los resultados.
3. Deploy: GitHub Pages
- El frontend está desplegado en GitHub Pages, facilitando el acceso a la plataforma desde cualquier dispositivo con navegador.
- Configuración del Proyecto

## Consideraciones Futuras
Para el futuro, se planea la integración con Internet Computer Protocol (ICP), lo que permitirá escalar la aplicación y mejorarla en varios aspectos:

- Escalabilidad: Con la infraestructura descentralizada de ICP, podremos manejar un mayor número de usuarios sin comprometer el rendimiento.
- Interoperabilidad: La integración con otros sistemas blockchain y aplicaciones descentralizadas ampliará el alcance de nuestra dApp.
- Reducción de costos: El uso de ICP permitirá optimizar los costos de almacenamiento y procesamiento a largo plazo.
- Seguridad adicional: Aprovechando la arquitectura de ICP, se incrementará la resistencia frente a posibles amenazas de seguridad.
- Disponibilidad de datos en tiempo real: Con la integración de ICP, los resultados de las votaciones serán aún más rápidos y eficientes.

## Guía de Instalación
1. Clonar el repositorio
   ```bash
   git clone git@github.com:OriolPalacios/Stacks-Powered-Decentralized-Voting.git
   cd Stacks-Powered-Decentralized-Voting
   ```
3. Instalar dependencias
   ```bash
   npm install
   ```
5. Desplegar en un servidor local
   ```bash
   npm run start
   ```

## Licencia
Este proyecto se encuentra bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
